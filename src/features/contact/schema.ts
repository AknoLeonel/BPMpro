import { z } from "zod";

/** Áreas de atuação, conforme o documento do site. */
export const contactAreas = ["Esporte", "Cultura", "Turismo", "Social"] as const;

/** Momento da entidade — espelha os cartões de "Para quem". */
export const contactStages = [
  "Tenho uma ideia",
  "Tenho um recurso indicado",
  "Tenho um projeto aprovado",
  "Preciso prestar contas",
] as const;

const brazilianStates = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO",
] as const;

const UF_SET: ReadonlySet<string> = new Set(brazilianStates);

/** "Brasília/DF", "Brasília - DF", "Goiânia GO": cidade + separador (/, - ou espaço) + UF válida. */
export function isValidCityUf(value: string): boolean {
  const match = /^(.*\p{L}.*?)\s*(?:[/-]|\s)\s*(\p{L}{2})$/u.exec(value.trim());
  if (!match?.[1] || !match[2]) return false;
  return match[1].replace(/[^\p{L}]/gu, "").length >= 2 && UF_SET.has(match[2].toUpperCase());
}

/** Telefone brasileiro com DDD (10–11 dígitos), aceitando +55. Retorna só os dígitos ou `null`. */
export function normalizeBrazilianPhone(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) digits = digits.slice(2);
  return /^[1-9]{2}\d{8,9}$/.test(digits) ? digits : null;
}

export const consentError = "Você precisa autorizar o contato para continuar.";

const contactSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo."),
  organization: z.string().trim().min(2, "Informe o nome da entidade."),
  role: z.string().trim().min(2, "Informe o seu cargo na entidade."),
  city: z.string().trim().refine(isValidCityUf, "Informe a cidade e a UF, ex.: Brasília/DF."),
  whatsapp: z
    .string()
    .trim()
    .refine((value) => normalizeBrazilianPhone(value) !== null, "Informe um WhatsApp com DDD.")
    .transform((value) => normalizeBrazilianPhone(value) ?? value),
  email: z.string().trim().pipe(z.email("Informe um e-mail válido.")),
  area: z.enum(contactAreas, { error: "Selecione a área do projeto." }),
  stage: z.enum(contactStages, { error: "Selecione a etapa em que você está." }),
  message: z.string().trim().max(2000, "A mensagem pode ter até 2000 caracteres.").optional(),
  consent: z
    .unknown()
    .refine((value) => value === "on" || value === "true" || value === true, consentError)
    .transform(() => true as const),
  /** Honeypot anti-spam: humanos não preenchem. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactInput;

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: FieldErrors;
      values?: Partial<Record<ContactField, string>>;
    };

export function parseContact(
  data: Record<string, unknown>,
): { ok: true; data: ContactInput } | { ok: false; fieldErrors: FieldErrors } {
  const result = contactSchema.safeParse(data);
  if (result.success) return { ok: true, data: result.data };
  const fieldErrors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, fieldErrors };
}

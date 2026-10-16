import { z } from "zod";

export const organizationTypes = [
  "Associação / ONG",
  "Instituto / Fundação",
  "Prefeitura / Órgão público",
  "Empresa (investimento social)",
  "Outro",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo."),
  email: z.email("Informe um e-mail válido.").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,20}$/, "Informe um telefone com DDD.")
    .optional()
    .or(z.literal("")),
  organizationType: z.enum(organizationTypes, { error: "Selecione o tipo de organização." }),
  message: z.string().trim().min(20, "Conte um pouco mais sobre o projeto (mín. 20 caracteres).").max(2000),
  /** Honeypot anti-spam: humanos não preenchem. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: FieldErrors;
      values?: Partial<Record<keyof ContactInput, string>>;
    };

export function parseContact(
  data: Record<string, unknown>,
): { ok: true; data: ContactInput } | { ok: false; fieldErrors: FieldErrors } {
  const result = contactSchema.safeParse(data);
  if (result.success) return { ok: true, data: result.data };
  const fieldErrors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, fieldErrors };
}

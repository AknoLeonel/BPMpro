import { logger } from "@/lib/observability/logger";
import { type ContactInput, type ContactState, parseContact } from "./schema";

export type ContactDelivery = (lead: ContactInput) => Promise<void>;

/**
 * Regra de negócio do contato, isolada do framework para ser testável.
 * A entrega (CRM, e-mail, webhook) é injetada.
 */
export async function submitContact(raw: Record<string, unknown>, deliver: ContactDelivery): Promise<ContactState> {
  const parsed = parseContact(raw);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors: parsed.fieldErrors,
      values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? "")])),
    };
  }
  if (parsed.data.website) {
    // Bot detectado: responde sucesso sem entregar.
    logger.warn("contact.honeypot");
    return { status: "success", message: "Recebemos sua mensagem!" };
  }
  try {
    await deliver(parsed.data);
    logger.info("contact.received", { organizationType: parsed.data.organizationType });
    return {
      status: "success",
      message: "Recebemos sua mensagem! Um especialista entrará em contato em até 1 dia útil.",
    };
  } catch (error) {
    logger.error("contact.delivery_failed", { error: error instanceof Error ? error.message : String(error) });
    return { status: "error", message: "Não foi possível enviar agora. Tente novamente em instantes." };
  }
}

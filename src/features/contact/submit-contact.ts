import { logger } from "@/lib/observability/logger";
import { contact } from "@/lib/site-config";
import { type ContactInput, type ContactState, parseContact } from "./schema";

export type ContactDelivery = (lead: ContactInput) => Promise<void>;

const invalidFieldsMessage = "Revise os campos destacados.";
export const deliveryErrorMessage =
  "Não foi possível enviar agora. Tente novamente em instantes ou fale pelo WhatsApp.";

/**
 * Regra de negócio do contato, isolada do framework para ser testável.
 * A entrega (CRM, e-mail, webhook) é injetada.
 * LGPD: os logs nunca carregam dados pessoais — apenas área, etapa e produto.
 */
export async function submitContact(raw: Record<string, unknown>, deliver: ContactDelivery): Promise<ContactState> {
  // Devolvidos em todo erro: o React 19 reinicia o formulário após a action.
  const values = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? v : ""]));
  const parsed = parseContact(raw);
  if (!parsed.ok) {
    return { status: "error", message: invalidFieldsMessage, fieldErrors: parsed.fieldErrors, values };
  }
  if (parsed.data.website) {
    // Bot detectado: responde sucesso sem entregar.
    logger.warn("contact.honeypot");
    return { status: "success", message: contact.success };
  }
  try {
    await deliver(parsed.data);
    logger.info("contact.received", {
      area: parsed.data.area,
      stage: parsed.data.stage,
      product: parsed.data.product || null,
    });
    return { status: "success", message: contact.success };
  } catch (error) {
    logger.error("contact.delivery_failed", { error: error instanceof Error ? error.message : String(error) });
    return { status: "error", message: deliveryErrorMessage, values };
  }
}

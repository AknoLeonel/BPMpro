import { siteConfig, whatsappMessages } from "./site-config";

/** Link do WhatsApp (wa.me) com mensagem pronta. */
export function whatsappUrl(message: string = whatsappMessages.default, phone: string = siteConfig.whatsapp): string {
  const digits = phone.replace(/\D/g, "");
  const text = message.trim();
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

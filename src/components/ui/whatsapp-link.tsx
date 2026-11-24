import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonClasses } from "./button";

interface WhatsAppLinkProps {
  /** Mensagem pronta enviada ao abrir a conversa. */
  message?: string;
  /** Ponto de contato (cabeçalho, hero, raias…) — vira `data-whatsapp-context` para a análise de cliques. */
  context: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "lg";
  className?: string;
  /** Sem estilo de botão (ex.: card clicável inteiro). */
  unstyled?: boolean;
  "aria-label"?: string;
}

/** Link do WhatsApp com mensagem pronta; abre em nova aba e avisa leitores de tela. */
export function WhatsAppLink({
  message,
  context,
  children,
  variant = "primary",
  size = "md",
  className,
  unstyled = false,
  "aria-label": ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ? `${ariaLabel} (abre em nova aba)` : undefined}
      data-whatsapp-context={context}
      className={unstyled ? className : buttonClasses({ variant, size, className: cn("gap-2.5", className) })}
    >
      {unstyled ? null : <WhatsAppIcon className="size-5 shrink-0" />}
      {children}
      {ariaLabel ? null : <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

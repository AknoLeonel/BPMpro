import { ArrowLeft } from "lucide-react";
import { routes } from "@/lib/routes";
import { whatsappMessages } from "@/lib/site-config";
import { ButtonLink } from "./button";
import { PageHeader } from "./page-header";
import { WhatsAppLink } from "./whatsapp-link";

interface ComingSoonProps {
  title: string;
  description: string;
  /** Contexto do clique no WhatsApp (análise). */
  context?: string;
}

/** Página reservada para a fase com back-end: "Em breve", volta para o início e WhatsApp. */
export function ComingSoon({ title, description, context = "coming-soon" }: ComingSoonProps) {
  return (
    <PageHeader
      eyebrow="Em breve"
      title={title}
      description={description}
      className="flex min-h-[70svh] flex-col justify-center"
    >
      <ButtonLink href={routes.home} size="lg" variant="inverse">
        <ArrowLeft aria-hidden strokeWidth={1.5} className="size-5" />
        Voltar para o início
      </ButtonLink>
      <WhatsAppLink
        message={whatsappMessages.default}
        context={context}
        size="lg"
        className="focus-visible:ring-offset-ink-950"
      >
        Falar pelo WhatsApp
      </WhatsAppLink>
    </PageHeader>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { Contact } from "@/features/home/sections/contact";
import { Journey } from "@/features/home/sections/journey";
import { Services } from "@/features/home/sections/services";
import { routes } from "@/lib/routes";
import { services, whatsappMessages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Regularização, captação de recursos, elaboração e execução de projetos, eventos, licitações e prestação de contas para entidades.",
  alternates: { canonical: routes.services },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Serviços" title={services.title} description={services.subtitle}>
        <WhatsAppLink
          message={whatsappMessages.default}
          context="services-page"
          size="lg"
          className="focus-visible:ring-offset-ink-950"
        >
          Falar pelo WhatsApp
        </WhatsAppLink>
      </PageHeader>
      <Services />
      <Journey />
      <Contact />
    </>
  );
}

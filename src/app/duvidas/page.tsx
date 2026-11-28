import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/motion/lazy-section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { FaqSkeleton } from "@/features/home/sections/skeletons";
import { FaqSection } from "@/features/home/sections/social-proof";
import { stagger } from "@/lib/motion";
import { fichaLimpa, fichaLimpaWhatsapp, transparencyNotice } from "@/lib/products";
import { routes } from "@/lib/routes";
import { faq } from "@/lib/site-config";

const FaqList = dynamic(() => import("@/features/home/sections/faq").then((mod) => mod.FaqList), {
  loading: () => <FaqSkeleton />,
});

export const metadata: Metadata = {
  title: "Dúvidas frequentes",
  description:
    "Respostas sobre recursos públicos, emendas, prazos, prestação de contas e o Selo Ficha Limpa da Entidade.",
  alternates: { canonical: routes.faq },
};

/** Dúvidas sobre os selos Prata e Ouro (conteúdo de `products.ts`). */
function SealFaqSection() {
  return (
    <section id="duvidas-selos" aria-labelledby="duvidas-selos-title" className="bg-ink-100 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="duvidas-selos-title"
            align="left"
            eyebrow="Ficha Limpa da Entidade"
            title={fichaLimpa.faq.title}
          />
          <Reveal delay={stagger.base} className="mt-8 flex flex-col items-start gap-3">
            <WhatsAppLink message={fichaLimpaWhatsapp} context="faq-seals" variant="secondary">
              Falar pelo WhatsApp
            </WhatsAppLink>
            <ButtonLink href={routes.fichaLimpa} variant="ghost" className="-ml-5 hover:bg-white">
              Conhecer o Ficha Limpa da Entidade
              <ArrowRight aria-hidden strokeWidth={1.5} className="size-4" />
            </ButtonLink>
          </Reveal>
          <p className="mt-8 max-w-md text-ink-600 text-sm leading-relaxed">{transparencyNotice}</p>
        </div>
        <LazySection fallback={<FaqSkeleton />}>
          <FaqList items={fichaLimpa.faq.items} />
        </LazySection>
      </Container>
    </section>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Dúvidas" title={faq.title} />
      <FaqSection />
      <SealFaqSection />
    </>
  );
}

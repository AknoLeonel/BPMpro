import dynamic from "next/dynamic";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { LazySection } from "@/components/motion/lazy-section";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { fichaLimpa, fichaLimpaWhatsapp, type SealLevel, sealPages, seals } from "@/lib/products";
import { ProductFormSkeleton } from "./skeletons";

const ContactForm = dynamic(() => import("@/features/contact/contact-form").then((mod) => mod.ContactForm), {
  loading: () => <ProductFormSkeleton />,
});

interface FinalCtaProps {
  /** Selo da página: pré-seleciona o "Produto" do formulário e a mensagem do WhatsApp. Sem selo, a pessoa escolhe. */
  level?: SealLevel;
}

/** Seção final (#solicitar): formulário com o produto + WhatsApp com mensagem pronta. */
export function FinalCta({ level }: FinalCtaProps) {
  const { finalCta } = fichaLimpa;
  const message = level ? sealPages[level].whatsapp : fichaLimpaWhatsapp;
  return (
    <section
      id="solicitar"
      aria-labelledby="solicitar-title"
      className="relative overflow-hidden bg-brand-500 py-20 lg:py-28"
    >
      <BrandSymbol className="pointer-events-none absolute -top-10 -right-16 h-80 text-brand-600 sm:h-[28rem] lg:-right-10" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="solicitar-title"
              tone="dark"
              align="left"
              title={finalCta.title}
              description={finalCta.subtitle}
            />
            <Reveal delay={0.1} className="mt-10">
              <WhatsAppLink
                variant="inverse"
                size="lg"
                context={`product-${level ?? "ficha-limpa"}`}
                message={message}
                className="w-full sm:w-auto"
              >
                Falar pelo WhatsApp
              </WhatsAppLink>
            </Reveal>
          </div>
          <Reveal direction="up" delay={0.1}>
            <div className="rounded-lg bg-white p-6 shadow-elevation-3 sm:p-8 lg:p-10">
              <LazySection fallback={<ProductFormSkeleton />}>
                {level ? <ContactForm defaultProduct={seals[level].name} /> : <ContactForm />}
              </LazySection>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

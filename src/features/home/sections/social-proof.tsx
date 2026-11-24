import dynamic from "next/dynamic";
import { LazySection } from "@/components/motion/lazy-section";
import { Reveal } from "@/components/motion/reveal";
import { Stripes } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { faq, testimonials, visibility, whatsappMessages } from "@/lib/site-config";
import { FaqSkeleton, TestimonialsSkeleton } from "./skeletons";

// Componentes interativos carregados sob demanda (code-splitting + skeleton).
const Testimonials = dynamic(() => import("./testimonials").then((mod) => mod.Testimonials), {
  loading: () => <TestimonialsSkeleton />,
});
const FaqList = dynamic(() => import("./faq").then((mod) => mod.FaqList), {
  loading: () => <FaqSkeleton />,
});

/** Depoimentos — oculto até haver depoimentos autorizados (`visibility.testimonials`). */
export function TestimonialsSection() {
  if (!visibility.testimonials || testimonials.items.length === 0) return null;
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="bg-ink-100 py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading id="depoimentos-title" align="left" title={testimonials.title} />
          <Stripes count={3} className="mt-10 hidden w-32 lg:flex" />
        </div>
        <LazySection fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </LazySection>
      </Container>
    </section>
  );
}

/** Perguntas frequentes — título e CTA à esquerda, accordion à direita. */
export function FaqSection() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="duvidas-title" align="left" eyebrow="Perguntas frequentes" title={faq.title} />
          <Reveal delay={0.1} className="mt-8">
            <WhatsAppLink message={whatsappMessages.faq} context="faq" variant="secondary">
              {faq.cta}
            </WhatsAppLink>
          </Reveal>
        </div>
        <LazySection fallback={<FaqSkeleton />}>
          <FaqList />
        </LazySection>
      </Container>
    </section>
  );
}

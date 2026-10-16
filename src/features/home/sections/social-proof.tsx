import dynamic from "next/dynamic";
import { LazySection } from "@/components/motion/lazy-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqSkeleton, TestimonialsSkeleton } from "./skeletons";

// Componentes interativos carregados sob demanda (code-splitting + skeleton).
const Testimonials = dynamic(() => import("./testimonials").then((mod) => mod.Testimonials), {
  loading: () => <TestimonialsSkeleton />,
});
const FaqList = dynamic(() => import("./faq").then((mod) => mod.FaqList), {
  loading: () => <FaqSkeleton />,
});

export function TestimonialsSection() {
  return (
    <section aria-label="Depoimentos de parceiros" className="py-24 sm:py-32">
      <Container>
        <LazySection fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </LazySection>
      </Container>
    </section>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 bg-ink-50/70 py-24 sm:py-32 dark:bg-ink-900/40"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeading
          id="faq-title"
          align="left"
          eyebrow="Perguntas frequentes"
          title="Dúvidas comuns"
          description="Não encontrou sua resposta? Fale com a gente — o diagnóstico é gratuito."
        />
        <LazySection fallback={<FaqSkeleton />}>
          <FaqList />
        </LazySection>
      </Container>
    </section>
  );
}

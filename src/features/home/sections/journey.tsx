import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/lib/site-config";

export function Journey() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-24 text-white sm:py-32"
    >
      <div aria-hidden className="hero-grid absolute inset-0 opacity-20" />
      <Container className="relative">
        <div className="[&_h2]:text-white [&_p:last-child]:text-ink-300">
          <SectionHeading
            id="como-funciona-title"
            eyebrow="Como funciona"
            title="Uma jornada clara, do diagnóstico às contas aprovadas"
            description="Metodologia testada em centenas de projetos e acompanhada em tempo real na plataforma."
          />
        </div>
        <Stagger as="ol" className="relative mt-16 grid gap-8 md:grid-cols-5">
          <div
            aria-hidden
            className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-brand-500/0 via-brand-400/60 to-brand-500/0 md:block"
          />
          {journey.map((item) => (
            <StaggerItem as="li" key={item.step} className="relative text-center">
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-brand-600 font-bold text-lg ring-8 ring-ink-950">
                {item.step}
              </span>
              <h3 className="mt-5 font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-ink-300 text-sm leading-relaxed">{item.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { fichaLimpa } from "@/lib/products";

/** Seção 3 — os 3 pilares da conferência. */
export function PillarsGrid() {
  const { pillars } = fichaLimpa;
  return (
    <section id="pilares" aria-labelledby="pilares-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading id="pilares-title" title={pillars.title} />
        <Stagger as="ol" className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {pillars.items.map((pillar, i) => (
            <StaggerItem as="li" key={pillar.title} className="flex">
              <article className="relative flex w-full flex-col rounded-md border border-ink-200 p-6 sm:p-8">
                <span
                  aria-hidden
                  className="absolute top-6 right-6 font-display font-semibold text-ink-600 text-sm tabular-nums sm:top-8 sm:right-8"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-14 items-center justify-center rounded-sm bg-brand-500 text-white">
                  <Icon name={pillar.icon} className="size-7" />
                </span>
                <h3 className="mt-6 font-semibold text-2xl text-ink-950 leading-[1.2]">{pillar.title}</h3>
                <p className="mt-3 text-pretty text-ink-600 leading-relaxed">{pillar.text}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

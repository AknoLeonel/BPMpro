import { CalendarClock, FileX2, UsersRound } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fichaLimpa } from "@/lib/products";

/** Um ícone por dor, na ordem do conteúdo (validade, CPF dos dirigentes, estatuto). */
const icons = [CalendarClock, UsersRound, FileX2] as const;

/** Seção 2 — a dor: por que uma certidão trava a parceria. */
export function PainBlock() {
  const { pain } = fichaLimpa;
  return (
    <section id="dor" aria-labelledby="dor-title" className="bg-ink-100 py-20 lg:py-28">
      <Container>
        <SectionHeading id="dor-title" title={pain.title} />
        <Stagger as="ul" className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {pain.points.map((point, i) => {
            const PainIcon = icons[i] ?? FileX2;
            return (
              <StaggerItem as="li" key={point.title} className="flex">
                <article className="flex w-full flex-col rounded-md bg-white p-6 sm:p-7">
                  <span className="flex size-12 items-center justify-center rounded-sm bg-signal-500/10 text-signal-700">
                    <PainIcon aria-hidden strokeWidth={1.5} className="size-6" />
                  </span>
                  <h3 className="mt-6 font-semibold text-ink-950 text-xl leading-[1.3]">{point.title}</h3>
                  <p className="mt-3 text-pretty text-ink-600 leading-relaxed">{point.text}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

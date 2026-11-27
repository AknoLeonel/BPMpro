import { Repeat } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  returningClients as defaultReturningClients,
  stats as defaultStats,
  statsNote as defaultStatsNote,
  onlyVisible,
  type Stat,
} from "@/lib/numbers";
import { differentials } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Colunas no computador conforme a quantidade de números visíveis (classes literais para o Tailwind). */
const desktopColumns: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

interface DifferentialsProps {
  /** Por padrão, os dados de `numbers.ts`; os testes injetam outros. */
  stats?: readonly Stat[];
  statsNote?: typeof defaultStatsNote;
  returningClients?: typeof defaultReturningClients;
}

export function Differentials({
  stats = defaultStats,
  statsNote = defaultStatsNote,
  returningClients = defaultReturningClients,
}: DifferentialsProps) {
  const visibleStats = onlyVisible(stats);
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading id="diferenciais-title" align="left" eyebrow="Diferenciais" title={differentials.title} />
        <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {differentials.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="group flex flex-col rounded-md border border-ink-200 bg-white p-7 transition-colors duration-200 hover:border-brand-500"
            >
              <Icon name={item.icon} className="size-8 text-brand-500" />
              <h3 className="mt-6 font-display font-semibold text-ink-950 text-xl leading-snug">{item.title}</h3>
              <p className="mt-3 mb-6 text-ink-600 leading-relaxed">{item.description}</p>
              <span
                aria-hidden
                className="mt-auto block h-1 w-8 origin-left bg-signal-500 transition-transform duration-200 group-hover:scale-x-150 motion-reduce:transition-none"
              />
            </StaggerItem>
          ))}
        </Stagger>

        {visibleStats.length > 0 ? (
          <Reveal className="mt-16 rounded-lg bg-ink-950 p-8 sm:p-10 lg:p-12">
            <h3 className="sr-only">A BPM em números</h3>
            <dl
              data-testid="differentials-stats"
              className={cn("grid grid-cols-2 gap-x-6 gap-y-10", desktopColumns[Math.min(visibleStats.length, 5)])}
            >
              {visibleStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-3 border-signal-500 border-l-2 pl-4">
                  <dt className="text-ink-400 text-sm leading-snug">{stat.label}</dt>
                  <dd className="text-balance font-display font-semibold text-2xl text-white leading-tight tracking-[-0.01em] sm:text-3xl xl:text-4xl">
                    <AnimatedCounter value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
            {statsNote.visible ? <p className="mt-10 text-ink-400 text-xs">{statsNote.text}</p> : null}
          </Reveal>
        ) : null}

        {returningClients.visible ? (
          <Reveal className="mt-4">
            <aside
              aria-labelledby="clientes-que-voltam"
              className="flex flex-col gap-5 rounded-lg bg-brand-500 p-8 text-white sm:flex-row sm:items-center sm:gap-8 sm:p-10"
            >
              <span
                aria-hidden
                className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-white/15"
              >
                <Repeat strokeWidth={1.5} className="size-7" />
              </span>
              <div>
                <h3 id="clientes-que-voltam" className="font-display font-semibold text-xl">
                  {returningClients.title}
                </h3>
                <p className="mt-2 text-pretty text-lg leading-relaxed">{returningClients.text}</p>
              </div>
            </aside>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { differentials, visibility } from "@/lib/site-config";

type Stat = (typeof differentials.stats)[number];

/** Bloco de números — só renderiza quando a gestão liberar (`visibility.stats`). */
function DifferentialsStats({ show, stats = differentials.stats }: { show: boolean; stats?: readonly Stat[] }) {
  if (!show || stats.length === 0) return null;
  return (
    <Reveal className="mt-16 border-ink-200 border-t pt-12">
      <dl data-testid="differentials-stats" className="grid gap-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2">
            <dt className="font-medium text-ink-600">{stat.label}</dt>
            <dd className="font-display font-semibold text-5xl text-ink-950 tracking-[-0.02em] lg:text-6xl">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export function Differentials({ showStats = visibility.stats }: { showStats?: boolean }) {
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
        <DifferentialsStats show={showStats} />
      </Container>
    </section>
  );
}

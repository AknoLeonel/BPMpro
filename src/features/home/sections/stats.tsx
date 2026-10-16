import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { stats } from "@/lib/site-config";

export function Stats() {
  return (
    <section aria-label="Números da BPM" className="relative py-12">
      <Container>
        <Stagger
          as="ul"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-200/70 ring-1 ring-ink-200/70 lg:grid-cols-4 dark:bg-ink-800 dark:ring-ink-800"
        >
          {stats.map((stat) => (
            <StaggerItem as="li" key={stat.label} className="bg-white px-6 py-8 text-center sm:py-10 dark:bg-ink-950">
              <p className="whitespace-nowrap font-extrabold text-2xl text-ink-950 tracking-tight sm:text-5xl dark:text-white">
                <AnimatedCounter value={stat.value} prefix={"prefix" in stat ? stat.prefix : ""} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-ink-600 text-sm sm:text-base dark:text-ink-300">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

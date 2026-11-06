import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { cycleColor } from "@/lib/palette";
import { stats } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Cards coloridos que "invadem" o fim do hero. */
export function Stats() {
  return (
    <section aria-label="Números da BPM" className="relative z-10 -mt-24 lg:-mt-28">
      <Container>
        <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StaggerItem
              as="li"
              key={stat.label}
              className={cn(
                "rounded-3xl px-5 py-7 text-center shadow-ink-900/10 shadow-xl transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:py-9",
                cycleColor(i).solid,
              )}
            >
              <p className="whitespace-nowrap font-display font-extrabold text-2xl tracking-tight sm:text-5xl">
                <AnimatedCounter value={stat.value} prefix={"prefix" in stat ? stat.prefix : ""} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-medium text-sm sm:text-base">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

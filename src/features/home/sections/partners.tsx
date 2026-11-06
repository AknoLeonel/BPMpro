import { Marquee } from "@/components/motion/marquee";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cycleColor } from "@/lib/palette";
import { partners } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Partners() {
  const half = Math.ceil(partners.length / 2);
  const rows = [partners.slice(0, half), partners.slice(half)];
  return (
    <section aria-labelledby="parceiros-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="parceiros-title"
          eyebrow="Quem está conosco"
          title="Quem confia na BPM para tirar projetos do papel"
          description="Organizações de todos os portes e regiões do país — da associação de bairro à fundação empresarial."
        />
      </Container>
      <div className="mt-14 space-y-4">
        {rows.map((row, r) => (
          <Marquee
            key={r}
            label={r === 0 ? "Segmentos atendidos" : "Mais segmentos atendidos"}
            duration={45}
            reverse={r === 1}
          >
            {row.map((name, i) => (
              <span
                key={name}
                className={cn(
                  "inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-ink-800 shadow-sm ring-1 ring-ink-100 dark:bg-ink-900 dark:text-ink-100 dark:ring-ink-800",
                )}
              >
                <span aria-hidden className={cn("size-3 rounded-full", cycleColor(i + r).solid)} />
                {name}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

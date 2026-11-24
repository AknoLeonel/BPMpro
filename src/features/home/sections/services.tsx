import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { QuarterCircle } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Colunas no desktop por grupo (ANTES 3 · DURANTE 4 · SEMPRE 2). */
const groupColumns = ["lg:grid-cols-3", "lg:grid-cols-4", "lg:grid-cols-2"] as const;

function groupIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative overflow-hidden bg-ink-100 py-20 lg:py-28"
    >
      <QuarterCircle className="absolute top-0 right-0 hidden size-40 -scale-x-100 lg:block" />
      <Container className="relative">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title={services.title}
          description={services.subtitle}
          align="center"
        />

        <div className="mt-16 flex flex-col gap-14 lg:mt-20 lg:gap-16">
          {services.groups.map((group, index) => (
            <div key={group.label} data-testid="service-group">
              <div className="flex items-center gap-4">
                <span aria-hidden className="font-display font-semibold text-brand-700 text-sm tabular-nums">
                  {groupIndex(index)}
                </span>
                <h3 className="font-display font-semibold text-ink-950 text-lg uppercase tracking-[0.16em]">
                  {group.label}
                </h3>
                <span aria-hidden className="h-px flex-1 border-ink-300 border-t border-dashed" />
              </div>

              <Stagger as="ul" className={cn("mt-6 grid gap-4 sm:grid-cols-2 lg:gap-6", groupColumns[index])}>
                {group.items.map((item) => (
                  <StaggerItem as="li" key={item.title}>
                    <article className="h-full rounded-md bg-white p-6 shadow-elevation-1 transition-[translate,box-shadow] duration-200 ease-out hover:shadow-elevation-2 motion-safe:hover:-translate-y-1 lg:p-7">
                      <span className="flex size-12 items-center justify-center rounded-sm bg-brand-50 text-brand-500">
                        <Icon name={item.icon} className="size-6" />
                      </span>
                      <h4 className="mt-5 font-display font-semibold text-ink-950 text-lg leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-ink-600 text-sm leading-relaxed">{item.description}</p>
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

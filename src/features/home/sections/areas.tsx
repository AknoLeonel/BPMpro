import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { QuarterCircle } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { areas } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Áreas e modalidades: blocos de cor chapada (azul-petróleo / preto), esferas e chips de modalidade. */
export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="scroll-mt-[88px] bg-ink-100 py-20 lg:py-28">
      <Container>
        <SectionHeading id="areas-title" align="left" eyebrow="Áreas e modalidades" title={areas.title} />

        <Stagger as="ul" className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {areas.items.map((area, i) => {
            const teal = i % 2 === 0;
            return (
              <StaggerItem
                as="li"
                key={area.title}
                className={cn(
                  "relative flex min-h-48 flex-col justify-between overflow-hidden rounded-md p-6 text-white sm:min-h-60 lg:min-h-72 lg:p-7",
                  teal ? "bg-brand-500" : "bg-ink-950",
                )}
              >
                <QuarterCircle
                  className={cn(
                    "absolute top-0 right-0 size-20 lg:size-24",
                    teal ? "[&_path]:fill-ink-950" : "[&_path]:fill-brand-500",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "font-display font-semibold text-sm tracking-[0.16em]",
                    teal ? "text-white" : "text-ink-400",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-10">
                  <Icon name={area.icon} className="size-10" />
                  <h3 className="mt-5 font-display font-semibold text-2xl leading-tight lg:text-3xl">{area.title}</h3>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12">
          <p className="inline-flex w-fit flex-col gap-1 rounded-md border-signal-500 border-l-4 bg-white px-5 py-4">
            <span className="font-display font-semibold text-brand-700 text-xs uppercase tracking-[0.16em]">
              Esferas de atuação
            </span>
            <span className="font-semibold text-ink-950">{areas.spheres}</span>
          </p>
          <div>
            <h3
              id="areas-modalities-title"
              className="font-display font-semibold text-brand-700 text-xs uppercase tracking-[0.16em]"
            >
              Modalidades
            </h3>
            <ul aria-labelledby="areas-modalities-title" className="mt-4 flex flex-wrap gap-2">
              {areas.modalities.map((modality) => (
                <li
                  key={modality}
                  className="inline-flex h-8 items-center rounded-full bg-white px-3.5 font-medium text-ink-950 text-sm"
                >
                  {modality}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>

      {/* Faixa decorativa: a lista acessível de modalidades já existe acima. */}
      <div aria-hidden className="mt-14 lg:mt-20" data-testid="areas-marquee">
        <Marquee label="Modalidades" duration={70} className="py-2">
          {areas.modalities.map((modality) => (
            <span
              key={modality}
              className="flex items-center gap-4 whitespace-nowrap font-display font-semibold text-3xl text-ink-950 lg:text-5xl"
            >
              {modality}
              <span className="block size-2 rotate-45 bg-signal-500" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

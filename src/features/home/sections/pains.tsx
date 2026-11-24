import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { RedRule } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { pains } from "@/lib/site-config";

/** "Dores": os quatro pontos em que o projeto trava, sobre o cinza-claro da marca. */
export function Pains() {
  return (
    <section id="dores" aria-labelledby="dores-title" className="bg-ink-100 py-20 lg:py-28">
      <Container>
        <SectionHeading id="dores-title" title={pains.title} />

        <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {pains.items.map((item, i) => (
            <StaggerItem as="li" key={item.title} className="flex">
              <article className="relative flex w-full flex-col rounded-md bg-white p-6 sm:p-7">
                <span
                  aria-hidden
                  className="absolute top-6 right-6 font-display font-semibold text-ink-600 text-sm tabular-nums sm:top-7 sm:right-7"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-12 items-center justify-center rounded-sm bg-signal-500/10 text-signal-700">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-6 font-semibold text-ink-950 text-xl leading-[1.3]">{item.title}</h3>
                <p className="mt-3 text-pretty text-ink-600 leading-relaxed">{item.description}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center lg:mt-20">
          <RedRule className="mx-auto" />
          <p className="mt-6 text-balance font-display font-semibold text-2xl text-ink-950 leading-snug sm:text-3xl">
            {pains.closing}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

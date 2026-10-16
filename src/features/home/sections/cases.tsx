import { MapPin } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/lazy-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { cases } from "@/lib/site-config";

export function Cases() {
  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      className="scroll-mt-24 bg-ink-50/70 py-24 sm:py-32 dark:bg-ink-900/40"
    >
      <Container>
        <SectionHeading
          id="cases-title"
          eyebrow="Cases"
          title="Resultados que saem do papel"
          description="Alguns exemplos do que entidades parceiras conquistaram com a BPM."
        />
        <Stagger as="ul" className="mt-16 grid gap-8 md:grid-cols-3">
          {cases.map((item) => (
            <StaggerItem as="li" key={item.title}>
              <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-ink-900/5 shadow-sm ring-1 ring-ink-100 transition-shadow duration-300 hover:shadow-xl dark:bg-ink-900 dark:ring-ink-800">
                <LazyImage
                  src={item.image}
                  alt=""
                  width={640}
                  height={400}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[16/10] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
                />
                <div className="p-7">
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700 text-xs dark:bg-brand-950 dark:text-brand-300">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 font-bold text-ink-950 text-xl dark:text-white">{item.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-ink-500 text-sm">
                    <MapPin className="size-3.5" aria-hidden /> {item.location}
                  </p>
                  <p className="mt-4 text-ink-700 leading-relaxed dark:text-ink-200">{item.result}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

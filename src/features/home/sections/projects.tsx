import { MapPin } from "lucide-react";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { QuarterCircle } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/lazy-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { onlyVisible, type Project, projectItems } from "@/lib/numbers";
import { projects } from "@/lib/site-config";

/**
 * Projetos realizados: galeria só com os projetos marcados como visíveis em `numbers.ts`
 * (cada um depende da autorização da entidade). Sem nenhum visível, a seção não aparece.
 */
export function Projects({ items = projectItems }: { items?: readonly Project[] }) {
  const visible = onlyVisible(items);
  if (visible.length === 0) return null;
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="bg-ink-950 py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="projetos-title"
          tone="dark"
          align="left"
          eyebrow="Projetos realizados"
          title={projects.title}
          description={projects.subtitle}
        />
        <ProjectGallery items={visible} />
      </Container>
    </section>
  );
}

function ProjectGallery({ items }: { items: readonly Project[] }) {
  return (
    <section
      aria-label="Galeria de projetos"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: região rolável no celular precisa ser alcançável pelo teclado
      tabIndex={0}
      className="-mx-4 mt-12 overflow-x-auto px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 md:mx-0 md:overflow-visible md:px-0 lg:mt-16"
    >
      <Stagger as="ul" className="flex snap-x snap-mandatory gap-4 pb-2 md:grid md:grid-cols-3 md:gap-6 md:pb-0">
        {items.map((project) => (
          <StaggerItem
            as="li"
            key={`${project.name}-${project.city}`}
            className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-ink-800 bg-ink-900">
              {project.image ? (
                <LazyImage
                  src={project.image}
                  alt=""
                  width={800}
                  height={600}
                  sizes="(min-width: 768px) 33vw, 82vw"
                  className="aspect-[4/3]"
                />
              ) : (
                <div aria-hidden className="relative flex aspect-[4/3] items-center justify-center bg-brand-500">
                  <BrandSymbol className="h-16 text-white" />
                  <QuarterCircle className="absolute right-0 bottom-0 size-16 -scale-y-100 [&_path]:fill-ink-950" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="font-display font-semibold text-white text-xl leading-snug">{project.name}</h3>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <span className="inline-flex h-8 items-center rounded-full bg-ink-800 px-3.5 font-medium text-ink-100 text-sm">
                    {project.modality}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-ink-400 text-sm">
                    <MapPin aria-hidden strokeWidth={1.5} className="size-4" />
                    {project.city}
                  </span>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

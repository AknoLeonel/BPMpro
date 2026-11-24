import { MapPin } from "lucide-react";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { QuarterCircle, Stripes, Triangles } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/lazy-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { stagger } from "@/lib/motion";
import { areas, type Project, projects } from "@/lib/site-config";

/** Chamada do estado vazio (não há campo no site-config para ela). */
const EMPTY_CTA = "Quer ver o seu projeto aqui? Fale com a gente";

/** Projetos realizados: galeria (só projetos autorizados) ou estado vazio honesto com mosaico de marca. */
export function Projects({ items = projects.items }: { items?: readonly Project[] }) {
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
        {items.length > 0 ? <ProjectGallery items={items} /> : <ProjectsEmpty />}
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

function ProjectsEmpty() {
  const [first = "", second = "", third = ""] = areas.modalities;
  return (
    <div
      data-testid="projects-empty"
      className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16"
    >
      <Reveal>
        <div aria-hidden className="grid aspect-[3/2] grid-cols-3 grid-rows-2 gap-2 sm:gap-3">
          <div className="flex items-end rounded-md bg-brand-500 p-4 font-display font-semibold text-sm text-white sm:text-lg">
            {first}
          </div>
          <div className="overflow-hidden rounded-md">
            <Triangles className="size-full" />
          </div>
          <div className="flex items-center justify-center rounded-md bg-ink-900">
            <BrandSymbol className="h-1/2 text-brand-400" />
          </div>
          <div className="relative overflow-hidden rounded-md bg-ink-800">
            <QuarterCircle className="absolute top-0 left-0 size-full -scale-x-100" />
          </div>
          <div className="flex items-end rounded-md bg-white p-4 font-display font-semibold text-ink-950 text-sm sm:text-lg">
            {second}
          </div>
          <div className="flex flex-col justify-between overflow-hidden rounded-md bg-ink-900 p-4">
            <Stripes count={3} className="w-2/3" />
            <span className="font-display font-semibold text-sm text-white sm:text-lg">{third}</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={stagger.base * 2}>
        <p className="text-pretty text-ink-100 text-lg leading-relaxed">{projects.note}</p>
        <WhatsAppLink context="projects" variant="inverse" size="lg" className="mt-8 h-auto min-h-14 py-3 text-left">
          {EMPTY_CTA}
        </WhatsAppLink>
      </Reveal>
    </div>
  );
}

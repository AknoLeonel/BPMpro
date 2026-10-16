import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/lib/site-config";

export function Solutions() {
  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="solucoes-title"
          eyebrow="Soluções"
          title="Tudo o que sua entidade precisa para realizar mais"
          description="Uma equipe multidisciplinar e uma plataforma digital cuidando de cada etapa do ciclo de vida do projeto."
        />
        <Stagger as="ul" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <StaggerItem as="li" key={solution.title}>
              <article className="group h-full rounded-3xl border border-ink-100 bg-white p-8 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-brand-900/5 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-ink-800 dark:bg-ink-900/60 dark:hover:border-brand-800">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950 dark:text-brand-300">
                  <Icon name={solution.icon} className="size-6" />
                </span>
                <h3 className="mt-6 font-bold text-ink-950 text-xl dark:text-white">{solution.title}</h3>
                <p className="mt-3 text-ink-600 leading-relaxed dark:text-ink-300">{solution.description}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

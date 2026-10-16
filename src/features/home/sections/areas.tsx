import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { areas } from "@/lib/site-config";

export function Areas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="scroll-mt-24 py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            id="areas-title"
            align="left"
            eyebrow="Áreas de atuação"
            title="Projetos que transformam territórios"
            description="Conhecemos as regras, os editais e os órgãos de cada área — e falamos a língua de quem está na ponta."
          />
        </div>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <StaggerItem as="li" key={area.title}>
              <div className="flex h-full gap-4 rounded-2xl bg-ink-50 p-6 transition-colors duration-300 hover:bg-brand-50 dark:bg-ink-900 dark:hover:bg-brand-950/50">
                <Icon name={area.icon} className="size-6 shrink-0 text-brand-600 dark:text-brand-300" />
                <div>
                  <h3 className="font-semibold text-ink-950 dark:text-white">{area.title}</h3>
                  <p className="mt-1 text-ink-600 text-sm leading-relaxed dark:text-ink-300">{area.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

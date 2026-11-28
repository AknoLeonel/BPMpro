import { IdCard, UserRoundCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { directorsChecklist } from "@/lib/ficha-limpa-checklist";

/** Seção 6 — certidões que também saem no CPF de cada dirigente. */
export function DirectorsBlock() {
  return (
    <section id="dirigentes" aria-labelledby="dirigentes-title" className="bg-ink-950 py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="dirigentes-title"
              tone="dark"
              align="left"
              title={directorsChecklist.title}
              description={directorsChecklist.intro}
            />
            <Reveal delay={0.1} className="mt-10 flex gap-4 rounded-md bg-ink-800 p-6">
              <IdCard aria-hidden strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-brand-300" />
              <p className="text-pretty text-ink-100 leading-relaxed">{directorsChecklist.personalDocuments}</p>
            </Reveal>
          </div>
          <Stagger as="ul" aria-labelledby="dirigentes-title" className="grid content-start gap-3 sm:grid-cols-2">
            {directorsChecklist.certificates.map((certificate) => (
              <StaggerItem
                as="li"
                key={certificate}
                className="flex items-start gap-3 rounded-md border border-ink-800 p-4 text-ink-100"
              >
                <UserRoundCheck aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-signal-500" />
                <span className="leading-snug">{certificate}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

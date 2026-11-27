import { Landmark } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience as defaultExperience, onlyVisible } from "@/lib/numbers";

interface ExperienceProps {
  /** Por padrão, os dados de `numbers.ts`; os testes injetam outros. */
  data?: typeof defaultExperience;
}

/**
 * "Onde já colocamos projetos em movimento": órgãos com projetos aprovados (em texto, com ícone
 * neutro — nunca logos oficiais) e fontes de recurso em chips. Itens ocultos não aparecem;
 * sem nenhum item visível, a seção inteira some.
 */
export function Experience({ data = defaultExperience }: ExperienceProps) {
  const organs = onlyVisible(data.organs);
  const sources = onlyVisible(data.sources);
  if (organs.length === 0 && sources.length === 0) return null;

  return (
    <section id="onde-atuamos" aria-labelledby="onde-atuamos-title" className="bg-ink-100 py-20 lg:py-28">
      <Container>
        <SectionHeading id="onde-atuamos-title" align="left" eyebrow="Onde atuamos" title={data.title} />

        {organs.length > 0 ? (
          <div className="mt-12 lg:mt-16">
            <h3 id="onde-atuamos-orgaos" className="font-display font-semibold text-ink-950 text-xl">
              {data.organsTitle}
            </h3>
            <Stagger
              as="ul"
              aria-labelledby="onde-atuamos-orgaos"
              className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {organs.map((organ) => (
                <StaggerItem
                  as="li"
                  key={organ.name}
                  className="flex min-h-20 items-center gap-4 rounded-md bg-white p-5 shadow-elevation-1"
                >
                  <span
                    aria-hidden
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm bg-brand-50 text-brand-500"
                  >
                    <Landmark strokeWidth={1.5} className="size-6" />
                  </span>
                  <span className="font-medium text-ink-950 leading-snug">{organ.name}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ) : null}

        {sources.length > 0 ? (
          <Reveal className="mt-12 lg:mt-16">
            <h3 id="onde-atuamos-fontes" className="font-display font-semibold text-ink-950 text-xl">
              {data.sourcesTitle}
            </h3>
            <ul aria-labelledby="onde-atuamos-fontes" className="mt-6 flex flex-wrap gap-2.5">
              {sources.map((source) => (
                <li
                  key={source.name}
                  className="inline-flex min-h-10 items-center rounded-full border border-ink-300 bg-white px-4 py-2 font-medium text-ink-950 text-sm leading-snug"
                >
                  {source.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

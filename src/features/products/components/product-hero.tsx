import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { RedRule, Stripes } from "@/components/ui/brand-shapes";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SealBadge } from "@/components/ui/seal-badge";
import type { SealLevel } from "@/lib/products";

interface ProductHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Chamada principal (nas páginas do produto, leva ao formulário #solicitar). */
  cta: { label: string; href: string };
  /** Selos exibidos ao lado do texto (tamanho G). */
  levels: readonly SealLevel[];
  chips?: readonly string[];
  /** Trilha de navegação, acima do eyebrow. */
  breadcrumb?: ReactNode;
}

/** Hero das páginas de produto — traz o único h1 da página. */
export function ProductHero({ eyebrow, title, subtitle, cta, levels, chips = [], breadcrumb }: ProductHeroProps) {
  return (
    <section
      id="inicio"
      aria-labelledby="produto-title"
      className="relative isolate overflow-hidden bg-ink-950 pt-[calc(72px+3rem)] pb-24 text-ink-100 lg:pb-28"
    >
      <div aria-hidden className="absolute bottom-0 left-0 -z-10 flex h-12 w-full max-w-md items-stretch sm:h-14">
        <Reveal direction="right" className="flex flex-1 flex-col justify-center">
          <Stripes count={3} className="w-full gap-2" />
        </Reveal>
      </div>

      <Container className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="max-w-2xl">
          {breadcrumb}
          <Stagger>
            <StaggerItem>
              <p className="font-display font-semibold text-brand-300 text-xs uppercase leading-relaxed tracking-[0.16em]">
                {eyebrow}
              </p>
              <RedRule className="mt-5" />
            </StaggerItem>
            <StaggerItem>
              <h1
                id="produto-title"
                className="mt-6 text-balance font-semibold text-[clamp(2.25rem,3.5vw+1.25rem,4rem)] text-white leading-[1.05] tracking-[-0.01em]"
              >
                {title}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-xl text-pretty text-ink-100 text-lg leading-relaxed">{subtitle}</p>
            </StaggerItem>
            {chips.length > 0 ? (
              <StaggerItem>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <li
                      key={chip}
                      className="inline-flex h-8 items-center gap-2 rounded-full bg-ink-800 px-3.5 font-medium text-ink-100 text-sm"
                    >
                      <Check aria-hidden strokeWidth={2} className="size-4 text-signal-500" />
                      {chip}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ) : null}
            <StaggerItem className="mt-10">
              <ButtonLink href={cta.href} size="lg" className="focus-visible:ring-offset-ink-950">
                {cta.label}
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </ButtonLink>
            </StaggerItem>
          </Stagger>
        </div>

        <Reveal direction="left" className="flex items-center justify-center gap-4 sm:gap-6 lg:justify-end">
          {levels.map((level) => (
            <SealBadge key={level} level={level} size="lg" />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

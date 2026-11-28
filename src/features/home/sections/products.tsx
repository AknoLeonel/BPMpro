import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SealBadge } from "@/components/ui/seal-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeProducts, sealOrder, seals, transparencyNotice } from "@/lib/products";

/** "Produtos": os dois níveis do Selo Ficha Limpa da Entidade, lado a lado, sobre faixa preta. */
export function Products() {
  return (
    <section
      id="produtos"
      aria-labelledby="produtos-title"
      className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28"
    >
      <Container>
        <SectionHeading
          id="produtos-title"
          eyebrow={homeProducts.eyebrow}
          title={homeProducts.title}
          description={homeProducts.subtitle}
          tone="dark"
        />

        <Stagger as="ul" className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {sealOrder.map((level) => {
            const seal = seals[level];
            return (
              <StaggerItem
                as="li"
                key={level}
                className="flex h-full flex-col rounded-lg border border-ink-800 bg-ink-900 p-7 sm:p-8 lg:p-10"
              >
                <article aria-labelledby={`produto-${level}-title`} className="flex h-full flex-col">
                  <SealBadge level={level} size="md" />
                  <h3
                    id={`produto-${level}-title`}
                    className="mt-8 font-display font-semibold text-2xl text-white leading-snug sm:text-[1.75rem]"
                  >
                    {seal.name}
                  </h3>
                  <p className="mt-2 font-semibold text-brand-300 text-sm uppercase tracking-[0.12em]">
                    {seal.tagline}
                  </p>
                  <p className="mt-4 text-ink-400 leading-relaxed">{seal.summary}</p>
                  <div className="mt-auto pt-8">
                    <ButtonLink href={seal.href} variant="primary" size="md">
                      {seal.cta}
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.5}
                        className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
                      />
                    </ButtonLink>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-6 text-center lg:mt-12">
          <Link
            href={homeProducts.link.href}
            className="group inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-brand-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            {homeProducts.link.label}
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
            />
          </Link>
          <p data-testid="products-notice" className="max-w-3xl text-ink-400 text-xs leading-relaxed">
            {transparencyNotice}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

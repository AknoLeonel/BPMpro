import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { RedRule } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { SealBadge } from "@/components/ui/seal-badge";
import { productsHub, sealOrder } from "@/lib/products";
import { ProductHero } from "./components/product-hero";
import { SealCard } from "./components/seal-card";
import { TransparencyNotice } from "./components/transparency-notice";

/** /produtos — vitrine dos produtos BPM Pro. */
export function ProductsHubPage() {
  const [item] = productsHub.items;
  return (
    <>
      <ProductHero
        eyebrow={productsHub.eyebrow}
        title={productsHub.title}
        subtitle={productsHub.subtitle}
        cta={{ label: item.cta, href: item.href }}
        levels={sealOrder}
      />
      <section id="ficha-limpa" aria-labelledby="ficha-limpa-title" className="bg-ink-100 py-20 lg:py-28">
        <Container>
          <Reveal>
            <article className="grid items-center gap-10 rounded-lg bg-white p-6 shadow-elevation-2 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:p-14">
              <div>
                <RedRule />
                <h2
                  id="ficha-limpa-title"
                  className="mt-5 text-balance font-semibold text-3xl text-ink-950 leading-[1.1] tracking-[-0.01em] sm:text-4xl"
                >
                  {item.name}
                </h2>
                <p className="mt-5 text-pretty text-ink-600 text-lg leading-relaxed">{item.description}</p>
                <Link
                  href={item.href}
                  className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-brand-700 underline decoration-brand-700/40 underline-offset-4 transition-colors hover:decoration-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  {item.cta}
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 rounded-md bg-ink-950 p-8 sm:p-10">
                {sealOrder.map((level) => (
                  <SealBadge key={level} level={level} size="md" className="sm:size-36" />
                ))}
              </div>
            </article>
          </Reveal>

          <Stagger className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-5">
            {sealOrder.map((level) => (
              <StaggerItem key={level}>
                <SealCard level={level} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10">
            <TransparencyNotice />
          </Reveal>
        </Container>
      </section>
    </>
  );
}

import { ArrowRight, Check } from "lucide-react";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Chevrons, QuarterCircle, RedRule, Stripes, Triangles } from "@/components/ui/brand-shapes";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/lazy-image";
import { stagger } from "@/lib/motion";
import { heroSeals, onlyVisible } from "@/lib/numbers";
import { hero } from "@/lib/site-config";

/**
 * Slot para a foto/vídeo de evento esportivo pedido no documento do cliente.
 * Enquanto não houver imagem AUTORIZADA, fica `null` e o hero mostra só a composição geométrica.
 * Para ativar: coloque o arquivo em `public/` e troque por `{ src: "/hero.jpg", alt: "" }`
 * (alt vazio: a foto é ambiente; o h1 já descreve a seção). O overlay ink-950/70 garante o contraste.
 */
const HERO_IMAGE: { src: string; alt: string } | null = null;

/** Composição geométrica do manual — blocos chapados que entram deslizando como raias de pista. */
function HeroComposition() {
  const lane = stagger.base;
  return (
    <div aria-hidden className="relative hidden aspect-square w-full grid-cols-3 grid-rows-3 lg:grid">
      <Reveal direction="left" className="col-span-2 row-span-2 flex items-center justify-center bg-brand-500">
        <BrandSymbol className="h-3/5 text-ink-950" />
      </Reveal>
      <Reveal direction="left" delay={lane} className="bg-ink-100">
        <Triangles className="h-full w-full" />
      </Reveal>
      <Reveal direction="left" delay={lane * 2} className="bg-ink-100">
        <QuarterCircle className="h-full w-full" />
      </Reveal>
      <Reveal direction="right" delay={lane * 3} className="col-span-2 flex flex-col justify-center bg-ink-900 px-6">
        <Stripes count={4} className="w-full gap-3" />
      </Reveal>
      <Reveal direction="right" delay={lane * 4} className="flex items-center justify-center bg-signal-500 p-4">
        <Chevrons className="h-auto w-full [&_g]:fill-ink-950" />
      </Reveal>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-[calc(72px+3rem)] pb-28 text-ink-100 lg:pb-32"
    >
      {HERO_IMAGE ? (
        <div aria-hidden className="absolute inset-0 -z-10">
          <LazyImage
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-ink-950/70" />
        </div>
      ) : null}

      {/* Marca d'água: símbolo hexagonal gigante, quase tom sobre tom. */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 -left-40 -z-10 -translate-y-1/2 sm:-left-24">
        <Reveal direction="right">
          <BrandSymbol className="h-[44rem] text-ink-900" />
        </Reveal>
      </div>

      {/* Faixa inferior esquerda (listras + triângulos), como nas peças de referência. */}
      <div aria-hidden className="absolute bottom-0 left-0 -z-10 flex h-14 w-full max-w-xl items-stretch sm:h-16">
        <Reveal direction="right" delay={stagger.base} className="flex flex-1 flex-col justify-center pr-0">
          <Stripes count={3} className="w-full gap-2" />
        </Reveal>
        <Reveal direction="right" delay={stagger.base * 2} className="aspect-square h-full">
          <Triangles className="h-full w-full" />
        </Reveal>
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Stagger className="max-w-2xl">
          <StaggerItem>
            <p className="font-display font-semibold text-brand-300 text-xs uppercase leading-relaxed tracking-[0.16em]">
              {hero.eyebrow}
            </p>
            <RedRule className="mt-5" />
          </StaggerItem>
          <StaggerItem>
            <h1
              id="hero-title"
              className="mt-6 text-balance font-semibold text-[clamp(2.5rem,4vw+1.25rem,4.5rem)] text-white leading-[1.05] tracking-[-0.01em]"
            >
              {hero.title}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-xl text-pretty text-ink-100 text-lg leading-relaxed">{hero.subtitle}</p>
          </StaggerItem>
          <StaggerItem className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} size="lg" className="focus-visible:ring-offset-ink-950">
              {hero.primaryCta.label}
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} size="lg" variant="inverse">
              {hero.secondaryCta.label}
            </ButtonLink>
          </StaggerItem>
          <StaggerItem>
            <ul aria-label="Diferenciais" className="mt-10 flex flex-wrap gap-2">
              {onlyVisible(heroSeals).map(({ text: seal }) => (
                <li
                  key={seal}
                  className="inline-flex h-8 items-center gap-2 rounded-full bg-ink-800 px-3.5 font-medium text-ink-100 text-sm"
                >
                  <Check aria-hidden strokeWidth={2} className="size-4 text-signal-500" />
                  {seal}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <HeroComposition />
      </Container>
    </section>
  );
}

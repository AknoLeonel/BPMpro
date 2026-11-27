import { ArrowRight } from "lucide-react";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { Reveal } from "@/components/motion/reveal";
import { Chevrons, QuarterCircle, Stripes, Triangles } from "@/components/ui/brand-shapes";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/lazy-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { stagger } from "@/lib/motion";
import { aboutProof } from "@/lib/numbers";
import { about } from "@/lib/site-config";

const EYEBROW = "Quem somos";
const SIGNATURE = "Brasil Projetos em Movimento";

/**
 * Slot para a foto da equipe/escritório. Só use imagem com autorização de uso.
 * Para ativar: coloque o arquivo em `public/` e troque por `{ src: "/equipe.jpg", alt: "Equipe da BPM Pro no escritório" }`.
 * A foto ocupa o bloco azul-petróleo; o overlay brand-950/40 mantém a assinatura legível.
 */
const ABOUT_IMAGE: { src: string; alt: string } | null = null;

/** Composição de marca no lugar da foto: bloco azul com o símbolo, listras, triângulos e quarto de círculo. */
function AboutComposition() {
  const lane = stagger.base;
  return (
    <div className="grid aspect-square w-full grid-cols-4 grid-rows-4 overflow-hidden rounded-xl">
      <Reveal direction="right" className="relative col-span-3 row-span-3 overflow-hidden bg-brand-500">
        {ABOUT_IMAGE ? (
          <>
            <LazyImage
              src={ABOUT_IMAGE.src}
              alt={ABOUT_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="absolute inset-0"
            />
            <div aria-hidden className="absolute inset-0 bg-brand-950/40" />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <BrandSymbol className="h-1/2 text-ink-100" />
          </div>
        )}
        <p className="absolute bottom-5 left-5 font-display font-semibold text-[0.6875rem] text-white uppercase tracking-[0.16em] sm:bottom-6 sm:left-6 sm:text-xs">
          {SIGNATURE}
        </p>
      </Reveal>
      <Reveal direction="left" delay={lane} className="row-span-3 flex flex-col justify-center bg-ink-950 px-3 sm:px-5">
        <Stripes count={6} className="w-full gap-3 sm:gap-4" />
      </Reveal>
      <div aria-hidden className="col-span-4 grid grid-cols-4">
        <Reveal direction="right" delay={lane * 2} className="bg-ink-100">
          <Triangles className="h-full w-full" />
        </Reveal>
        <Reveal direction="right" delay={lane * 3} className="bg-ink-100">
          <QuarterCircle className="h-full w-full -scale-x-100" />
        </Reveal>
        <Reveal direction="right" delay={lane * 4} className="flex items-center justify-center bg-ink-950 p-3 sm:p-4">
          <Chevrons className="h-auto w-full" />
        </Reveal>
        <Reveal direction="right" delay={lane * 5} className="bg-signal-500">
          {null}
        </Reveal>
      </div>
    </div>
  );
}

/** "Quem somos": quem é a BPM Pro e para quem ela trabalha. */
export function About() {
  return (
    <section id="quem-somos" aria-labelledby="quem-somos-title" className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="quem-somos-title" eyebrow={EYEBROW} title={about.title} align="left" />
          <Reveal delay={stagger.base}>
            <p className="mt-6 max-w-xl text-pretty text-ink-600 text-lg leading-relaxed">
              {about.text}
              {aboutProof.visible ? (
                <>
                  {" "}
                  <strong className="font-semibold text-ink-950">{aboutProof.text}</strong>
                </>
              ) : null}
            </p>
            <ButtonLink href={about.cta.href} variant="secondary" size="lg" className="mt-10">
              {about.cta.label}
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-none">
          <AboutComposition />
        </div>
      </Container>
    </section>
  );
}

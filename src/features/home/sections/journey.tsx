"use client";

import { m, useReducedMotion, useScroll } from "motion/react";
import { type RefObject, useRef } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { stagger } from "@/lib/motion";
import { journey, whatsappMessages } from "@/lib/site-config";

function stepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/** Linha de progresso da raia: avança com a rolagem (estática e cheia com reduced motion). */
function LaneProgress({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target, offset: ["start 85%", "end 60%"] });
  const progress = reduced ? 1 : scrollYProgress;
  return (
    <>
      {/* Mobile: raia vertical à esquerda, entre o número e o texto. */}
      <div aria-hidden className="absolute top-0 bottom-0 left-16 w-0.5 bg-white/10 lg:hidden">
        <m.div className="h-full w-full origin-top bg-brand-400" style={{ scaleY: progress }} />
      </div>
      {/* Desktop: raia horizontal acima das etapas. */}
      <div aria-hidden className="absolute inset-x-0 top-0 hidden h-0.5 bg-white/10 lg:block">
        <m.div className="h-full w-full origin-left bg-brand-400" style={{ scaleX: progress }} />
      </div>
    </>
  );
}

/** "Como funciona": linha do tempo em raias de pista com as 7 etapas. */
export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative scroll-mt-22 overflow-hidden bg-ink-950 py-20 text-white lg:py-28"
    >
      <Container>
        <SectionHeading id="como-funciona-title" eyebrow="Como funciona" title={journey.title} tone="dark" />

        <div ref={trackRef} className="relative mt-14 lg:mt-20 lg:pt-10">
          <LaneProgress target={trackRef} />
          <Stagger as="ol" gap={stagger.base} className="relative grid gap-10 lg:grid-cols-7 lg:gap-0">
            {journey.steps.map((step, index) => (
              <StaggerItem
                as="li"
                key={step.title}
                direction="right"
                className="grid grid-cols-[4rem_1fr] lg:block lg:border-white/20 lg:border-l lg:border-dashed lg:px-5 lg:first:border-l-0 lg:first:pl-0"
              >
                <span
                  aria-hidden
                  className="font-display font-semibold text-4xl text-signal-500 tabular-nums leading-none lg:text-5xl"
                >
                  {stepNumber(index)}
                </span>
                <div className="pl-6 lg:mt-6 lg:pl-0">
                  <h3 className="font-display font-semibold text-lg text-white leading-snug">{step.title}</h3>
                  <p className="mt-2 text-ink-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-14 flex justify-center lg:mt-20">
          <WhatsAppLink message={whatsappMessages.journey} context="journey" size="lg">
            {journey.cta}
          </WhatsAppLink>
        </div>
      </Container>
    </section>
  );
}

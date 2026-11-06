"use client";

import { ArrowRight } from "lucide-react";
import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cycleColor } from "@/lib/palette";
import { about } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** "Quem somos": missão + valores numa linha do tempo que se preenche com o scroll. */
export function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 50%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="quem-somos" aria-labelledby="quem-somos-title" className="scroll-mt-24 py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="font-semibold text-brand-700 text-sm uppercase tracking-[0.18em] dark:text-brand-300">
            Quem somos
          </p>
          <span aria-hidden className="brand-bar mt-3 block h-1 w-14 rounded-full" />
          <h2
            id="quem-somos-title"
            className="mt-4 text-balance font-extrabold text-4xl text-ink-950 tracking-tight sm:text-5xl lg:text-6xl dark:text-white"
          >
            {about.title}
          </h2>
          <p className="mt-6 text-pretty text-ink-600 text-lg leading-relaxed dark:text-ink-300">{about.mission}</p>
          <a href="#contato" className={buttonClasses({ size: "lg", className: "mt-9" })}>
            Converse com a equipe
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
          </a>
        </Reveal>

        <div ref={timelineRef} className="relative pl-10">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[0.6875rem] w-1 rounded-full bg-ink-100 dark:bg-ink-800"
          />
          <m.span
            aria-hidden
            data-testid="values-progress"
            className="absolute top-2 bottom-2 left-[0.6875rem] w-1 origin-top rounded-full bg-gradient-to-b from-brand-500 via-accent-400 to-coral-500"
            style={{ scaleY }}
          />
          <Stagger as="ol" className="space-y-10">
            {about.values.map((value, i) => (
              <StaggerItem as="li" key={value.title} direction="left" className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1 -left-10 flex size-6 items-center justify-center rounded-full ring-4 ring-white dark:ring-ink-950",
                    cycleColor(i).solid,
                  )}
                />
                <h3 className="font-bold font-display text-2xl text-ink-950 dark:text-white">{value.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed dark:text-ink-300">{value.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { RotatingWord } from "@/components/motion/rotating-word";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroWords, siteConfig } from "@/lib/site-config";
import { DashboardPreview } from "./dashboard-preview";

const highlights = ["Diagnóstico gratuito", "Equipe especialista em MROSC", "Atuação em todo o Brasil"];

const wordColors = [
  "text-brand-600 dark:text-brand-300",
  "text-coral-600 dark:text-coral-300",
  "text-ocean-600 dark:text-ocean-300",
  "text-brand-700 dark:text-accent-300",
  "text-coral-700 dark:text-coral-300",
] as const;

/** Círculos sobrepostos nas cores do Brasil — o "movimento" da marca. */
function MotionCircles() {
  const circles = [
    { color: "bg-brand-500", pos: "top-4 -left-6 size-40", delay: "0s" },
    { color: "bg-accent-400", pos: "-top-8 right-10 size-28", delay: "-2s" },
    { color: "bg-ocean-500", pos: "-right-6 bottom-16 size-44", delay: "-4s" },
    { color: "bg-coral-500", pos: "bottom-0 left-12 size-24", delay: "-6s" },
  ];
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {circles.map((c) => (
        <span
          key={c.color}
          className={`absolute animate-float rounded-full opacity-90 mix-blend-multiply blur-[1px] motion-reduce:animate-none dark:opacity-60 dark:mix-blend-screen ${c.color} ${c.pos}`}
          style={{ animationDelay: c.delay }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-36 sm:pt-40 lg:pb-44">
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-300/30 via-accent-300/25 to-ocean-300/30 blur-3xl dark:from-brand-500/15 dark:via-accent-500/10 dark:to-ocean-500/15"
      />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <Stagger className="max-w-2xl">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 font-medium text-ink-800 text-sm shadow-sm ring-1 ring-ink-200 backdrop-blur dark:bg-ink-900/80 dark:text-ink-100 dark:ring-ink-700">
              <span aria-hidden className="brand-bar h-2 w-6 rounded-full" />
              Govtech para o terceiro setor
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1
              id="hero-title"
              className="mt-6 text-balance font-extrabold text-4xl text-ink-950 leading-[1.05] tracking-tight sm:text-6xl dark:text-white"
            >
              Colocamos seu projeto de <RotatingWord words={heroWords} colors={wordColors} className="grid" />
              em movimento.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 text-pretty text-ink-600 text-lg leading-relaxed sm:text-xl dark:text-ink-300">
              {siteConfig.description}
            </p>
          </StaggerItem>
          <StaggerItem className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contato" className={buttonClasses({ size: "lg" })}>
              Quero captar recursos
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </a>
            <a href="#como-funciona" className={buttonClasses({ size: "lg", variant: "secondary" })}>
              <PlayCircle className="size-5" aria-hidden />
              Como funciona
            </a>
          </StaggerItem>
          <StaggerItem>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-ink-600 text-sm dark:text-ink-300">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-brand-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
        <Reveal direction="left" delay={0.25} className="relative">
          <MotionCircles />
          <DashboardPreview />
        </Reveal>
      </Container>
    </section>
  );
}

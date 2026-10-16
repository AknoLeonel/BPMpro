import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { DashboardPreview } from "./dashboard-preview";

const highlights = ["Diagnóstico gratuito", "Equipe especialista em MROSC", "Atuação em todo o Brasil"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-500/15"
      />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <Stagger className="max-w-2xl">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700 text-sm ring-1 ring-brand-200 dark:bg-brand-950/60 dark:text-brand-200 dark:ring-brand-800">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
              </span>
              Govtech para o terceiro setor
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1
              id="hero-title"
              className="mt-6 text-balance font-extrabold text-4xl text-ink-950 tracking-tight sm:text-5xl lg:text-6xl dark:text-white"
            >
              Seu projeto social <span className="text-gradient">em movimento</span>, do papel à prestação de contas.
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
        <Reveal direction="left" delay={0.25}>
          <DashboardPreview />
        </Reveal>
      </Container>
    </section>
  );
}

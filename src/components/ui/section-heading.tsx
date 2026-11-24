import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { RedRule } from "./brand-shapes";

type Tone = "light" | "dark";

interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  align?: "left" | "center";
  /** `dark` para seções com fundo preto ou azul-petróleo. */
  tone?: Tone;
  id?: string;
  className?: string;
}

/** Eyebrow → traço vermelho → título (h2) → descrição, conforme docs/design-components.md. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 font-display font-semibold text-xs uppercase tracking-[0.16em]",
            dark ? "text-brand-300" : "text-brand-700",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <RedRule className={cn(align === "center" && "mx-auto")} />
      <h2
        id={id}
        className={cn(
          "mt-5 text-balance font-semibold text-3xl leading-[1.1] tracking-[-0.01em] sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-pretty text-lg leading-relaxed", dark ? "text-white" : "text-ink-600")}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="font-semibold text-brand-700 text-sm uppercase tracking-[0.18em] dark:text-brand-300">{eyebrow}</p>
      <span aria-hidden className={cn("brand-bar mt-3 block h-1 w-14 rounded-full", align === "center" && "mx-auto")} />
      <h2
        id={id}
        className="mt-4 text-balance font-extrabold text-3xl text-ink-950 tracking-tight sm:text-4xl lg:text-5xl dark:text-white"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-ink-600 text-lg leading-relaxed dark:text-ink-300">{description}</p>
      ) : null}
    </Reveal>
  );
}

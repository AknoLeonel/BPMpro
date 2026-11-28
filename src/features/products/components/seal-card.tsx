import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SealBadge } from "@/components/ui/seal-badge";
import { type SealLevel, seals } from "@/lib/products";
import { cn } from "@/lib/utils";

interface SealCardProps {
  level: SealLevel;
  className?: string;
}

/** Card de um selo: badge + nome + frase + o que foi conferido + link para a página do selo. */
export function SealCard({ level, className }: SealCardProps) {
  const seal = seals[level];
  return (
    <article
      data-seal-card={level}
      className={cn(
        "flex h-full flex-col rounded-md border-t-4 bg-white p-6 shadow-elevation-1 sm:p-8",
        level === "ouro" ? "border-gold-500" : "border-silver-500",
        className,
      )}
    >
      <div className="flex items-center gap-5">
        <SealBadge level={level} size="md" />
        <div>
          <h3 className="font-semibold text-2xl text-ink-950 leading-tight">{seal.name}</h3>
          <p className="mt-1 font-medium text-brand-700">{seal.tagline}</p>
        </div>
      </div>
      <p className="mt-6 flex-1 text-pretty text-ink-600 leading-relaxed">{seal.summary}</p>
      <ButtonLink href={seal.href} variant="secondary" className="mt-8 self-start">
        {seal.cta}
        <ArrowRight
          aria-hidden
          strokeWidth={1.5}
          className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
        />
      </ButtonLink>
    </article>
  );
}

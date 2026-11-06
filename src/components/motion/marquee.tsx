import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Segundos por volta completa. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  label: string;
}

/**
 * Faixa em movimento contínuo, 100% CSS (zero JS, sem custo de hidratação).
 * A trilha é duplicada para o loop não ter emenda; a cópia fica oculta para leitores de tela.
 * Pausa no hover/foco e para por completo com `prefers-reduced-motion`.
 */
export function Marquee({ children, duration = 40, reverse = false, className, label }: MarqueeProps) {
  const track = "flex shrink-0 items-center gap-4 pr-4";
  return (
    <section
      aria-label={label}
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        data-testid="marquee-track"
        className={cn(
          "flex w-max animate-marquee motion-reduce:animate-none group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className={track}>{children}</div>
        <div className={track} aria-hidden>
          {children}
        </div>
      </div>
    </section>
  );
}

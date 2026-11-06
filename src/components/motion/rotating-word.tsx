"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RotatingWordProps {
  words: readonly string[];
  /** Classes de cor por palavra (ciclo). */
  colors?: readonly string[];
  interval?: number;
  className?: string;
}

/**
 * Alterna palavras com entrada de baixo para cima e saída para cima.
 * Leitores de tela ouvem a lista completa uma única vez (sem anúncios repetidos).
 * Com reduced-motion, mostra apenas a primeira palavra, sem rotação.
 * Todas as palavras ocupam a mesma célula de grid, invisíveis, para fixar a largura.
 */
export function RotatingWord({ words, colors = [], interval = 2600, className }: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);

  const word = words[index] ?? "";
  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {/* Reserva a largura da maior palavra: a troca não empurra o layout (CLS zero). */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={word}
          aria-hidden
          data-testid="rotating-word"
          className={cn("col-start-1 row-start-1 whitespace-nowrap", colors[index % Math.max(colors.length, 1)])}
          initial={{ y: "0.6em", opacity: 0, filter: "blur(6px)" }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: duration.large, ease: easing.enter },
          }}
          exit={{
            y: "-0.6em",
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: exitDuration(duration.medium), ease: easing.exit },
          }}
        >
          {word}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

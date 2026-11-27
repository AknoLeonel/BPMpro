"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { countUpFrame, hasDigits } from "@/lib/count-up";
import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Texto final exato (ex.: "+ de R$ 16 milhões", "3 + 3"). Os algarismos contam a partir de 0. */
  value: string;
  className?: string;
}

/**
 * Conta os números do texto uma única vez, quando o bloco entra na tela.
 * O valor final está sempre no HTML (`sr-only`, bom para SEO e leitores de tela);
 * a contagem é só visual (`aria-hidden`). Com `prefers-reduced-motion`, mostra o final direto.
 */
export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  // Renderiza o valor final no servidor; a contagem só começa no navegador.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced || !hasDigits(value)) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      // Ainda fora da tela: prepara o ponto de partida da contagem.
      setDisplay(countUpFrame(value, 0));
      return;
    }
    const controls = animate(0, 1, {
      duration: duration.progress * 3,
      ease: easing.enter,
      onUpdate: (progress) => setDisplay(countUpFrame(value, progress)),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="sr-only">{value}</span>
      {/* Reserva o espaço do texto final: a contagem não muda a altura do bloco (sem layout shift). */}
      <span aria-hidden className="invisible tabular-nums">
        {value}
      </span>
      <span aria-hidden data-count-visual className="absolute inset-0 tabular-nums">
        {display}
      </span>
    </span>
  );
}

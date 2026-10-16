"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Barra de progresso de leitura fixa no topo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      data-testid="scroll-progress"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-500 via-accent-400 to-brand-300"
      style={{ scaleX }}
    />
  );
}

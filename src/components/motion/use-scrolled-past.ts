"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

/**
 * `true` quando a página está rolada além de `threshold` px.
 * Lê a posição atual na montagem — a página pode carregar já rolada (âncora, reload, voltar) —
 * e depois acompanha cada mudança de rolagem.
 */
export function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setPast(window.scrollY > threshold);
  }, [threshold]);

  useMotionValueEvent(scrollY, "change", (y) => setPast(y > threshold));

  return past;
}

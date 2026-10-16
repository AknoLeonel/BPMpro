"use client";

import { AnimatePresence, m } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";

interface LazySectionProps {
  children: ReactNode;
  /** Skeleton com o MESMO layout do conteúdo final (evita CLS). */
  fallback: ReactNode;
  /** Antecipação do carregamento antes de entrar na tela. */
  rootMargin?: string;
  className?: string;
}

/**
 * Monta o conteúdo apenas quando ele se aproxima da viewport.
 * Até lá exibe o skeleton; a troca é um crossfade (saída rápida, entrada suave).
 */
export function LazySection({ children, fallback, rootMargin = "320px", className }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} aria-busy={!visible}>
      <AnimatePresence mode="wait" initial={false}>
        {visible ? (
          <m.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: duration.medium, ease: easing.enter } }}
          >
            {children}
          </m.div>
        ) : (
          <m.div
            key="skeleton"
            exit={{ opacity: 0, transition: { duration: exitDuration(duration.small), ease: easing.exit } }}
          >
            {fallback}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

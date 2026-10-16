"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";
import { testimonials } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const total = testimonials.length;
  const current = testimonials[index] ?? testimonials[0];

  const go = useCallback((step: 1 | -1) => setState(([i]) => [(i + step + total) % total, step]), []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [go, paused, reduced]);

  const offset = reduced ? 0 : 40;

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Depoimentos"
      className="mx-auto max-w-4xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Quote className="mx-auto size-10 text-brand-500" aria-hidden />
      <div className="relative mt-8 min-h-56 sm:min-h-44" aria-live="polite">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.figure
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * offset }}
            animate={{ opacity: 1, x: 0, transition: { duration: duration.medium, ease: easing.enter } }}
            exit={{
              opacity: 0,
              x: -dir * offset * 0.5,
              transition: { duration: exitDuration(duration.medium), ease: easing.exit },
            }}
          >
            <blockquote className="text-balance font-medium text-2xl text-ink-900 leading-snug sm:text-3xl dark:text-white">
              “{current?.quote}”
            </blockquote>
            <figcaption className="mt-6 text-ink-600 dark:text-ink-300">
              <span className="font-semibold text-ink-900 dark:text-white">{current?.author}</span> ·{" "}
              {current?.location}
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Depoimento anterior"
          className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ink-200 transition-colors hover:bg-ink-100 dark:ring-ink-700 dark:hover:bg-ink-800"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              type="button"
              key={t.author}
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Ir para depoimento ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative h-2 overflow-hidden rounded-full bg-ink-200 transition-[width] duration-300 dark:bg-ink-700",
                i === index ? "w-10" : "w-2",
              )}
            >
              {i === index && !paused && !reduced ? (
                <m.span
                  key={`p-${index}`}
                  className="absolute inset-y-0 left-0 bg-brand-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              ) : i === index ? (
                <span className="absolute inset-0 bg-brand-500" />
              ) : null}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo depoimento"
          className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ink-200 transition-colors hover:bg-ink-100 dark:ring-ink-700 dark:hover:bg-ink-800"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}

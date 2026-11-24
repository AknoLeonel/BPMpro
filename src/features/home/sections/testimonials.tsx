"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type KeyboardEvent, useCallback, useId, useState } from "react";
import { QuarterCircle } from "@/components/ui/brand-shapes";
import { distance, duration, easing, exitDuration } from "@/lib/motion";
import { type Testimonial, testimonials } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const controlClasses =
  "inline-flex size-11 items-center justify-center rounded-full border-2 border-ink-950 text-ink-950 " +
  "transition-colors duration-200 hover:bg-ink-950 hover:text-white focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
  "motion-reduce:transition-none";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const pad = (n: number) => String(n).padStart(2, "0");

interface TestimonialsProps {
  /** Depoimentos exibidos; por padrão os autorizados em `site-config`. */
  items?: readonly Testimonial[];
}

/** Carrossel de depoimentos sem autoplay (setas e teclado ←/→). */
export function Testimonials({ items = testimonials.items }: TestimonialsProps) {
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  const reduced = useReducedMotion();
  const baseId = useId();
  const total = items.length;

  const go = useCallback((step: 1 | -1) => setState(([i]) => [(i + step + total) % total, step]), [total]);

  const current = items[index] ?? items[0];
  if (!current) return null;

  const offset = reduced ? 0 : distance.lg;
  const multiple = total > 1;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!multiple) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Depoimentos"
      className="relative overflow-hidden rounded-lg bg-white p-6 shadow-elevation-1 sm:p-10"
      onKeyDown={onKeyDown}
    >
      <QuarterCircle className="pointer-events-none absolute -top-px -right-px size-16 -scale-x-100 sm:size-20" />
      <span aria-hidden className="block font-display font-semibold text-6xl text-brand-500 leading-none">
        “
      </span>
      <div className="relative mt-2 min-h-56 sm:min-h-48" aria-live="polite" id={`${baseId}-slides`}>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.figure
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${total}`}
            initial={{ opacity: 0, x: dir * offset }}
            animate={{ opacity: 1, x: 0, transition: { duration: duration.medium, ease: easing.enter } }}
            exit={{
              opacity: 0,
              x: -dir * offset * 0.5,
              transition: { duration: exitDuration(duration.medium), ease: easing.exit },
            }}
          >
            <blockquote className="line-clamp-3 text-pretty font-display font-medium text-ink-950 text-xl leading-snug">
              {current.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              {current.photo ? (
                <Image
                  src={current.photo}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="size-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-500 font-display font-semibold text-sm text-white"
                >
                  {initials(current.name)}
                </span>
              )}
              <span className="min-w-0">
                <span className="block font-semibold text-ink-950">{current.name}</span>
                <span className="block text-ink-600 text-sm">
                  {current.role} · {current.organization}
                </span>
              </span>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>
      {multiple ? (
        <div className="mt-8 flex items-center justify-between gap-4 border-ink-200 border-t pt-6">
          <p aria-hidden className="font-display font-semibold text-ink-600 text-sm tabular-nums tracking-[0.16em]">
            <span className="text-ink-950">{pad(index + 1)}</span> / {pad(total)}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Depoimento anterior"
              aria-controls={`${baseId}-slides`}
              className={cn(controlClasses)}
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo depoimento"
              aria-controls={`${baseId}-slides`}
              className={cn(controlClasses)}
            >
              <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

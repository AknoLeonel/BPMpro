"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";
import { faq } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  /** Perguntas exibidas; por padrão as de `site-config`. */
  items?: readonly FaqItem[];
}

/** Accordion com um item aberto por vez; ↑/↓/Home/End movem o foco entre as perguntas. */
export function FaqList({ items = faq.items }: FaqListProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduced = useReducedMotion();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const target =
      event.key === "ArrowDown"
        ? i === last
          ? 0
          : i + 1
        : event.key === "ArrowUp"
          ? i === 0
            ? last
            : i - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <ul className="border-ink-200 border-t">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.question} className="border-ink-200 border-b">
            <h3 className="font-sans">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={cn(
                  "group flex min-h-11 w-full items-center justify-between gap-6 py-6 text-left font-sans font-semibold text-[1.0625rem] leading-snug transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white",
                  "motion-reduce:transition-none",
                  isOpen ? "text-brand-700" : "text-ink-950 hover:text-brand-700",
                )}
              >
                {item.question}
                <m.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduced ? 0 : duration.small, ease: easing.move }}
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 motion-reduce:transition-none",
                    isOpen ? "border-brand-500 bg-brand-500 text-white" : "border-ink-950 text-ink-950",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </m.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { duration: reduced ? duration.micro : duration.medium, ease: easing.enter },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      duration: exitDuration(reduced ? duration.micro : duration.medium),
                      ease: easing.exit,
                    },
                  }}
                >
                  <p className="max-w-2xl pr-12 pb-6 text-ink-600 leading-relaxed">{item.answer}</p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

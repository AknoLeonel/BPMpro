"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";
import { faq } from "@/lib/site-config";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <ul className="divide-y divide-ink-100 rounded-3xl bg-white px-6 ring-1 ring-ink-100 sm:px-8 dark:divide-ink-800 dark:bg-ink-900 dark:ring-ink-800">
      {faq.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-semibold text-ink-950 text-lg dark:text-white"
              >
                {item.question}
                <m.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: duration.small, ease: easing.move }}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"
                >
                  <Plus className="size-4" aria-hidden />
                </m.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  id={panelId}
                  role="region"
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { duration: duration.medium, ease: easing.enter },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: exitDuration(duration.medium), ease: easing.exit },
                  }}
                >
                  <p className="pb-6 text-ink-600 leading-relaxed dark:text-ink-300">{item.answer}</p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

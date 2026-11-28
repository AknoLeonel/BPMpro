"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface AccordionEntry {
  /** Chave estável do item. */
  id: string;
  /** Conteúdo do botão (vira o nome acessível). */
  header: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: readonly AccordionEntry[];
  /** Itens abertos ao carregar. */
  defaultOpen?: readonly string[];
  /** Permite vários itens abertos ao mesmo tempo (padrão: um por vez). */
  multiple?: boolean;
  className?: string;
}

/** Destino do foco para ↑/↓/Home/End; `null` quando a tecla não navega. */
export function focusTarget(key: string, index: number, count: number): number | null {
  const last = count - 1;
  if (key === "ArrowDown") return index === last ? 0 : index + 1;
  if (key === "ArrowUp") return index === 0 ? last : index - 1;
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}

/**
 * Acordeão acessível (button[aria-expanded][aria-controls] + role="region"),
 * no mesmo padrão do FAQ da Home: ↑/↓/Home/End movem o foco entre os cabeçalhos.
 */
export function Accordion({ items, defaultOpen = [], multiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(defaultOpen));
  const baseId = useId();
  const reduced = useReducedMotion();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(multiple ? current : []);
      if (current.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = focusTarget(event.key, index, items.length);
    if (target === null) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  };

  const enter = reduced ? duration.micro : duration.medium;

  return (
    <ul className={cn("border-ink-200 border-t", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(item.id);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.id} className="border-ink-200 border-b">
            <h3 className="font-sans">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={isOpen ? panelId : undefined}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className={cn(
                  "group flex min-h-11 w-full items-center justify-between gap-6 py-6 text-left font-sans transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white",
                  "motion-reduce:transition-none",
                  isOpen ? "text-brand-700" : "text-ink-950 hover:text-brand-700",
                )}
              >
                <span className="min-w-0 flex-1">{item.header}</span>
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
                  animate={{ height: "auto", opacity: 1, transition: { duration: enter, ease: easing.enter } }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: exitDuration(enter), ease: easing.exit },
                  }}
                >
                  <div className="pb-6">{item.content}</div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

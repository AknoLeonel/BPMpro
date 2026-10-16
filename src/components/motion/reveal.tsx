"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { type Direction, fadeSlide } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}

/** Entrada suave quando o elemento cruza a viewport (uma única vez). */
export function Reveal({ children, direction = "up", delay = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const variants = fadeSlide(direction, reduced);
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        ...variants,
        visible: { ...variants.visible, transition: { ...variants.visible.transition, delay } },
      }}
      data-motion="reveal"
    >
      {children}
    </Component>
  );
}

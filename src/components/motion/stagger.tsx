"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { type Direction, fadeSlide, stagger } from "@/lib/motion";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}

/** Container que coreografa a entrada sequencial dos filhos `StaggerItem`. */
export function Stagger({ children, className, gap = stagger.base, as = "div" }: StaggerProps) {
  const reduced = useReducedMotion() ?? false;
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : gap } } }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "li" | "article";
}

export function StaggerItem({ children, className, direction = "up", as = "div" }: StaggerItemProps) {
  const reduced = useReducedMotion() ?? false;
  const Component = m[as];
  return (
    <Component className={className} variants={fadeSlide(direction, reduced)} data-motion="stagger-item">
      {children}
    </Component>
  );
}

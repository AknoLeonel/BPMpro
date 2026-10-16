"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { duration, easing } from "@/lib/motion";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

/** Conta de 0 até `value` quando entra na viewport (progresso numérico). */
export function AnimatedCounter({ value, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCurrent(value);
      return;
    }
    const controls = animate(0, value, {
      duration: duration.progress * 3,
      ease: easing.enter,
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{`${prefix}${formatNumber(value)}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {formatNumber(current)}
        {suffix}
      </span>
    </span>
  );
}

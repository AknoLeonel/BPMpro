"use client";

import { m } from "motion/react";
import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** 0–100. Omitido = indeterminado. */
  value?: number;
  label: string;
  className?: string;
}

/** Progresso determinado (preenche) ou indeterminado (varre em loop). */
export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const determinate = typeof value === "number";
  const clamped = determinate ? Math.min(100, Math.max(0, value)) : undefined;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800", className)}
    >
      {determinate ? (
        <m.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: duration.progress, ease: easing.move }}
        />
      ) : (
        <m.div
          className="absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
          initial={{ left: "-33%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.1, ease: easing.move, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </div>
  );
}

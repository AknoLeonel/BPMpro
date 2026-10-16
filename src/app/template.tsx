"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { duration, easing } from "@/lib/motion";

/** Transição de entrada a cada navegação entre rotas. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.medium, ease: easing.enter }}
    >
      {children}
    </m.div>
  );
}

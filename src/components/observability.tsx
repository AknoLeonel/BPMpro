"use client";

import { useEffect } from "react";
import { initBrowserObservability } from "@/lib/observability/browser";
import { publicObservabilityConfig } from "@/lib/observability/config";

/** Liga Datadog RUM/Logs e New Relic Browser após a hidratação (fora do caminho crítico). */
export function BrowserObservability() {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    idle(() => {
      void initBrowserObservability(publicObservabilityConfig);
    });
  }, []);
  return null;
}

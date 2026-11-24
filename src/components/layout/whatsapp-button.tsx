"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useScrolledPast } from "@/components/motion/use-scrolled-past";
import { distance, duration, easing, exitDuration } from "@/lib/motion";
import { whatsappMessages } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./social-icons";

/** Rolagem (px) a partir da qual o botão aparece — logo depois do hero. */
const SHOW_AFTER = 480;

/** CTA flutuante de WhatsApp: entra após o hero e some no topo da página. */
export function WhatsAppButton() {
  const reduced = useReducedMotion() ?? false;
  const visible = useScrolledPast(SHOW_AFTER);

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          className="fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40"
          initial={{ opacity: 0, y: reduced ? 0 : distance.lg, scale: reduced ? 1 : 0.85 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: reduced ? { duration: duration.micro } : { type: "spring", stiffness: 320, damping: 24 },
          }}
          exit={{
            opacity: 0,
            y: reduced ? 0 : distance.md,
            transition: { duration: exitDuration(duration.small), ease: easing.exit },
          }}
        >
          <a
            href={whatsappUrl(whatsappMessages.default)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar no WhatsApp (abre em nova aba)"
            data-testid="whatsapp-button"
            data-whatsapp-context="floating"
            className="group peer flex size-14 items-center justify-center rounded-full bg-ink-950 text-whatsapp shadow-elevation-3 ring-1 ring-white/10 transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 motion-reduce:hover:translate-y-0"
          >
            <WhatsAppIcon className="size-7" />
          </a>
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-full mr-3 hidden translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink-950 px-4 py-2 font-semibold text-sm text-white opacity-0 shadow-elevation-2 transition-[opacity,transform] duration-200 ease-out peer-hover:translate-x-0 peer-hover:opacity-100 peer-focus-visible:translate-x-0 peer-focus-visible:opacity-100 motion-reduce:transition-none md:block"
          >
            Fale no WhatsApp
          </span>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

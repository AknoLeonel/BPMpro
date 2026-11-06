"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { duration, easing, exitDuration } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.74 4.86-1.27A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.88.75.77-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42l-.75-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06c0 1.21.88 2.38 1 2.55.13.16 1.74 2.66 4.22 3.73 1.57.68 2.18.74 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/** CTA flutuante de WhatsApp: entra após o hero e some no topo da página. */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 480));

  return (
    <AnimatePresence>
      {visible ? (
        <m.a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          data-testid="whatsapp-button"
          className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full bg-[#1f9d55] p-3 text-white shadow-[#1f9d55]/30 shadow-xl sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 22 } }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 16,
            transition: { duration: exitDuration(duration.small), ease: easing.exit },
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1f9d55] opacity-30 [animation-duration:2.4s] motion-reduce:animate-none"
          />
          <WhatsAppIcon />
          <span className="hidden pr-2 font-semibold text-sm sm:group-hover:inline">Fale conosco</span>
        </m.a>
      ) : null}
    </AnimatePresence>
  );
}

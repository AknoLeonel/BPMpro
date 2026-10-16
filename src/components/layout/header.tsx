"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { duration, easing, exitDuration, stagger } from "@/lib/motion";
import { navItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <m.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: duration.large, ease: easing.enter }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-white/80 shadow-ink-900/5 shadow-sm backdrop-blur-xl dark:bg-ink-950/80"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative rounded-full px-4 py-2 font-medium text-ink-700 text-sm transition-colors hover:text-brand-700 dark:text-ink-200 dark:hover:text-brand-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contato" className={buttonClasses({ className: "hidden sm:inline-flex" })}>
            Fale com um especialista
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink-800 hover:bg-ink-100 lg:hidden dark:text-white dark:hover:bg-ink-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1, transition: { duration: duration.small, ease: easing.enter } }}
                exit={{
                  rotate: 90,
                  opacity: 0,
                  transition: { duration: exitDuration(duration.small), ease: easing.exit },
                }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <m.nav
            id="mobile-menu"
            aria-label="Menu móvel"
            className="overflow-hidden border-ink-100 border-t lg:hidden dark:border-ink-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: duration.medium, ease: easing.enter } }}
            exit={{ height: 0, opacity: 0, transition: { duration: exitDuration(duration.medium), ease: easing.exit } }}
          >
            <m.ul
              className="space-y-1 px-4 py-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: stagger.tight } } }}
            >
              {[...navItems, { href: "#contato", label: "Contato" }].map((item) => (
                <m.li key={item.href} variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-medium text-ink-800 text-lg hover:bg-ink-50 dark:text-white dark:hover:bg-ink-900"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
            </m.ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </m.header>
  );
}

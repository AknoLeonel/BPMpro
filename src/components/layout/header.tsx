"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { type KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { useScrolledPast } from "@/components/motion/use-scrolled-past";
import { Container } from "@/components/ui/container";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { distance, duration, easing, exitDuration, stagger } from "@/lib/motion";
import { contact, navItems, whatsappMessages } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

/** Rolagem (px) a partir da qual o cabeçalho deixa de ser transparente. */
const SOLID_AFTER = 24;

const sectionIds = navItems.map((item) => item.href.replace(/^#/, ""));

/** Na home os itens são âncoras; nas demais rotas apontam para a home. */
export function resolveNavHref(href: string, isHome: boolean): string {
  return !isHome && href.startsWith("#") ? `/${href}` : href;
}

/**
 * Scroll-spy: devolve o id da seção que ocupa a faixa central da viewport.
 * Sem IntersectionObserver (ou fora da home) simplesmente não marca nenhum item.
 */
function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") {
      setActive(null);
      return;
    }
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === null;
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrolledPast = useScrolledPast(SOLID_AFTER);

  const activeId = useActiveSection(sectionIds, isHome);
  /** Fora da home não há hero escuro: o cabeçalho já começa sólido. */
  const solid = scrolledPast || !isHome;
  /** Tom claro (logo e textos brancos) sobre o hero ou com o menu móvel aberto. */
  const light = open || !solid;

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Esc fecha, trava a rolagem do corpo e fecha ao chegar no desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) close(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    desktop.addEventListener?.("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener?.("change", onDesktop);
    };
  }, [open, close]);

  // Mantém o foco do teclado dentro do cabeçalho enquanto o painel cobre a página.
  const trapFocus = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (!open || event.key !== "Tab" || !headerRef.current) return;
    const items = [...headerRef.current.querySelectorAll<HTMLElement>(focusableSelector)].filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
    const first = items[0];
    const last = items.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const itemOffset = reduced ? 0 : distance.lg;

  return (
    <m.header
      ref={headerRef}
      onKeyDown={trapFocus}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.large, ease: easing.enter }}
      data-state={open ? "open" : solid ? "solid" : "transparent"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
        open
          ? "bg-ink-950"
          : solid
            ? "bg-white/90 shadow-elevation-2 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
            : "bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo tone={light ? "light" : "dark"} />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={resolveNavHref(item.href, isHome)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group/nav relative inline-flex h-11 items-center whitespace-nowrap px-3.5 font-medium text-sm transition-colors 2xl:px-4",
                      "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                      light
                        ? "text-white/85 hover:text-white"
                        : "text-ink-700 hover:text-ink-950 focus-visible:ring-offset-2",
                      isActive && (light ? "text-white" : "text-ink-950"),
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 bottom-2 h-0.5 origin-left bg-signal-500 transition-transform duration-300 ease-out motion-reduce:transition-none 2xl:inset-x-4",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-40",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            context="header"
            message={whatsappMessages.default}
            size="md"
            variant={light ? "inverse" : "primary"}
            className={cn("hidden whitespace-nowrap sm:inline-flex", open && "sm:hidden")}
          >
            Fale no WhatsApp
          </WhatsAppLink>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors xl:hidden",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
              light ? "text-white hover:bg-white/10" : "text-ink-950 hover:bg-ink-100",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={open ? "close" : "open"}
                initial={{ rotate: reduced ? 0 : -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1, transition: { duration: duration.small, ease: easing.enter } }}
                exit={{
                  rotate: reduced ? 0 : 90,
                  opacity: 0,
                  transition: { duration: exitDuration(duration.small), ease: easing.exit },
                }}
              >
                {open ? (
                  <X aria-hidden className="size-6" strokeWidth={1.5} />
                ) : (
                  <Menu aria-hidden className="size-6" strokeWidth={1.5} />
                )}
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
            className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto bg-ink-950 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: duration.medium, ease: easing.enter } }}
            exit={{ opacity: 0, transition: { duration: exitDuration(duration.small), ease: easing.exit } }}
          >
            <Container className="flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <span aria-hidden className="block h-1 w-12 bg-signal-500" />
              <m.ul
                className="mt-6 border-ink-800 border-t"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: stagger.tight, delayChildren: stagger.tight } } }}
              >
                {navItems.map((item, index) => {
                  const isActive = activeId === item.href.slice(1);
                  return (
                    <m.li
                      key={item.href}
                      className="border-ink-800 border-b"
                      variants={{
                        hidden: { opacity: 0, y: itemOffset },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: duration.medium, ease: easing.enter },
                        },
                      }}
                    >
                      <a
                        href={resolveNavHref(item.href, isHome)}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => close(false)}
                        className="group/link flex min-h-16 items-center gap-4 py-3 font-display text-[1.75rem] text-white leading-tight transition-colors hover:text-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                      >
                        <span aria-hidden className="w-7 font-medium font-sans text-ink-400 text-xs tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="relative">
                          {item.label}
                          {isActive ? (
                            <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 bg-signal-500" />
                          ) : null}
                        </span>
                      </a>
                    </m.li>
                  );
                })}
              </m.ul>
              <m.div
                className="mt-auto pt-10"
                initial={{ opacity: 0, y: itemOffset / 2 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: duration.medium,
                    ease: easing.enter,
                    delay: stagger.tight * (navItems.length + 1),
                  },
                }}
              >
                <p className="max-w-sm text-ink-400 text-sm leading-relaxed">{contact.subtitle}</p>
                <WhatsAppLink
                  context="header-mobile"
                  message={whatsappMessages.default}
                  size="lg"
                  className="mt-4 w-full"
                >
                  Fale no WhatsApp
                </WhatsAppLink>
              </m.div>
            </Container>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </m.header>
  );
}

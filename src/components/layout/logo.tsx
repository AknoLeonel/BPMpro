import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandSymbol } from "./brand-symbol";

type Tone = "dark" | "light";

const tones: Record<Tone, string> = {
  /** Logo preta, para fundos claros. */
  dark: "text-ink-950",
  /** Logo clara, para fundos escuros. */
  light: "text-ink-100",
};

/**
 * Logotipo BPM (símbolo + "BPM" + ®). No celular mostra o símbolo e "BPM Pro";
 * a partir de `sm` mostra o logotipo completo com a assinatura.
 */
export function Logo({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="BPM Pro — Brasil Projetos em Movimento, página inicial"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-4",
        tones[tone],
        className,
      )}
    >
      <BrandSymbol className="h-9 transition-transform duration-300 ease-out group-hover:-rotate-[30deg] motion-reduce:transition-none" />
      <span className="flex flex-col leading-none">
        <span className="font-display font-semibold text-[1.6rem] tracking-[0.04em]">
          BPM
          <sup className="ml-0.5 align-super font-medium font-sans text-[0.45rem]">®</sup>
          {/* Texto pequeno: brand-700 sobre claro (7.24:1) e brand-300 sobre escuro (AA). */}
          <span
            className={cn(
              "ml-1.5 text-[1.05rem] tracking-normal sm:hidden",
              tone === "dark" ? "text-brand-700" : "text-brand-300",
            )}
          >
            Pro
          </span>
        </span>
        <span className="mt-1 hidden whitespace-nowrap font-display text-[0.55rem] uppercase tracking-[0.22em] opacity-80 sm:block">
          Brasil Projetos em Movimento
        </span>
      </span>
    </Link>
  );
}

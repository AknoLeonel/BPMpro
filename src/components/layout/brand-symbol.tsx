import { cn } from "@/lib/utils";

/**
 * Símbolo hexagonal da BPM (o "b" dentro do hexágono), redesenhado em SVG a partir do Manual de Marca.
 * Usa `currentColor`: defina a cor pelo `className` (ex.: `text-ink-950`, `text-ink-100`).
 */
export function BrandSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 194 224" fill="currentColor" aria-hidden className={cn("h-9 w-auto", className)}>
      <path d="M0 56 32 37.5v112L89 182.4v37L0 168Z" />
      <path d="M105 219.4 194 168V69l-32 18v62.5l-57 32.9Z" />
      <path d="M66 17.9 97 0l89 51.4-32 18.5L97 37 66 54.9Z" />
      <path d="M97 80l30.3 17.5v35L97 150l-30.3-17.5v-35Z" />
    </svg>
  );
}

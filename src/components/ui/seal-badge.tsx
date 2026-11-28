import { useId } from "react";
import { cn } from "@/lib/utils";

type SealLevel = "prata" | "ouro";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  /** P — tags, tabelas e cards compactos. */
  sm: "size-16",
  /** M — cards. */
  md: "size-28",
  /** G — heróis das páginas de produto. */
  lg: "size-40 sm:size-48",
};

/** Paleta provisória (tokens `silver-*` e `gold-*` em globals.css). */
const palette: Record<SealLevel, { light: string; mid: string; dark: string; ring: string; label: string }> = {
  prata: {
    light: "var(--color-silver-100)",
    mid: "var(--color-silver-300)",
    dark: "var(--color-silver-500)",
    ring: "var(--color-silver-300)",
    label: "PRATA",
  },
  ouro: {
    light: "var(--color-gold-300)",
    mid: "var(--color-gold-500)",
    dark: "var(--color-gold-700)",
    ring: "var(--color-gold-100)",
    label: "OURO",
  },
};

interface SealBadgeProps {
  level: SealLevel;
  size?: Size;
  className?: string;
  /** Por padrão o selo é decorativo (o nome aparece em texto ao lado). Passe um rótulo para torná-lo uma imagem acessível. */
  label?: string;
}

/**
 * Badge do Selo Ficha Limpa BPM Pro (Prata ou Ouro), em SVG, nos tamanhos P, M e G.
 * As cores e o acabamento finais virão do manual da marca — aqui ficam ligados aos tokens provisórios.
 */
export function SealBadge({ level, size = "md", className, label }: SealBadgeProps) {
  const id = useId().replace(/:/g, "");
  const colors = palette[level];
  if (!label) {
    return (
      <svg viewBox="0 0 120 120" className={cn("shrink-0", sizes[size], className)} data-seal={level} aria-hidden>
        <SealArt id={id} colors={colors} />
      </svg>
    );
  }
  const titleId = `seal-title-${id}`;
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("shrink-0", sizes[size], className)}
      data-seal={level}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{label}</title>
      <SealArt id={id} colors={colors} />
    </svg>
  );
}

/** Desenho do selo (gradiente, anéis e textos). */
function SealArt({ id, colors }: { id: string; colors: (typeof palette)[SealLevel] }) {
  return (
    <>
      <defs>
        <radialGradient id={`seal-${id}`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor={colors.light} />
          <stop offset="0.55" stopColor={colors.mid} />
          <stop offset="1" stopColor={colors.dark} />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill={colors.ring} />
      <circle cx="60" cy="60" r="51" fill={`url(#seal-${id})`} />
      <circle cx="60" cy="60" r="44" fill="none" stroke="white" strokeOpacity="0.45" strokeWidth="1" />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        className="fill-ink-950 font-display font-semibold"
        style={{ fontSize: 19, letterSpacing: "0.04em" }}
      >
        {colors.label}
      </text>
      <text
        x="60"
        y="78"
        textAnchor="middle"
        className="fill-ink-950 font-sans font-semibold"
        style={{ fontSize: 8, letterSpacing: "0.14em" }}
      >
        FICHA LIMPA
      </text>
    </>
  );
}

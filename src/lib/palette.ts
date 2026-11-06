/**
 * Ciclo de cores da identidade "Brasil em movimento".
 * Classes literais para o Tailwind detectar. Texto sobre amarelo é escuro (contraste AA).
 */
export const colorCycle = [
  {
    solid: "bg-brand-700 text-white",
    soft: "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300",
    text: "text-brand-700 dark:text-brand-300",
    ring: "hover:ring-brand-300",
  },
  {
    solid: "bg-accent-400 text-ink-950",
    soft: "bg-accent-300/30 text-ink-900 dark:bg-accent-500/15 dark:text-accent-300",
    text: "text-ink-900 dark:text-accent-300",
    ring: "hover:ring-accent-400",
  },
  {
    solid: "bg-ocean-600 text-white",
    soft: "bg-ocean-300/25 text-ocean-700 dark:bg-ocean-700/30 dark:text-ocean-300",
    text: "text-ocean-700 dark:text-ocean-300",
    ring: "hover:ring-ocean-300",
  },
  {
    solid: "bg-coral-600 text-white",
    soft: "bg-coral-300/25 text-coral-700 dark:bg-coral-700/30 dark:text-coral-300",
    text: "text-coral-700 dark:text-coral-300",
    ring: "hover:ring-coral-300",
  },
] as const;

export type CycleColor = (typeof colorCycle)[number];

/** Cor da posição `index`, repetindo o ciclo. */
export function cycleColor(index: number): CycleColor {
  const size = colorCycle.length;
  return colorCycle[((index % size) + size) % size] as CycleColor;
}

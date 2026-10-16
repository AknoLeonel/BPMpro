/**
 * Motion tokens — fonte única de duração, easing e distância.
 *
 * Princípios (ver docs/MOTION.md):
 * 1. Propósito: movimento orienta atenção e comunica estado, nunca decora sozinho.
 * 2. Duração proporcional ao tamanho/distância: micro < pequeno < médio < grande.
 * 3. Entrada desacelera (ease-out), saída acelera (ease-in) e é ~30% mais rápida.
 * 4. Distâncias curtas (8–24px); opacidade + transform, nunca propriedades de layout.
 * 5. Coreografia: itens relacionados entram em sequência (stagger 50–80ms).
 * 6. Continuidade: skeleton tem o mesmo layout do conteúdo final (zero CLS).
 * 7. Respeito: `prefers-reduced-motion` remove deslocamento e mantém só fade curto.
 */
export const duration = {
  micro: 0.12,
  small: 0.2,
  medium: 0.32,
  large: 0.5,
  progress: 0.6,
} as const;

export const easing = {
  /** Entrada — desacelera ao chegar. */
  enter: [0.16, 1, 0.3, 1],
  /** Saída — acelera ao sair. */
  exit: [0.7, 0, 0.84, 0],
  /** Movimento entre estados visíveis. */
  move: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const distance = { sm: 8, md: 16, lg: 24 } as const;

export const stagger = { tight: 0.05, base: 0.08 } as const;

/** Saídas são mais rápidas que entradas. */
export function exitDuration(enter: number): number {
  return Math.round(enter * 0.7 * 1000) / 1000;
}

export type Direction = "up" | "down" | "left" | "right" | "none";

export function offsetFor(direction: Direction, amount: number = distance.md) {
  switch (direction) {
    case "up":
      return { x: 0, y: amount };
    case "down":
      return { x: 0, y: -amount };
    case "left":
      return { x: amount, y: 0 };
    case "right":
      return { x: -amount, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

/** Variants padrão de entrada/saída usados pelos primitivos de motion. */
export function fadeSlide(direction: Direction = "up", reduced = false) {
  const { x, y } = reduced ? { x: 0, y: 0 } : offsetFor(direction);
  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduced ? duration.micro : duration.large, ease: easing.enter },
    },
    exit: {
      opacity: 0,
      x: reduced ? 0 : -x / 2,
      y: reduced ? 0 : -y / 2,
      transition: { duration: exitDuration(duration.medium), ease: easing.exit },
    },
  };
}

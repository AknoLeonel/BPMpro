import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * - primary: azul-petróleo com texto branco (4.91:1) — a ação principal do bloco.
 * - secondary: contorno preto, para fundos claros.
 * - inverse: contorno claro, para fundos pretos ou azul-petróleo.
 * - ghost: só texto.
 */
type Variant = "primary" | "secondary" | "inverse" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-sans font-semibold " +
  "transition-[transform,background-color,box-shadow,color,border-color] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-elevation-2 active:bg-brand-800",
  secondary:
    "border-2 border-ink-950 text-ink-950 hover:-translate-y-0.5 hover:bg-ink-950 hover:text-white focus-visible:ring-offset-white",
  inverse:
    "border-2 border-white/80 text-white hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink-950 focus-visible:ring-offset-ink-950",
  ghost: "text-ink-950 hover:bg-ink-100",
};

const sizes: Record<Size, string> = { md: "h-11 px-5 text-[0.9375rem]", lg: "h-14 px-7 text-base" };

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  loading = false,
  ...props
}: CommonProps & ComponentProps<"button"> & { loading?: boolean }) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      disabled={loading || props.disabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

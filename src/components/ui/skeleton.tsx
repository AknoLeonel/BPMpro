import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  /** Formas comuns: bloco, linha de texto ou círculo (avatar/ícone). */
  shape?: "block" | "text" | "circle";
}

/** Placeholder com shimmer; respeita reduced-motion via CSS. */
export function Skeleton({ className, shape = "block" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      data-testid="skeleton"
      className={cn(
        "skeleton relative overflow-hidden bg-ink-100 dark:bg-ink-800",
        shape === "text" && "h-4 rounded-md",
        shape === "circle" && "rounded-full",
        shape === "block" && "rounded-2xl",
        className,
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2.5", className)} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} shape="text" className={i === lines - 1 ? "w-2/3" : "w-full"} />
      ))}
    </div>
  );
}

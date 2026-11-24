import { cn } from "@/lib/utils";

/**
 * Elementos geométricos do Manual de Marca (faixas, triângulos, quarto de círculo e traço vermelho).
 * São sempre decorativos (`aria-hidden`) e nunca carregam informação.
 */

/** Faixas horizontais — azul-petróleo intercalado com preto/cinza. */
export function Stripes({ className, count = 3 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden className={cn("flex flex-col gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block h-3 w-full bg-brand-500" />
      ))}
    </div>
  );
}

/** Grade de triângulos vermelho/claro, como nas peças de referência. */
export function Triangles({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={cn("h-24 w-24", className)}>
      <rect width="120" height="120" className="fill-ink-100" />
      <path d="M0 0h60L0 60Z" className="fill-signal-500" />
      <path d="M60 60h60L60 120Z" className="fill-signal-500" />
      <path d="M60 0v60L120 0Z" className="fill-white" />
      <path d="M0 60v60h60Z" className="fill-signal-500" />
    </svg>
  );
}

/** Quarto de círculo em azul-petróleo. */
export function QuarterCircle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={cn("h-24 w-24", className)}>
      <path d="M0 0h100v100A100 100 0 0 1 0 0Z" className="fill-brand-500" />
    </svg>
  );
}

/** Faixas diagonais em "N" da capa do manual. */
export function Chevrons({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 200" className={cn("h-40 w-auto", className)}>
      {[0, 64, 128].map((y) => (
        <g key={y} transform={`translate(0 ${y})`} className="fill-brand-500">
          <path d="M0 0h120L0 36Z" />
          <path d="M100 36 220 0v36Z" />
        </g>
      ))}
    </svg>
  );
}

/** Traço vermelho curto sobre os títulos. */
export function RedRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-1 w-12 bg-signal-500", className)} />;
}

/** Composição de rodapé/cabeçalho de seção: faixas + triângulos + quarto de círculo. */
export function BrandBand({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-16 w-full items-stretch overflow-hidden", className)}>
      <Stripes className="w-1/3 justify-center" count={3} />
      <Triangles className="h-16 w-16 shrink-0" />
      <QuarterCircle className="h-16 w-16 shrink-0 -scale-x-100" />
      <div className="flex-1 bg-ink-950" />
    </div>
  );
}

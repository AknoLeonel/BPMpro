import { Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { transparencyNotice } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductSection } from "./product-section";

/** Aviso obrigatório de todas as páginas de produto — destaque com o traço vermelho da marca. */
export function TransparencyNotice({ className }: { className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-4 rounded-md border-signal-500 border-l-4 bg-white p-6 shadow-elevation-1 sm:gap-5 sm:p-8",
        className,
      )}
    >
      <Info aria-hidden strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-brand-700" />
      <p className="text-pretty text-ink-950 text-lg leading-relaxed">{transparencyNotice}</p>
    </div>
  );
}

/** Seção 8 — transparência, em destaque sobre o cinza-claro. */
export function TransparencySection() {
  return (
    <ProductSection id="transparencia" title="Transparência" surface="muted">
      <Reveal className="mx-auto max-w-3xl">
        <TransparencyNotice />
      </Reveal>
    </ProductSection>
  );
}

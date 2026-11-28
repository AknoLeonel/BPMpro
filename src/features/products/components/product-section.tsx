import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ProductSectionProps {
  id: string;
  title: string;
  description?: string;
  /** Fundo chapado: branco ou cinza-claro da marca. */
  surface?: "white" | "muted";
  children: ReactNode;
  className?: string;
}

/** Seção padrão das páginas de produto: `<section aria-labelledby>` + SectionHeading (h2). */
export function ProductSection({
  id,
  title,
  description,
  surface = "white",
  children,
  className,
}: ProductSectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("py-20 lg:py-28", surface === "muted" ? "bg-ink-100" : "bg-white", className)}
    >
      <Container>
        <SectionHeading id={titleId} title={title} description={description} />
        <div className="mt-14 lg:mt-16">{children}</div>
      </Container>
    </section>
  );
}

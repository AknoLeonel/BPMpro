import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Crumb {
  label: string;
  /** Sem `href`: página atual. */
  href?: string;
}

/** Trilha de navegação (sobre o fundo escuro do hero). */
export function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Trilha" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-1 text-ink-400 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? <ChevronRight aria-hidden strokeWidth={1.5} className="size-4 shrink-0" /> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-sm text-ink-100 underline decoration-ink-100/40 underline-offset-4 transition-colors hover:decoration-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 motion-reduce:transition-none"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="inline-flex min-h-11 items-center font-medium text-white">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

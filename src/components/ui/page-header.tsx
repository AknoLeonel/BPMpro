import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";
import { RedRule, Stripes } from "./brand-shapes";
import { Container } from "./container";
import { Skeleton, SkeletonText } from "./skeleton";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface PageHeaderProps {
  /** Único h1 da página. */
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  /** Trilha até a página atual (a página atual entra pelo `title`, sem link). */
  breadcrumb?: readonly BreadcrumbItem[];
  /** CTAs abaixo da descrição. */
  children?: ReactNode;
  /** Id do h1 (para `aria-labelledby` da seção). */
  id?: string;
  className?: string;
}

const headerSpacing = "pt-[calc(72px+2.5rem)] pb-16 sm:pt-[calc(72px+4rem)] lg:pb-20";

function Breadcrumb({ items, current }: { items: readonly BreadcrumbItem[]; current: ReactNode }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1 text-ink-400 text-sm">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-1">
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-sm text-ink-100 underline decoration-ink-100/40 underline-offset-4 transition-colors hover:decoration-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 motion-reduce:transition-none"
            >
              {item.label}
            </Link>
            <ChevronRight aria-hidden strokeWidth={1.5} className="size-4 shrink-0" />
          </li>
        ))}
        <li aria-current="page" className="inline-flex min-h-11 items-center text-ink-400">
          {current}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Cabeçalho das páginas internas: faixa preta (como o hero, porém compacta), eyebrow → traço vermelho → h1.
 * Reserva os 72px do cabeçalho fixo no topo.
 */
export function PageHeader({ title, eyebrow, description, breadcrumb, children, id, className }: PageHeaderProps) {
  return (
    <header className={cn("relative isolate overflow-hidden bg-ink-950 text-ink-100", headerSpacing, className)}>
      <div aria-hidden className="pointer-events-none absolute top-1/2 -right-24 -z-10 -translate-y-1/2 sm:-right-10">
        <Reveal direction="left">
          <BrandSymbol className="h-[26rem] text-ink-900 sm:h-[32rem]" />
        </Reveal>
      </div>
      <div aria-hidden className="absolute bottom-0 left-0 -z-10 flex h-10 w-full max-w-xs items-stretch sm:h-12">
        <Reveal direction="right" className="flex flex-1 flex-col justify-center">
          <Stripes count={3} className="w-full gap-1.5" />
        </Reveal>
      </div>

      <Container>
        {breadcrumb && breadcrumb.length > 0 ? <Breadcrumb items={breadcrumb} current={title} /> : null}
        <Stagger className="max-w-3xl">
          <StaggerItem>
            {eyebrow ? (
              <p className="mb-5 font-display font-semibold text-brand-300 text-xs uppercase leading-relaxed tracking-[0.16em]">
                {eyebrow}
              </p>
            ) : null}
            <RedRule />
          </StaggerItem>
          <StaggerItem>
            <h1
              id={id}
              className="mt-6 text-balance font-semibold text-[clamp(2.25rem,3vw+1.25rem,3.75rem)] text-white leading-[1.08] tracking-[-0.01em]"
            >
              {title}
            </h1>
          </StaggerItem>
          {description ? (
            <StaggerItem>
              <p className="mt-6 max-w-2xl text-pretty text-ink-100 text-lg leading-relaxed">{description}</p>
            </StaggerItem>
          ) : null}
          {children ? (
            <StaggerItem className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{children}</StaggerItem>
          ) : null}
        </Stagger>
      </Container>
    </header>
  );
}

/** Skeleton com o mesmo layout do `PageHeader` — base dos `loading.tsx` das páginas internas. */
export function PageHeaderSkeleton({ withActions = false }: { withActions?: boolean }) {
  return (
    <div className={cn("bg-ink-950", headerSpacing)}>
      <Container>
        <div className="max-w-3xl">
          <Skeleton shape="text" className="h-3 w-24 bg-ink-800" />
          <Skeleton shape="text" className="mt-6 h-1 w-12 bg-ink-800" />
          <Skeleton shape="text" className="mt-6 h-11 w-full bg-ink-800" />
          <Skeleton shape="text" className="mt-3 h-11 w-3/5 bg-ink-800" />
          <Skeleton shape="text" className="mt-6 h-5 w-4/5 bg-ink-800" />
          {withActions ? (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-14 w-full rounded-full bg-ink-800 sm:w-56" />
              <Skeleton className="h-14 w-full rounded-full bg-ink-800 sm:w-48" />
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

/** Skeleton genérico de seção (título + texto + grade de cards) abaixo do cabeçalho. */
export function PageSectionSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="bg-white py-20 lg:py-28">
      <Container>
        <Skeleton shape="text" className="h-1 w-12" />
        <Skeleton shape="text" className="mt-5 h-10 w-2/3" />
        <SkeletonText className="mt-5 max-w-2xl" lines={2} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Array.from({ length: cards }, (_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </Container>
    </div>
  );
}

import { Container } from "@/components/ui/container";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Miolo do formulário de contato (o painel branco fica na seção). Mesmo layout do ContactForm. */
export function ProductFormSkeleton() {
  return (
    <div className="space-y-5" data-testid="product-form-skeleton">
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton shape="text" className="h-3.5 w-24" />
            <Skeleton className="h-12 rounded-sm" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton shape="text" className="h-3.5 w-20" />
        <Skeleton className="h-28 rounded-sm" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="size-5 shrink-0 rounded-[4px]" />
        <SkeletonText lines={2} className="flex-1" />
      </div>
      <Skeleton className="h-14 rounded-full" />
    </div>
  );
}

/** Skeleton de rota das páginas de produto: hero escuro + primeira seção. */
export function ProductPageSkeleton({ seals = 2 }: { seals?: number }) {
  return (
    <div role="status" aria-label="Carregando página">
      <div className="bg-ink-950 pt-[calc(72px+3rem)] pb-24 lg:pb-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div className="max-w-2xl">
            <Skeleton className="h-4 w-48 bg-ink-800" />
            <Skeleton className="mt-5 h-1 w-16 bg-ink-800" />
            <div className="mt-6 space-y-3">
              <Skeleton shape="text" className="h-12 w-full bg-ink-800" />
              <Skeleton shape="text" className="h-12 w-3/4 bg-ink-800" />
            </div>
            <div className="mt-6 space-y-2.5">
              <Skeleton shape="text" className="w-full bg-ink-800" />
              <Skeleton shape="text" className="w-2/3 bg-ink-800" />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full bg-ink-800" />
              ))}
            </div>
            <Skeleton className="mt-10 h-14 w-56 rounded-full bg-ink-800" />
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-6 lg:justify-end">
            {Array.from({ length: seals }, (_, i) => (
              <Skeleton key={i} shape="circle" className="size-40 bg-ink-800 sm:size-48" />
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-ink-100 py-20 lg:py-28">
        <Container>
          <Skeleton className="mx-auto h-10 w-3/4 max-w-2xl" />
          <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-16 lg:gap-5">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-56 bg-white" />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

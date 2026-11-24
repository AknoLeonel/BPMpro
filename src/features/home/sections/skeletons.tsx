import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Skeletons com as mesmas dimensões das seções finais (CLS ≈ 0). */
export function TestimonialsSkeleton() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-elevation-1 sm:p-10" data-testid="testimonials-skeleton">
      <Skeleton className="h-12 w-8" />
      <div className="mt-2 min-h-56 space-y-3 sm:min-h-48">
        <Skeleton shape="text" className="h-6 w-11/12" />
        <Skeleton shape="text" className="h-6 w-4/5" />
        <Skeleton shape="text" className="h-6 w-2/3" />
        <div className="mt-8 flex items-center gap-4">
          <Skeleton shape="circle" className="size-12" />
          <div className="space-y-2">
            <Skeleton shape="text" className="w-32" />
            <Skeleton shape="text" className="w-48" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-ink-200 border-t pt-6">
        <Skeleton shape="text" className="w-16" />
        <div className="flex gap-3">
          <Skeleton shape="circle" className="size-11" />
          <Skeleton shape="circle" className="size-11" />
        </div>
      </div>
    </div>
  );
}

export function FaqSkeleton() {
  return (
    <div className="border-ink-200 border-t" data-testid="faq-skeleton">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center justify-between gap-6 border-ink-200 border-b py-6">
          <Skeleton shape="text" className="h-5 w-3/4" />
          <Skeleton shape="circle" className="size-9" />
        </div>
      ))}
    </div>
  );
}

/** O painel branco fica na seção; o skeleton desenha só o miolo do formulário. */
export function ContactFormSkeleton() {
  return (
    <div className="space-y-5" data-testid="contact-skeleton">
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 8 }, (_, i) => (
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

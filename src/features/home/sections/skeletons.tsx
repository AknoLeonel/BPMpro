import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Skeletons com as mesmas dimensões das seções finais (CLS ≈ 0). */
export function TestimonialsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl" data-testid="testimonials-skeleton">
      <Skeleton shape="circle" className="mx-auto size-10" />
      <div className="mt-8 min-h-56 space-y-3 sm:min-h-44">
        <Skeleton shape="text" className="mx-auto h-7 w-11/12" />
        <Skeleton shape="text" className="mx-auto h-7 w-4/5" />
        <Skeleton shape="text" className="mx-auto mt-6 w-48" />
      </div>
      <Skeleton className="mx-auto mt-10 h-11 w-56 rounded-full" />
    </div>
  );
}

export function FaqSkeleton() {
  return (
    <div
      className="space-y-px rounded-3xl bg-white px-6 ring-1 ring-ink-100 sm:px-8 dark:bg-ink-900 dark:ring-ink-800"
      data-testid="faq-skeleton"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center justify-between gap-6 py-6">
          <Skeleton shape="text" className="h-5 w-3/4" />
          <Skeleton shape="circle" className="size-8" />
        </div>
      ))}
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div
      className="space-y-5 rounded-3xl bg-white p-6 shadow-2xl sm:p-8 dark:bg-ink-900"
      data-testid="contact-skeleton"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton shape="text" className="w-24" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        ))}
      </div>
      <SkeletonText lines={1} className="w-28" />
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-14 rounded-full" />
    </div>
  );
}

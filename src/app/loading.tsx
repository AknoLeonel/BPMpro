import { Container } from "@/components/ui/container";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Skeleton de rota exibido via Suspense durante streaming/navegação. */
export default function Loading() {
  return (
    <div role="status" aria-label="Carregando página" className="pt-32 pb-20 sm:pt-40">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Skeleton className="h-7 w-56 rounded-full" />
          <div className="mt-6 space-y-3">
            <Skeleton shape="text" className="h-12 w-full" />
            <Skeleton shape="text" className="h-12 w-4/5" />
          </div>
          <SkeletonText className="mt-6" lines={3} />
          <div className="mt-9 flex gap-3">
            <Skeleton className="h-14 w-52 rounded-full" />
            <Skeleton className="h-14 w-44 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-[26rem] rounded-3xl" />
      </Container>
    </div>
  );
}

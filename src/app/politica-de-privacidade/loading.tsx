import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Skeleton da Política de Privacidade: cabeçalho + blocos de seção. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Carregando política de privacidade"
      className="bg-white px-4 pt-[calc(72px+3rem)] pb-20 sm:px-6 sm:pt-[calc(72px+4.5rem)] lg:pb-28"
    >
      <div className="mx-auto w-full max-w-3xl">
        <Skeleton shape="text" className="h-3 w-16" />
        <Skeleton shape="text" className="mt-9 h-11 w-4/5" />
        <Skeleton shape="text" className="mt-5 h-5 w-3/4" />
        <div className="mt-12 space-y-12">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i}>
              <Skeleton shape="text" className="h-6 w-1/2" />
              <SkeletonText className="mt-4" lines={3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

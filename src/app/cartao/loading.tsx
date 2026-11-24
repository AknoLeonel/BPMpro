import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton do cartão digital: mesmo layout (topo escuro + pilha de 8 botões). */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Carregando cartão digital"
      className="bg-ink-100 px-4 pt-[calc(72px+2rem)] pb-16 sm:pt-[calc(72px+3.5rem)] sm:pb-24"
    >
      <div className="mx-auto w-full max-w-[420px]">
        <div className="rounded-t-xl bg-ink-950 px-6 pt-10 pb-24">
          <Skeleton className="h-14 w-12 rounded-md bg-ink-800" />
          <Skeleton shape="text" className="mt-12 h-7 w-4/5 bg-ink-800" />
          <Skeleton shape="text" className="mt-3 h-7 w-3/5 bg-ink-800" />
          <Skeleton shape="text" className="mt-5 w-11/12 bg-ink-800" />
        </div>
        <div className="flex flex-col gap-3 rounded-b-xl bg-white p-4 shadow-elevation-2 sm:p-5">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

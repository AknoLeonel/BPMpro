import { PageHeaderSkeleton } from "@/components/ui/page-header";

/** Skeleton da página "Em breve": cabeçalho com as duas ações. */
export default function Loading() {
  return (
    <div role="status" aria-label="Carregando página">
      <PageHeaderSkeleton withActions />
    </div>
  );
}

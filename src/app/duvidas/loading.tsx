import { PageHeaderSkeleton, PageSectionSkeleton } from "@/components/ui/page-header";

/** Skeleton da página: cabeçalho escuro + primeira seção. */
export default function Loading() {
  return (
    <div role="status" aria-label="Carregando dúvidas frequentes">
      <PageHeaderSkeleton />
      <PageSectionSkeleton />
    </div>
  );
}

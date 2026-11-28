import type { Metadata } from "next";
import { SealPage } from "@/features/products/seal-page";
import { sealPages } from "@/lib/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: sealPages.ouro.title,
  description: sealPages.ouro.subtitle,
  alternates: { canonical: routes.fichaLimpaOuro },
};

export default function SealOuroPage() {
  return <SealPage level="ouro" />;
}

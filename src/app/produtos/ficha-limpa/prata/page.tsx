import type { Metadata } from "next";
import { SealPage } from "@/features/products/seal-page";
import { sealPages } from "@/lib/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: sealPages.prata.title,
  description: sealPages.prata.subtitle,
  alternates: { canonical: routes.fichaLimpaPrata },
};

export default function SealPrataPage() {
  return <SealPage level="prata" />;
}

import type { Metadata } from "next";
import { ProductsHubPage } from "@/features/products/products-hub-page";
import { productsHub } from "@/lib/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: productsHub.title,
  description: productsHub.subtitle,
  alternates: { canonical: routes.products },
};

export default function ProductsPage() {
  return <ProductsHubPage />;
}

import type { Metadata } from "next";
import { FichaLimpaPage } from "@/features/products/ficha-limpa-page";
import { fichaLimpa } from "@/lib/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: fichaLimpa.hero.title,
  description: fichaLimpa.hero.subtitle,
  alternates: { canonical: routes.fichaLimpa },
};

export default function FichaLimpaRoute() {
  return <FichaLimpaPage />;
}

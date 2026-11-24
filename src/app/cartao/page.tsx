import type { Metadata } from "next";
import { BusinessCard } from "@/features/card/business-card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cartão digital",
  description: siteConfig.summary,
  alternates: { canonical: "/cartao" },
};

export default function CardPage() {
  return <BusinessCard />;
}

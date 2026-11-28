import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/coming-soon";
import { upcomingRoutes } from "@/lib/routes";

const page = upcomingRoutes.management;

export const metadata: Metadata = {
  title: `${page.title} — em breve`,
  description: page.description,
  alternates: { canonical: page.href },
  robots: { index: false, follow: false },
};

export default function ManagementPage() {
  return <ComingSoon title={page.title} description={page.description} context="gestao" />;
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { About } from "@/features/home/sections/about";
import { Areas } from "@/features/home/sections/areas";
import { Differentials } from "@/features/home/sections/differentials";
import { Experience } from "@/features/home/sections/experience";
import { routes } from "@/lib/routes";
import { about, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre",
  description: `${siteConfig.fullName}: projetos com recursos públicos de ponta a ponta para associações, ligas, federações, clubes e institutos.`,
  alternates: { canonical: routes.about },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Sobre" title={about.title} description={siteConfig.summary} />
      <About />
      <Areas />
      <Differentials />
      <Experience />
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Audiences } from "@/features/home/sections/audiences";
import { Contact } from "@/features/home/sections/contact";
import { Journey } from "@/features/home/sections/journey";
import { routes } from "@/lib/routes";
import { journey } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "Do diagnóstico à prestação de contas: as etapas para o projeto da sua entidade sair do papel com recursos públicos.",
  alternates: { canonical: routes.howItWorks },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="Como funciona" title={journey.title} />
      <Journey />
      <Audiences />
      <Contact />
    </>
  );
}

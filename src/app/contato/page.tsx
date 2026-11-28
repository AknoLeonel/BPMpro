import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Contact } from "@/features/home/sections/contact";
import { routes } from "@/lib/routes";
import { contact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description: contact.subtitle,
  alternates: { canonical: routes.contact },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contato" title={contact.title} description={contact.subtitle} />
      <Contact />
    </>
  );
}

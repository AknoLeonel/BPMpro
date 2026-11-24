import type { Metadata } from "next";
import { PrivacyPolicy } from "@/features/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Brasil Projetos em Movimento trata os dados pessoais enviados pelo site, conforme a LGPD.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}

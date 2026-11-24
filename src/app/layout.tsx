import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { BrowserObservability } from "@/components/observability";
import { siteConfig } from "@/lib/site-config";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/montserrat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.seoTitle, template: `%s | ${siteConfig.fullName}` },
  description: siteConfig.description,
  keywords: [
    "projetos com recursos públicos",
    "captação de recursos",
    "emendas parlamentares",
    "projetos esportivos",
    "elaboração de projetos",
    "execução de projetos",
    "licitações",
    "prestação de contas",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: siteConfig.tagline,
    description: siteConfig.domain,
  },
  twitter: { card: "summary_large_image", title: siteConfig.tagline, description: siteConfig.description },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.fullName,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  alternateName: siteConfig.name,
  areaServed: "BR",
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[70] rounded-full bg-brand-500 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
        <BrowserObservability />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático e serializado
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

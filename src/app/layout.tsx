import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { BrowserObservability } from "@/components/observability";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.fullName} | Captação e gestão de projetos`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "captação de recursos",
    "projetos sociais",
    "lei de incentivo ao esporte",
    "lei rouanet",
    "emendas parlamentares",
    "prestação de contas",
    "MROSC",
    "terceiro setor",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: siteConfig.fullName,
    description: siteConfig.tagline,
  },
  twitter: { card: "summary_large_image", title: siteConfig.fullName, description: siteConfig.tagline },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.fullName,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  areaServed: "BR",
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[70] rounded-full bg-brand-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
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

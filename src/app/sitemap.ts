import type { MetadataRoute } from "next";
import { publicPages } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

/** Sitemap gerado do mapa do site (`routes.ts`): só páginas públicas indexáveis. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicPages.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

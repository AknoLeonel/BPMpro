import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Tudo liberado para os buscadores. As rotas "Em breve" (área restrita, gestão, verificar selo)
 * saem do índice pelo `noindex` das próprias páginas — bloquear aqui impediria o buscador de lê-lo.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${siteConfig.url}/sitemap.xml` };
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/cartao`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}

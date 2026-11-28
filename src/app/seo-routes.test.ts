import { describe, expect, it } from "vitest";
import { publicPages, routes, upcomingRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lista todas as páginas públicas com URL absoluta", () => {
    expect(urls).toHaveLength(publicPages.length);
    expect(urls).toContain(siteConfig.url);
    expect(urls).toContain(`${siteConfig.url}${routes.fichaLimpa}`);
    expect(urls).toContain(`${siteConfig.url}${routes.privacy}`);
  });

  it("não inclui rotas Em breve nem o endereço antigo da privacidade", () => {
    for (const page of Object.values(upcomingRoutes)) expect(urls).not.toContain(`${siteConfig.url}${page.href}`);
    expect(urls).not.toContain(`${siteConfig.url}/privacidade`);
  });
});

describe("robots", () => {
  it("não bloqueia as rotas Em breve (o noindex delas precisa ser lido) e aponta o sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules[0]?.disallow).toBeUndefined();
    expect(result.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});

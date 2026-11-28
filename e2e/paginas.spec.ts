import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import { publicPages, routes, upcomingRoutes } from "../src/lib/routes";

/** Páginas internas desta entrega (home, cartão e produtos têm specs próprios). */
const sitePages = publicPages
  .map(({ path }) => path)
  .filter((path) => path !== routes.home && path !== routes.card && !path.startsWith(routes.products));

async function expectNoAxeViolations(page: Page) {
  // Rola a página inteira para concluir as animações de entrada e carregar os blocos lazy.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(1200);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
}

test.describe("Páginas do site", () => {
  for (const path of sitePages) {
    test(`${path} responde 200 com um único h1`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    });
  }

  test("/privacidade redireciona para /politica-de-privacidade", async ({ page }) => {
    await page.goto("/privacidade");
    await expect(page).toHaveURL(/\/politica-de-privacidade$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Política de Privacidade");
  });

  test("/duvidas traz as dúvidas gerais e as dos selos", async ({ page }) => {
    await page.goto(routes.faq);
    await expect(page.getByRole("heading", { level: 2, name: "Dúvidas sobre os selos" })).toBeVisible();
  });
});

test.describe("Páginas Em breve", () => {
  for (const { href, title } of Object.values(upcomingRoutes)) {
    test(`${href} mostra "Em breve" e não é indexada`, async ({ page }) => {
      const response = await page.goto(href);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      await expect(page.getByText("Em breve", { exact: true })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      await expect(page.getByRole("main").getByRole("link", { name: /Voltar para o início/ })).toHaveAttribute(
        "href",
        "/",
      );
    });
  }
});

test.describe("SEO", () => {
  test("sitemap.xml lista o Ficha Limpa e não as rotas Em breve", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    const xml = await response.text();
    expect(xml).toContain(routes.fichaLimpa);
    expect(xml).toContain(routes.privacy);
    expect(xml).not.toContain(routes.restrictedArea);
  });

  test("robots.txt não bloqueia as rotas Em breve (elas saem do índice pelo noindex)", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    for (const { href } of Object.values(upcomingRoutes)) expect(text).not.toContain(`Disallow: ${href}`);
  });
});

test.describe("Acessibilidade das páginas", () => {
  for (const path of [routes.services, routes.about, routes.faq, routes.restrictedArea]) {
    test(`${path} sem violações WCAG A/AA`, async ({ page }) => {
      await page.goto(path);
      await expectNoAxeViolations(page);
    });
  }
});

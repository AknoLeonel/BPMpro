import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const actions: readonly [RegExp, RegExp][] = [
  [/^WhatsApp/, /^https:\/\/wa\.me\/\d+\?text=/],
  [/^Ligar$/, /^tel:\+\d+$/],
  [/^E-mail$/, /^mailto:.+@.+/],
  [/^Instagram/, /instagram\.com/],
  [/^LinkedIn/, /linkedin\.com/],
  [/^Site/, /^https?:\/\//],
  [/^Como chegar/, /google\.com\/maps/],
  [/^Salvar contato$/, /^\/cartao\/vcard$/],
];

async function expectNoAxeViolations(page: Page) {
  // Rola a página inteira para concluir as animações de entrada.
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

test.describe("Cartão digital", () => {
  test("mostra nome, frase e os 8 botões com destinos corretos", async ({ page }) => {
    await page.goto("/cartao");
    await expect(page).toHaveTitle(/Cartão digital/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Brasil Projetos em Movimento");
    await expect(
      page.getByText("Projetos com recursos públicos de ponta a ponta. Esporte, cultura e turismo.").first(),
    ).toBeVisible();

    const list = page.locator("ul").filter({ has: page.getByRole("link", { name: /^Salvar contato$/ }) });
    await expect(list.getByRole("link")).toHaveCount(8);
    for (const [name, href] of actions) {
      await expect(list.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    await expect(list.getByRole("link", { name: /^Salvar contato$/ })).toHaveAttribute("download", "bpm-pro.vcf");
  });

  test("a rota do vCard devolve text/vcard com o nome da organização", async ({ request }) => {
    const response = await request.get("/cartao/vcard");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("text/vcard");
    expect(response.headers()["content-disposition"]).toContain("bpm-pro.vcf");
    expect(await response.text()).toContain("FN:Brasil Projetos em Movimento");
  });

  test("sem violações de acessibilidade WCAG A/AA", async ({ page }) => {
    await page.goto("/cartao");
    await expectNoAxeViolations(page);
  });
});

test.describe("Política de Privacidade", () => {
  test("renderiza o título principal", async ({ page }) => {
    await page.goto("/privacidade");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Política de Privacidade");
  });

  test("sem violações de acessibilidade WCAG A/AA", async ({ page }) => {
    await page.goto("/privacidade");
    await expectNoAxeViolations(page);
  });
});

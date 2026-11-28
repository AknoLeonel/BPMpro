import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/** Rola a página inteira para montar seções lazy e concluir animações de entrada. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
}

const pages = [
  { path: "/produtos", h1: "Produtos BPM Pro" },
  { path: "/produtos/ficha-limpa", h1: "Ficha Limpa da Entidade" },
  { path: "/produtos/ficha-limpa/prata", h1: "Selo Prata: apta para receber indicação" },
  { path: "/produtos/ficha-limpa/ouro", h1: "Selo Ouro: apta para este recurso" },
] as const;

test.describe("Produtos", () => {
  for (const { path, h1 } of pages) {
    test(`${path}: um h1, canonical e aviso de transparência`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
      const notice = page.getByRole("note");
      await notice.scrollIntoViewIfNeeded();
      await expect(notice).toBeVisible();
      await expect(notice).toContainText("A aprovação do plano de trabalho é sempre do órgão concedente.");
    });

    test(`${path}: sem violações de acessibilidade (WCAG A/AA)`, async ({ page }) => {
      // O axe mede o contraste das cores finais: no CI lento, rodar com as entradas ainda em fade
      // (opacidade < 1) gera falsos "color-contrast". Movimento reduzido + espera garantem o estado final.
      // Página longa + axe: folga para o CI, que é bem mais lento que a máquina local.
      test.setTimeout(60_000);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await scrollThrough(page);
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every(
            (animation) =>
              animation.playState !== "running" ||
              animation.effect?.getTiming().iterations === Number.POSITIVE_INFINITY,
          ),
      );
      await page.waitForTimeout(800);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual(
        [],
      );
    });
  }

  test("ficha limpa: seções na ordem do funil", async ({ page }) => {
    await page.goto("/produtos/ficha-limpa");
    await expect
      .poll(async () => page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id)))
      .toEqual([
        "inicio",
        "dor",
        "pilares",
        "prata-x-ouro",
        "o-que-conferimos",
        "dirigentes",
        "como-funciona",
        "transparencia",
        "duvidas",
        "solicitar",
      ]);
  });

  test("ficha limpa: o acordeão do checklist abre e fecha", async ({ page }) => {
    await page.goto("/produtos/ficha-limpa");
    const group = page.getByRole("button", { name: /Governo do DF/ });
    await group.scrollIntoViewIfNeeded();
    await expect(group).toHaveAttribute("aria-expanded", "false");
    await group.click();
    await expect(group).toHaveAttribute("aria-expanded", "true");
    const region = page.getByRole("region", { name: /Governo do DF/ });
    await expect(region).toBeVisible();
    await expect(region).toContainText("Certidão Negativa de Dívida Ativa do DF");
    await group.press("Home");
    await expect(page.getByRole("button", { name: /As 3 obrigatórias/ })).toBeFocused();
  });

  test("prata: formulário com o produto Selo Prata pré-selecionado", async ({ page }) => {
    await page.goto("/produtos/ficha-limpa/prata");
    await page.locator("#solicitar").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Produto")).toHaveValue("Selo Prata");
    await expect(page.locator('[data-whatsapp-context="product-prata"]')).toHaveAttribute(
      "href",
      /Quero%20o%20Selo%20Prata/,
    );
  });

  test("prata: trilha de navegação e sem o Pilar 3", async ({ page }) => {
    await page.goto("/produtos/ficha-limpa/prata");
    const trail = page.getByRole("navigation", { name: "Trilha" });
    await expect(trail.getByRole("link", { name: "Produtos" })).toHaveAttribute("href", "/produtos");
    await expect(trail.locator('[aria-current="page"]')).toHaveText("Selo Prata");
    await expect(page.getByRole("button", { name: /Pilar 3/ })).toHaveCount(0);
  });

  test("ouro: formulário com Selo Ouro e link para o Selo Prata", async ({ page }) => {
    await page.goto("/produtos/ficha-limpa/ouro");
    await page.locator("#solicitar").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Produto")).toHaveValue("Selo Ouro");
    await expect(page.getByRole("link", { name: /Quero o Selo Prata/ })).toHaveAttribute(
      "href",
      "/produtos/ficha-limpa/prata",
    );
  });

  test("hub leva ao Ficha Limpa da Entidade", async ({ page }) => {
    await page.goto("/produtos");
    await page
      .getByRole("region", { name: "Ficha Limpa da Entidade" })
      .getByRole("link", { name: "Conheça o Ficha Limpa da Entidade" })
      .click();
    await expect(page).toHaveURL(/\/produtos\/ficha-limpa$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ficha Limpa da Entidade");
  });
});

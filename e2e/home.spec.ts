import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test("carrega com SEO básico e hero visível", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/BPM — Brasil Projetos em Movimento/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("em movimento");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /terceiro setor/);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test("seções interativas saem do skeleton ao rolar (lazy loading)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("contact-skeleton").first()).toBeAttached();
    await page.locator("#contato").scrollIntoViewIfNeeded();
    await expect(page.getByRole("button", { name: /solicitar diagnóstico/i })).toBeVisible();
    await expect(page.getByTestId("contact-skeleton")).toHaveCount(0);
  });

  test("navegação por âncora leva à seção", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page.getByRole("navigation", { name: "Menu móvel" }).getByRole("link", { name: "FAQ" }).click();
    } else {
      await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "FAQ" }).click();
    }
    await expect(page).toHaveURL(/#faq$/);
    await expect(page.getByRole("heading", { name: "Dúvidas comuns" })).toBeInViewport();
  });

  test("formulário valida no servidor e confirma envio", async ({ page }) => {
    await page.goto("/#contato");
    await page.locator("#contato [aria-busy]").scrollIntoViewIfNeeded();
    const submit = page.getByRole("button", { name: /solicitar diagnóstico/i });
    await submit.click();
    await expect(page.getByText("Informe seu nome completo.")).toBeVisible();
    await expect(page.getByLabel("Nome")).toHaveAttribute("aria-invalid", "true");

    await page.getByLabel("Nome").fill("Maria da Silva");
    await page.getByLabel("E-mail").fill("maria@ong.org.br");
    await page.getByLabel("Tipo de organização").selectOption("Associação / ONG");
    await page.getByLabel("Conte sobre seu projeto").fill("Queremos captar recursos para um núcleo de esporte.");
    await page.getByRole("button", { name: /solicitar diagnóstico/i }).click();

    await expect(page.getByRole("status")).toContainText("Mensagem enviada");
  });

  test("sem violações de acessibilidade WCAG A/AA", async ({ page }) => {
    await page.goto("/");
    // Rola a página inteira para montar seções lazy e concluir animações de entrada.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });

  test("404 tem página dedicada", async ({ page }) => {
    const response = await page.goto("/nao-existe");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Página não encontrada" })).toBeVisible();
  });
});

test.describe("Reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("conteúdo fica visível sem deslocamento quando o usuário reduz movimento", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect
      .poll(async () => h1.evaluate((el) => getComputedStyle(el.closest("[data-motion]") ?? el).transform))
      .toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });
});

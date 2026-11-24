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

test.describe("Home", () => {
  test("carrega com SEO do documento e hero visível", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Brasil Projetos em Movimento | Captação, projetos e prestação de contas");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Você cuida do esporte. A gente cuida do projeto.",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Projetos com recursos públicos de ponta a ponta/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Você cuida do esporte. A gente cuida do projeto.",
    );
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test("seções seguem a ordem do funil", async ({ page }) => {
    await page.goto("/");
    const funnel = [
      "dores",
      "quem-somos",
      "servicos",
      "como-funciona",
      "para-quem",
      "areas",
      "diferenciais",
      "projetos",
      "duvidas",
      "contato",
    ];
    // evaluateAll não espera: em CI a leitura podia acontecer antes de o conteúdo estar no DOM.
    await expect
      .poll(async () => {
        const ids = await page.locator("main section[id]").evaluateAll((els) => els.map((el) => el.id));
        return ids.filter((id) => funnel.includes(id));
      })
      .toEqual(funnel);
  });

  test("WhatsApp com mensagem pronta nos pontos de contato", async ({ page }) => {
    await page.goto("/");
    for (const context of ["journey", "audience-0", "audience-3", "faq", "contact"]) {
      const link = page.locator(`[data-whatsapp-context="${context}"]`).first();
      await expect(link).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+\?text=Ol%C3%A1/);
      await expect(link).toHaveAttribute("target", "_blank");
    }
    await expect(page.locator('[data-whatsapp-context="audience-0"]')).toHaveAttribute(
      "href",
      /Tenho%20uma%20ideia%20de%20projeto/,
    );
  });

  test("seções interativas saem do skeleton ao rolar (lazy loading)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("contact-skeleton").first()).toBeAttached();
    await page.locator("#contato").scrollIntoViewIfNeeded();
    await expect(page.getByRole("button", { name: "Quero meu diagnóstico gratuito" })).toBeVisible();
    await expect(page.getByTestId("contact-skeleton")).toHaveCount(0);
  });

  test("navegação por âncora leva à seção", async ({ page, isMobile }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .getByRole("navigation", { name: "Menu móvel" })
        .getByRole("link", { name: /Dúvidas/ })
        .click();
    } else {
      await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Dúvidas" }).click();
    }
    await expect(page).toHaveURL(/#duvidas$/);
    await expect(page.getByRole("heading", { name: "Dúvidas frequentes" })).toBeInViewport();
  });

  test("dúvidas: acordeão abre uma resposta por vez", async ({ page }) => {
    await page.goto("/#duvidas");
    const question = page.getByRole("button", { name: "Vocês garantem a aprovação do projeto?" });
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("A aprovação é sempre do órgão público.", { exact: false })).toBeVisible();
  });

  test("formulário valida no servidor e confirma envio", async ({ page }) => {
    await page.goto("/#contato");
    await page.locator("#contato [aria-busy]").first().scrollIntoViewIfNeeded();
    const submit = page.getByRole("button", { name: "Quero meu diagnóstico gratuito" });
    await submit.click();
    await expect(page.getByLabel("Nome", { exact: true })).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel("Nome", { exact: true })).toBeFocused();

    await page.getByLabel("Nome", { exact: true }).fill("Maria da Silva");
    await page.getByLabel("Entidade", { exact: true }).fill("Associação Esporte Vivo");
    await page.getByLabel("Cargo", { exact: true }).fill("Presidente");
    await page.getByLabel("Cidade e UF", { exact: true }).fill("Brasília/DF");
    await page.getByLabel("WhatsApp", { exact: true }).fill("(61) 99999-0000");
    await page.getByLabel("E-mail", { exact: true }).fill("maria@entidade.org.br");
    await page.getByLabel("Área", { exact: true }).selectOption("Esporte");
    await page.getByLabel("Em que etapa você está?", { exact: true }).selectOption({ index: 1 });
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Quero meu diagnóstico gratuito" }).click();

    await expect(page.getByRole("status")).toContainText("Recebemos seus dados!");
  });

  test("sem violações de acessibilidade WCAG A/AA", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      // O mapa é um iframe de terceiro (Google Maps), fora do nosso controle.
      .exclude("iframe")
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });

  test("regras do documento: sem valores, depoimentos ou números ocultos", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).not.toContainText("R$");
    await expect(page.locator("#depoimentos")).toHaveCount(0);
    await expect(page.getByTestId("differentials-stats")).toHaveCount(0);
  });

  test("botão de WhatsApp entra após rolar a página", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("whatsapp-button")).toHaveCount(0);
    await page.mouse.wheel(0, 1600);
    await expect(page.getByTestId("whatsapp-button")).toBeVisible();
    await expect(page.getByTestId("whatsapp-button")).toHaveAttribute("href", /Vim%20pelo%20site/);
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

  test("faixas em movimento ficam paradas", async ({ page }) => {
    await page.goto("/");
    const names = await page
      .getByTestId("marquee-track")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
    expect(names.length).toBeGreaterThan(0);
    expect(names.every((n) => n === "none")).toBe(true);
  });
});

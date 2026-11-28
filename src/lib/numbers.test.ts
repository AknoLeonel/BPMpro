import { describe, expect, it } from "vitest";
import { experience, heroSeals, onlyVisible, projectItems, stats } from "./numbers";
import { footer, navItems } from "./site-config";

describe("numbers.ts (arquivo de dados)", () => {
  it("onlyVisible mantém a ordem e remove os ocultos", () => {
    const items = [
      { id: 1, visible: true },
      { id: 2, visible: false },
      { id: 3, visible: true },
    ];
    expect(onlyVisible(items).map((item) => item.id)).toEqual([1, 3]);
  });

  it("guarda os números exatamente como no material da BPM", () => {
    expect(heroSeals.map((seal) => seal.text)).toEqual([
      "+ de R$ 16 milhões captados",
      "Federal, estadual e distrital",
      "Do edital à prestação de contas",
    ]);
    expect(stats.map((stat) => [stat.value, stat.label, stat.visible])).toEqual([
      ["+ de R$ 16 milhões", "captados", true],
      ["+ de 60", "projetos aprovados", true],
      ["18", "entidades atendidas", true],
      ["3 + 3", "ministérios e secretarias com projetos aprovados", true],
      ["[X]", "anos de experiência", false],
    ]);
  });

  it("todo item editável tem a chave visible", () => {
    for (const item of [...heroSeals, ...stats, ...experience.organs, ...experience.sources, ...projectItems]) {
      expect(typeof item.visible).toBe("boolean");
    }
  });

  it("os projetos começam todos ocultos até as autorizações", () => {
    expect(projectItems.every((project) => !project.visible)).toBe(true);
  });

  it("o menu segue o mapa do site da versão 2 (páginas, não âncoras)", () => {
    expect(navItems.map((item) => item.href)).toEqual([
      "/servicos",
      "/produtos",
      "/como-funciona",
      "/projetos",
      "/sobre",
      "/contato",
    ]);
    expect(footer.links.map((link) => link.href)).toContain("/politica-de-privacidade");
  });
});

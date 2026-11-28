import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { homeProducts, seals, transparencyNotice } from "@/lib/products";
import { Products } from "./products";

function renderProducts() {
  return render(
    <MotionProvider>
      <Products />
    </MotionProvider>,
  );
}

describe("Products (seção da Home)", () => {
  it("é uma seção rotulada pelo seu h2, com eyebrow e subtítulo", () => {
    renderProducts();
    const section = document.getElementById("produtos");
    expect(section?.tagName).toBe("SECTION");
    expect(section).toHaveAttribute("aria-labelledby", "produtos-title");
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveAttribute("id", "produtos-title");
    expect(title).toHaveTextContent(homeProducts.title);
    expect(screen.getByText(homeProducts.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(homeProducts.subtitle)).toBeInTheDocument();
  });

  it("mostra os dois selos, Prata antes de Ouro, cada um com frase, resumo e CTA para a sua página", () => {
    const { container } = renderProducts();
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(2);
    const expected = [seals.prata, seals.ouro];
    cards.forEach((card, index) => {
      const seal = expected[index];
      if (!seal) throw new Error("selo ausente");
      expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent(seal.name);
      expect(within(card).getByText(seal.tagline)).toBeInTheDocument();
      expect(within(card).getByText(seal.summary)).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: seal.cta })).toHaveAttribute("href", seal.href);
    });
    expect(seals.prata.href).toBe("/produtos/ficha-limpa/prata");
    expect(seals.ouro.href).toBe("/produtos/ficha-limpa/ouro");

    const badges = container.querySelectorAll("svg[data-seal]");
    expect(Array.from(badges, (badge) => badge.getAttribute("data-seal"))).toEqual(["prata", "ouro"]);
    for (const badge of badges) expect(badge).toHaveAttribute("aria-hidden", "true");
  });

  it("leva ao Ficha Limpa da Entidade e mostra o aviso de transparência", () => {
    renderProducts();
    expect(screen.getByRole("link", { name: homeProducts.link.label })).toHaveAttribute(
      "href",
      "/produtos/ficha-limpa",
    );
    expect(screen.getByTestId("products-notice")).toHaveTextContent(transparencyNotice);
  });

  it("não mostra preços nem promete aprovação", () => {
    const { container } = renderProducts();
    expect(container.textContent).not.toMatch(/R\$/);
    expect(container.textContent).not.toMatch(/garant/i);
  });
});

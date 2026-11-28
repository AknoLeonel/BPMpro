import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { fichaLimpa, productsHub, sealPages, transparencyNotice } from "@/lib/products";
import { routes } from "@/lib/routes";
import { FichaLimpaPage } from "./ficha-limpa-page";
import { ProductsHubPage } from "./products-hub-page";
import { SealPage } from "./seal-page";

vi.mock("@/features/contact/contact-form", () => ({ ContactForm: () => <div data-testid="contact-form" /> }));

const renderPage = (page: React.ReactNode) => render(<MotionProvider>{page}</MotionProvider>);

function expectProductBasics() {
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("note")).toHaveTextContent(transparencyNotice);
  const prices = document.body.textContent ?? "";
  expect(prices).not.toMatch(/R\$\s?\d/);
}

describe("FichaLimpaPage", () => {
  it("tem um h1 e as 10 seções na ordem do funil, todas rotuladas", () => {
    const { container } = renderPage(<FichaLimpaPage />);
    expectProductBasics();
    expect(screen.getByRole("heading", { level: 1, name: fichaLimpa.hero.title })).toBeInTheDocument();
    const ids = [...container.querySelectorAll("section[id]")].map((s) => s.id);
    expect(ids).toEqual([
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
    for (const section of container.querySelectorAll("section")) {
      const labelledBy = section.getAttribute("aria-labelledby");
      expect(labelledBy && document.getElementById(labelledBy)).toBeTruthy();
    }
  });

  it("CTA do hero leva ao formulário e os cards levam às páginas dos selos", () => {
    renderPage(<FichaLimpaPage />);
    expect(screen.getByRole("link", { name: fichaLimpa.hero.cta })).toHaveAttribute("href", "#solicitar");
    expect(screen.getByRole("link", { name: /Quero o Selo Prata/ })).toHaveAttribute("href", routes.fichaLimpaPrata);
    expect(screen.getByRole("link", { name: /Quero o Selo Ouro/ })).toHaveAttribute("href", routes.fichaLimpaOuro);
  });
});

describe("SealPage", () => {
  it("Prata: hero do selo, trilha, sem Pilar 3 e link para o Ouro", () => {
    renderPage(<SealPage level="prata" />);
    expectProductBasics();
    expect(screen.getByRole("heading", { level: 1, name: sealPages.prata.title })).toBeInTheDocument();
    const trail = screen.getByRole("navigation", { name: "Trilha" });
    expect(within(trail).getByRole("link", { name: "Produtos" })).toHaveAttribute("href", routes.products);
    expect(within(trail).getByRole("link", { name: fichaLimpa.hero.title })).toHaveAttribute("href", routes.fichaLimpa);
    expect(within(trail).getByText("Selo Prata")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("button", { name: /Pilar 3/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Quero o Selo Ouro/ })).toHaveAttribute("href", routes.fichaLimpaOuro);
  });

  it("Ouro: mostra o Pilar 3 e link para o Prata", () => {
    renderPage(<SealPage level="ouro" />);
    expectProductBasics();
    expect(screen.getByRole("heading", { level: 1, name: sealPages.ouro.title })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pilar 3/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Quero o Selo Prata/ })).toHaveAttribute("href", routes.fichaLimpaPrata);
  });
});

describe("ProductsHubPage", () => {
  it("lista o Ficha Limpa com os dois selos e o aviso de transparência", () => {
    const { container } = renderPage(<ProductsHubPage />);
    expectProductBasics();
    expect(screen.getByRole("heading", { level: 1, name: productsHub.title })).toBeInTheDocument();
    const [item] = productsHub.items;
    const section = screen.getByRole("region", { name: item.name });
    expect(within(section).getByRole("link", { name: item.cta })).toHaveAttribute("href", routes.fichaLimpa);
    expect(section.querySelectorAll("svg[data-seal='prata']").length).toBeGreaterThan(0);
    expect(section.querySelectorAll("svg[data-seal='ouro']").length).toBeGreaterThan(0);
    expect(container.querySelectorAll("[data-seal-card]")).toHaveLength(2);
  });
});

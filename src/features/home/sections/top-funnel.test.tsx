import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { aboutProof, heroSeals } from "@/lib/numbers";
import { about, hero, pains } from "@/lib/site-config";
import { About } from "./about";
import { Hero } from "./hero";
import { Pains } from "./pains";

function renderWithMotion(ui: ReactNode) {
  return render(<MotionProvider>{ui}</MotionProvider>);
}

describe("Hero", () => {
  it("tem o único h1 com o título e os dois CTAs", () => {
    renderWithMotion(<Hero />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(hero.title);
    expect(screen.getByRole("region", { name: hero.title })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: hero.primaryCta.label })).toHaveAttribute("href", "#contato");
    expect(screen.getByRole("link", { name: hero.secondaryCta.label })).toHaveAttribute("href", "#como-funciona");
  });

  it("mostra os três selos", () => {
    renderWithMotion(<Hero />);
    const seals = within(screen.getByRole("list", { name: "Diferenciais" })).getAllByRole("listitem");
    expect(seals.map((s) => s.textContent)).toEqual(heroSeals.filter((seal) => seal.visible).map((seal) => seal.text));
    expect(seals[0]).toHaveTextContent("+ de R$ 16 milhões captados");
  });
});

describe("Pains", () => {
  it("lista as quatro dores como h3 e a frase de fechamento", () => {
    renderWithMotion(<Pains />);
    const section = screen.getByRole("region", { name: pains.title });
    expect(section).toHaveAttribute("id", "dores");
    expect(screen.getByRole("heading", { level: 2, name: pains.title })).toHaveAttribute("id", "dores-title");

    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual(pains.items.map((item) => item.title));
    expect(titles).toHaveLength(4);
    expect(screen.getByText(pains.closing)).toBeInTheDocument();
  });
});

describe("About", () => {
  it("apresenta a BPM Pro com o CTA para os serviços", () => {
    renderWithMotion(<About />);
    const section = screen.getByRole("region", { name: about.title });
    expect(section).toHaveAttribute("id", "quem-somos");
    expect(screen.getByRole("heading", { level: 2, name: about.title })).toHaveAttribute("id", "quem-somos-title");
    // A frase com os números de autoridade fecha o texto de Quem somos.
    expect(screen.getByText(aboutProof.text).closest("p")).toHaveTextContent(`${about.text} ${aboutProof.text}`);
    expect(screen.getByRole("link", { name: about.cta.label })).toHaveAttribute("href", "/servicos");
  });
});

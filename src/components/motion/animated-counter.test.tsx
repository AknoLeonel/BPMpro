import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnimatedCounter } from "./animated-counter";

const motionState = { inView: false, reduced: false };

vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useInView: () => motionState.inView,
  useReducedMotion: () => motionState.reduced,
}));

describe("AnimatedCounter", () => {
  beforeEach(() => {
    motionState.inView = false;
    motionState.reduced = false;
  });

  it("o HTML do servidor já traz o número final (SEO e leitores de tela)", () => {
    const html = renderToString(<AnimatedCounter value="+ de R$ 16 milhões" />);
    // Cópia acessível, reserva de espaço e cópia visual.
    expect(html.match(/\+ de R\$ 16 milhões/g)).toHaveLength(3);
  });

  it("reserva o espaço do texto final durante a contagem (sem layout shift)", () => {
    const { container } = render(<AnimatedCounter value="+ de R$ 16 milhões" />);
    expect(container.querySelector(".invisible")).toHaveTextContent("+ de R$ 16 milhões");
    expect(screen.getByText("+ de R$ 0 milhões", { selector: "[data-count-visual]" })).toHaveClass("absolute");
  });

  it("fora da tela prepara a contagem a partir de zero, mantendo o valor final acessível", () => {
    render(<AnimatedCounter value="3 + 3" />);
    expect(screen.getByText("3 + 3", { selector: ".sr-only" })).toBeInTheDocument();
    expect(screen.getByText("0 + 0", { selector: "[data-count-visual]" })).toBeInTheDocument();
  });

  it("com reduced-motion mostra o número final direto", () => {
    motionState.inView = true;
    motionState.reduced = true;
    render(<AnimatedCounter value="+ de 60" />);
    expect(screen.getByText("+ de 60", { selector: "[data-count-visual]" })).toBeInTheDocument();
  });

  it("ao entrar na tela conta até o texto exato do arquivo de dados", async () => {
    motionState.inView = true;
    render(<AnimatedCounter value="18" />);
    expect(await screen.findByText("18", { selector: "[data-count-visual]" }, { timeout: 4000 })).toBeInTheDocument();
  });

  it("textos sem algarismos não são animados", () => {
    render(<AnimatedCounter value="[X]" />);
    expect(screen.getByText("[X]", { selector: "[data-count-visual]" })).toBeInTheDocument();
  });
});

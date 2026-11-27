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
    expect(html.match(/\+ de R\$ 16 milhões/g)).toHaveLength(2);
  });

  it("fora da tela prepara a contagem a partir de zero, mantendo o valor final acessível", () => {
    render(<AnimatedCounter value="3 + 3" />);
    expect(screen.getByText("3 + 3", { selector: ".sr-only" })).toBeInTheDocument();
    expect(screen.getByText("0 + 0", { selector: "[aria-hidden]" })).toBeInTheDocument();
  });

  it("com reduced-motion mostra o número final direto", () => {
    motionState.inView = true;
    motionState.reduced = true;
    render(<AnimatedCounter value="+ de 60" />);
    expect(screen.getByText("+ de 60", { selector: "[aria-hidden]" })).toBeInTheDocument();
  });

  it("ao entrar na tela conta até o texto exato do arquivo de dados", async () => {
    motionState.inView = true;
    render(<AnimatedCounter value="18" />);
    expect(await screen.findByText("18", { selector: "[aria-hidden]" }, { timeout: 4000 })).toBeInTheDocument();
  });

  it("textos sem algarismos não são animados", () => {
    render(<AnimatedCounter value="[X]" />);
    expect(screen.getByText("[X]", { selector: "[aria-hidden]" })).toBeInTheDocument();
  });
});

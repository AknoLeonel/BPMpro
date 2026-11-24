import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useScrolledPast } from "./use-scrolled-past";

function Probe({ threshold }: { threshold: number }) {
  return <p>{useScrolledPast(threshold) ? "past" : "top"}</p>;
}

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value });
}

describe("useScrolledPast", () => {
  afterEach(() => setScrollY(0));

  it("começa falso no topo da página", () => {
    setScrollY(0);
    render(<Probe threshold={24} />);
    expect(screen.getByText("top")).toBeInTheDocument();
  });

  it("lê a posição na montagem quando a página carrega já rolada (âncora, reload, voltar)", () => {
    setScrollY(900);
    render(<Probe threshold={24} />);
    expect(screen.getByText("past")).toBeInTheDocument();
  });
});

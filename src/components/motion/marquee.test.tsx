import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Marquee } from "./marquee";

describe("Marquee", () => {
  it("duplica a trilha para o loop e oculta a cópia de leitores de tela", () => {
    render(
      <Marquee label="Áreas" duration={20}>
        <span>Esporte</span>
      </Marquee>,
    );
    expect(screen.getByRole("region", { name: "Áreas" })).toBeInTheDocument();
    const items = screen.getAllByText("Esporte");
    expect(items).toHaveLength(2);
    expect(items[1]?.parentElement).toHaveAttribute("aria-hidden");
    expect(screen.getByTestId("marquee-track")).toHaveStyle({ "--marquee-duration": "20s" });
    expect(screen.getByTestId("marquee-track")).toHaveClass("motion-reduce:animate-none");
  });

  it("inverte a direção quando reverse", () => {
    render(
      <Marquee label="x" reverse>
        <span>a</span>
      </Marquee>,
    );
    expect(screen.getByTestId("marquee-track")).toHaveClass("[animation-direction:reverse]");
  });
});

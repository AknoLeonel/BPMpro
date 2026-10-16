import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AnimatedCounter } from "./animated-counter";

vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useInView: () => true,
  useReducedMotion: () => true,
}));

describe("AnimatedCounter", () => {
  it("expõe o valor final para leitores de tela e, com reduced-motion, pula direto ao final", () => {
    render(<AnimatedCounter value={210} prefix="R$ " suffix=" mi" />);
    expect(screen.getByText("R$ 210 mi", { selector: ".sr-only" })).toBeInTheDocument();
    expect(screen.getByText("R$ 210 mi", { selector: "[aria-hidden]" })).toBeInTheDocument();
  });
});

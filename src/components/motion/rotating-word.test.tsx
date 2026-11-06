import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "./motion-provider";
import { RotatingWord } from "./rotating-word";

const words = ["esporte", "cultura", "educação"] as const;

describe("RotatingWord", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("anuncia a lista completa uma vez e alterna a palavra visível no intervalo", () => {
    render(
      <MotionProvider>
        <RotatingWord words={words} interval={1000} colors={["text-a", "text-b"]} />
      </MotionProvider>,
    );
    expect(screen.getByText("esporte, cultura, educação")).toHaveClass("sr-only");
    expect(screen.getAllByTestId("rotating-word").at(-1)).toHaveTextContent("esporte");
    expect(screen.getAllByTestId("rotating-word").at(-1)).toHaveClass("text-a");

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getAllByTestId("rotating-word").at(-1)).toHaveTextContent("cultura");
    expect(screen.getAllByTestId("rotating-word").at(-1)).toHaveClass("text-b");
  });

  it("reserva espaço para todas as palavras (sem layout shift)", () => {
    const { container } = render(
      <MotionProvider>
        <RotatingWord words={words} />
      </MotionProvider>,
    );
    expect(container.querySelectorAll(".invisible")).toHaveLength(words.length);
  });
});

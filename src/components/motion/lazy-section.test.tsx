import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MockIntersectionObserver } from "../../../tests/setup";
import { LazySection } from "./lazy-section";
import { MotionProvider } from "./motion-provider";

describe("LazySection", () => {
  it("mostra o skeleton até entrar na viewport e então o conteúdo", async () => {
    render(
      <MotionProvider>
        <LazySection fallback={<p>carregando…</p>}>
          <p>conteúdo</p>
        </LazySection>
      </MotionProvider>,
    );
    expect(screen.getByText("carregando…")).toBeInTheDocument();
    expect(screen.queryByText("conteúdo")).not.toBeInTheDocument();
    expect(screen.getByText("carregando…").closest("[aria-busy]")).toHaveAttribute("aria-busy", "true");

    act(() => MockIntersectionObserver.instances.at(-1)?.trigger(true));

    expect(await screen.findByText("conteúdo")).toBeInTheDocument();
  });

  it("ignora interseções negativas", () => {
    render(
      <MotionProvider>
        <LazySection fallback={<p>skeleton</p>}>
          <p>real</p>
        </LazySection>
      </MotionProvider>,
    );
    act(() => MockIntersectionObserver.instances.at(-1)?.trigger(false));
    expect(screen.queryByText("real")).not.toBeInTheDocument();
  });
});

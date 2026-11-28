import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Accordion, focusTarget } from "./accordion";

const items = [
  { id: "a", header: "Primeiro", content: <p>Conteúdo A</p> },
  { id: "b", header: "Segundo", content: <p>Conteúdo B</p> },
  { id: "c", header: "Terceiro", content: <p>Conteúdo C</p> },
];

const renderAccordion = (props: Partial<Parameters<typeof Accordion>[0]> = {}) =>
  render(
    <MotionProvider>
      <Accordion items={items} {...props} />
    </MotionProvider>,
  );

describe("focusTarget", () => {
  it("circula com ↑/↓ e salta com Home/End", () => {
    expect(focusTarget("ArrowDown", 0, 3)).toBe(1);
    expect(focusTarget("ArrowDown", 2, 3)).toBe(0);
    expect(focusTarget("ArrowUp", 0, 3)).toBe(2);
    expect(focusTarget("ArrowUp", 2, 3)).toBe(1);
    expect(focusTarget("Home", 2, 3)).toBe(0);
    expect(focusTarget("End", 0, 3)).toBe(2);
    expect(focusTarget("Enter", 1, 3)).toBeNull();
  });
});

describe("Accordion", () => {
  it("liga botão e região por aria-controls/aria-labelledby", () => {
    renderAccordion({ defaultOpen: ["a"] });
    const button = screen.getByRole("button", { name: "Primeiro" });
    expect(button).toHaveAttribute("aria-expanded", "true");
    const region = screen.getByRole("region", { name: "Primeiro" });
    expect(button).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveTextContent("Conteúdo A");
    // Item fechado não aponta para uma região que não existe no DOM.
    expect(screen.getByRole("button", { name: "Segundo" })).not.toHaveAttribute("aria-controls");
    expect(button.closest("h3")).not.toBeNull();
  });

  it("um por vez por padrão; vários com `multiple`", () => {
    const { unmount } = renderAccordion({ defaultOpen: ["a"] });
    fireEvent.click(screen.getByRole("button", { name: "Segundo" }));
    expect(screen.getByRole("button", { name: "Primeiro" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Segundo" })).toHaveAttribute("aria-expanded", "true");
    unmount();

    renderAccordion({ defaultOpen: ["a"], multiple: true });
    fireEvent.click(screen.getByRole("button", { name: "Segundo" }));
    expect(screen.getByRole("button", { name: "Primeiro" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Segundo" })).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByRole("button", { name: "Segundo" }));
    expect(screen.getByRole("button", { name: "Segundo" })).toHaveAttribute("aria-expanded", "false");
  });

  it("move o foco com o teclado", () => {
    renderAccordion();
    const [first, second, third] = screen.getAllByRole("button");
    if (!first || !second || !third) throw new Error("botões ausentes");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(second).toHaveFocus();
    fireEvent.keyDown(second, { key: "End" });
    expect(third).toHaveFocus();
    fireEvent.keyDown(third, { key: "ArrowDown" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "ArrowUp" });
    expect(third).toHaveFocus();
    fireEvent.keyDown(third, { key: "Home" });
    expect(first).toHaveFocus();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { faq } from "@/lib/site-config";
import { FaqList } from "./faq";

describe("FaqList", () => {
  it("abre a primeira pergunta por padrão e alterna as demais", async () => {
    render(
      <MotionProvider>
        <FaqList />
      </MotionProvider>,
    );
    const [first, second] = faq;
    if (!first || !second) throw new Error("FAQ vazio");
    const firstButton = screen.getByRole("button", { name: first.question });
    const secondButton = screen.getByRole("button", { name: second.question });
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(first.answer)).toBeInTheDocument();

    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(await screen.findByText(second.answer)).toBeInTheDocument();

    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
  });
});

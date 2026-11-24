import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { faq, whatsappMessages } from "@/lib/site-config";
import { FaqList } from "./faq";
import { FaqSection } from "./social-proof";

function renderList() {
  return render(
    <MotionProvider>
      <FaqList />
    </MotionProvider>,
  );
}

describe("FaqList", () => {
  it("renderiza as 6 perguntas como botões dentro de h3", () => {
    renderList();
    expect(faq.items).toHaveLength(6);
    for (const item of faq.items) {
      const button = screen.getByRole("button", { name: item.question });
      expect(button.closest("h3")).not.toBeNull();
    }
  });

  it("mantém só um item aberto por vez e alterna ao clicar", async () => {
    renderList();
    const [first, second] = faq.items;
    if (!first || !second) throw new Error("FAQ vazio");
    const firstButton = screen.getByRole("button", { name: first.question });
    const secondButton = screen.getByRole("button", { name: second.question });

    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: first.question });
    expect(firstButton).toHaveAttribute("aria-controls", panel.id);
    expect(within(panel).getByText(first.answer)).toBeInTheDocument();

    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByRole("button", { expanded: true })).toHaveLength(1);
    expect(await screen.findByText(second.answer)).toBeInTheDocument();

    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryAllByRole("button", { expanded: true })).toHaveLength(0);
  });

  it("navega entre perguntas pelo teclado (↑/↓/Home/End)", () => {
    renderList();
    const buttons = faq.items.map((item) => screen.getByRole("button", { name: item.question }));
    const [first, second] = buttons;
    const last = buttons.at(-1);
    if (!first || !second || !last) throw new Error("FAQ vazio");

    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(second).toHaveFocus();
    fireEvent.keyDown(second, { key: "End" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "ArrowDown" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "ArrowUp" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "Home" });
    expect(first).toHaveFocus();
  });

  it("exibe a resposta sobre aprovação exatamente como no conteúdo oficial", () => {
    renderList();
    const item = faq.items.find((q) => q.question === "Vocês garantem a aprovação do projeto?");
    if (!item) throw new Error("Pergunta ausente");
    fireEvent.click(screen.getByRole("button", { name: item.question }));
    expect(screen.getByText(item.answer).textContent).toBe(item.answer);
  });
});

describe("FaqSection", () => {
  it("tem título acessível, skeleton e CTA do WhatsApp com a mensagem de dúvidas", () => {
    render(
      <MotionProvider>
        <FaqSection />
      </MotionProvider>,
    );
    const section = screen.getByRole("region", { name: faq.title });
    expect(section).toHaveAttribute("id", "duvidas");
    expect(screen.getByRole("heading", { level: 2, name: faq.title })).toHaveAttribute("id", "duvidas-title");
    expect(screen.getByTestId("faq-skeleton")).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: (name) => name.includes(faq.cta) });
    expect(cta.getAttribute("href")).toContain(`text=${encodeURIComponent(whatsappMessages.faq)}`);
    expect(cta).toHaveAttribute("data-whatsapp-context", "faq");
    expect(cta).toHaveAttribute("target", "_blank");
  });
});

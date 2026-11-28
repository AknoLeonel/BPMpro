import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { fichaLimpa } from "@/lib/products";
import { MockIntersectionObserver } from "../../../../tests/setup";
import { FinalCta } from "./final-cta";

vi.mock("@/features/contact/contact-form", () => ({
  ContactForm: ({ defaultProduct }: { defaultProduct?: string }) => (
    <div data-testid="contact-form" data-default-product={defaultProduct ?? "none"} />
  ),
}));

async function renderCta(level?: "prata" | "ouro") {
  render(
    <MotionProvider>
      <FinalCta {...(level ? { level } : {})} />
    </MotionProvider>,
  );
  await act(async () => {
    for (const observer of MockIntersectionObserver.instances) observer.trigger();
  });
  return screen.findByTestId("contact-form");
}

describe("FinalCta", () => {
  it("é a seção #solicitar rotulada pelo h2", async () => {
    await renderCta();
    expect(screen.getByRole("region", { name: fichaLimpa.finalCta.title })).toHaveAttribute("id", "solicitar");
    expect(screen.getByText(fichaLimpa.finalCta.subtitle)).toBeInTheDocument();
  });

  it("sem selo, o formulário não vem com produto e o WhatsApp é o do produto", async () => {
    const form = await renderCta();
    expect(form).toHaveAttribute("data-default-product", "none");
    const whatsapp = screen.getByRole("link", { name: /falar pelo whatsapp/i });
    expect(whatsapp).toHaveAttribute("data-whatsapp-context", "product-ficha-limpa");
    expect(whatsapp.getAttribute("href")).toContain(encodeURIComponent("conferência Ficha Limpa"));
  });

  it("no Selo Prata, pré-seleciona o produto e usa a mensagem do selo", async () => {
    const form = await renderCta("prata");
    expect(form).toHaveAttribute("data-default-product", "Selo Prata");
    const whatsapp = screen.getByRole("link", { name: /falar pelo whatsapp/i });
    expect(whatsapp).toHaveAttribute("data-whatsapp-context", "product-prata");
    expect(whatsapp.getAttribute("href")).toContain(encodeURIComponent("Quero o Selo Prata"));
  });

  it("no Selo Ouro, pré-seleciona Selo Ouro", async () => {
    const form = await renderCta("ouro");
    expect(form).toHaveAttribute("data-default-product", "Selo Ouro");
  });
});

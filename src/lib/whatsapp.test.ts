import { describe, expect, it } from "vitest";
import { siteConfig, whatsappMessages } from "./site-config";
import { whatsappUrl } from "./whatsapp";

describe("whatsappUrl", () => {
  it("usa o número do site e a mensagem padrão", () => {
    const url = new URL(whatsappUrl());
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe(`/${siteConfig.whatsapp}`);
    expect(url.searchParams.get("text")).toBe(whatsappMessages.default);
  });

  it("codifica acentos e pontuação da mensagem", () => {
    const url = whatsappUrl("Olá! Preciso de ajuda com uma prestação de contas.", "5561999990000");
    expect(url).toBe(
      "https://wa.me/5561999990000?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20uma%20presta%C3%A7%C3%A3o%20de%20contas.",
    );
  });

  it("remove formatação do telefone", () => {
    expect(whatsappUrl("Oi", "+55 (61) 99999-0000")).toBe("https://wa.me/5561999990000?text=Oi");
  });

  it("omite o texto quando a mensagem está vazia", () => {
    expect(whatsappUrl("   ", "5561999990000")).toBe("https://wa.me/5561999990000");
  });
});

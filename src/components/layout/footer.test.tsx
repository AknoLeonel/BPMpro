import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { footer as footerContent, siteConfig, whatsappMessages } from "@/lib/site-config";
import { Footer } from "./footer";

function renderFooter() {
  return render(
    <MotionProvider>
      <Footer />
    </MotionProvider>,
  );
}

describe("Footer", () => {
  it("lista os links do rodapé, incluindo a Política de Privacidade", () => {
    renderFooter();
    const nav = screen.getByRole("navigation", { name: "Rodapé" });
    for (const item of footerContent.links) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
    expect(within(nav).getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/privacidade");
  });

  it("mostra a assinatura, o logotipo, o domínio e o ano", () => {
    renderFooter();
    expect(screen.getByText(footerContent.signature)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /página inicial/ })).toHaveAttribute("href", "/");
    expect(screen.getByText(siteConfig.domain)).toBeInTheDocument();
    expect(screen.getByText(`© ${new Date().getFullYear()} ${siteConfig.fullName}`)).toBeInTheDocument();
  });

  it("mantém o CNPJ oculto enquanto não for liberado", () => {
    renderFooter();
    expect(screen.queryByTestId("footer-cnpj")).not.toBeInTheDocument();
    expect(screen.queryByText(/CNPJ/)).not.toBeInTheDocument();
  });

  it("oferece contato por e-mail, WhatsApp e redes sociais", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: siteConfig.email })).toHaveAttribute("href", `mailto:${siteConfig.email}`);
    const whatsapp = screen.getByRole("link", { name: /^WhatsApp/ });
    expect(whatsapp).toHaveAttribute("data-whatsapp-context", "footer");
    expect(whatsapp.getAttribute("href")).toContain(encodeURIComponent(whatsappMessages.default));
    expect(screen.getByRole("link", { name: "Instagram (abre em nova aba)" })).toHaveAttribute(
      "href",
      siteConfig.social.instagram,
    );
    expect(screen.getByRole("link", { name: "LinkedIn (abre em nova aba)" })).toHaveAttribute(
      "href",
      siteConfig.social.linkedin,
    );
  });
});

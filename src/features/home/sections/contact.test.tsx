import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { contact, siteConfig } from "@/lib/site-config";
import { MockIntersectionObserver } from "../../../../tests/setup";
import { Contact } from "./contact";

vi.mock("@/features/contact/actions", () => ({ sendContact: vi.fn() }));

const renderSection = () =>
  render(
    <MotionProvider>
      <Contact />
    </MotionProvider>,
  );

describe("Contact (seção 13)", () => {
  it("é uma região rotulada pelo h2 com a chamada final", () => {
    renderSection();
    const heading = screen.getByRole("heading", { level: 2, name: contact.title });
    expect(heading).toHaveAttribute("id", "contato-title");
    expect(screen.getByRole("region", { name: contact.title })).toHaveAttribute("id", "contato");
    expect(screen.getByText(contact.subtitle)).toBeInTheDocument();
  });

  it("lista WhatsApp, e-mail, endereço e link para o mapa", () => {
    renderSection();
    const whatsapp = screen.getByRole("link", { name: /falar pelo whatsapp/i });
    expect(whatsapp).toHaveAttribute("data-whatsapp-context", "contact");
    expect(screen.getByRole("link", { name: siteConfig.email })).toHaveAttribute("href", `mailto:${siteConfig.email}`);
    expect(screen.getByText(siteConfig.address)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver no mapa/i })).toHaveAttribute("href", siteConfig.mapsUrl);
  });

  it("só carrega o mapa quando entra na viewport", async () => {
    renderSection();
    expect(screen.queryByTitle("Mapa do escritório da BPM em Brasília")).not.toBeInTheDocument();
    await act(async () => {
      for (const observer of MockIntersectionObserver.instances) observer.trigger();
    });
    const map = await screen.findByTitle("Mapa do escritório da BPM em Brasília");
    expect(map).toHaveAttribute("loading", "lazy");
    expect(map).toHaveAttribute("src", siteConfig.mapEmbedUrl);
  });
});

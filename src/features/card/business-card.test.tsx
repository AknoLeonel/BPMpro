import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig, whatsappMessages } from "@/lib/site-config";
import { whatsappUrl } from "@/lib/whatsapp";
import { BusinessCard, VCARD_HREF } from "./business-card";

function renderCard() {
  return render(
    <MotionProvider>
      <BusinessCard />
    </MotionProvider>,
  );
}

describe("BusinessCard (integração)", () => {
  it("mostra o nome da marca como h1 e a frase do siteConfig", () => {
    renderCard();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(siteConfig.fullName);
    expect(screen.getByText(siteConfig.summary)).toBeInTheDocument();
  });

  it("lista as 8 ações com os destinos corretos", () => {
    renderCard();
    const list = screen.getByRole("list");
    const links = within(list).getAllByRole("link");
    expect(links).toHaveLength(8);

    const byName = (name: RegExp) => within(list).getByRole("link", { name });
    expect(byName(/^WhatsApp/)).toHaveAttribute("href", whatsappUrl(whatsappMessages.default));
    expect(byName(/^WhatsApp/)).toHaveAttribute("data-whatsapp-context", "card");
    expect(byName(/^Ligar$/)).toHaveAttribute("href", "tel:+556100000000");
    expect(byName(/^E-mail$/)).toHaveAttribute("href", `mailto:${siteConfig.email}`);
    expect(byName(/^Instagram/)).toHaveAttribute("href", siteConfig.social.instagram);
    expect(byName(/^LinkedIn/)).toHaveAttribute("href", siteConfig.social.linkedin);
    expect(byName(/^Site/)).toHaveAttribute("href", siteConfig.url);
    expect(byName(/^Como chegar/)).toHaveAttribute("href", siteConfig.mapsUrl);

    const save = byName(/^Salvar contato$/);
    expect(save).toHaveAttribute("href", VCARD_HREF);
    expect(save).toHaveAttribute("download", "bpm-pro.vcf");
    expect(save).not.toHaveAttribute("target");
  });

  it("links externos abrem em nova aba com rel seguro e aviso para leitores de tela", () => {
    renderCard();
    for (const name of [/^WhatsApp/, /^Instagram/, /^LinkedIn/, /^Site/, /^Como chegar/]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAccessibleName(expect.stringContaining("(abre em nova aba)"));
    }
    for (const name of [/^Ligar$/, /^E-mail$/]) {
      expect(screen.getByRole("link", { name })).not.toHaveAttribute("target");
    }
  });
});

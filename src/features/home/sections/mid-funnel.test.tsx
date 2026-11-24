import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { audiences, journey, services, whatsappMessages } from "@/lib/site-config";
import { Audiences } from "./audiences";
import { Journey } from "./journey";
import { Services } from "./services";

function renderWithMotion(ui: ReactNode) {
  return render(<MotionProvider>{ui}</MotionProvider>);
}

describe("Services", () => {
  it("rotula a seção e mostra os três grupos e os nove serviços", () => {
    renderWithMotion(<Services />);
    expect(screen.getByRole("region", { name: services.title })).toHaveAttribute("id", "servicos");

    for (const group of services.groups) {
      expect(screen.getByRole("heading", { name: group.label })).toBeInTheDocument();
    }
    expect(screen.getAllByTestId("service-group")).toHaveLength(3);

    const titles = services.groups.flatMap((group) => group.items.map((item) => item.title));
    expect(titles).toHaveLength(9);
    for (const title of titles) {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });
});

describe("Journey", () => {
  it("lista as sete etapas em ordem", () => {
    renderWithMotion(<Journey />);
    expect(screen.getByRole("region", { name: journey.title })).toHaveAttribute("id", "como-funciona");
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(7);
    items.forEach((item, index) => {
      expect(within(item).getByRole("heading")).toHaveTextContent(journey.steps[index]?.title ?? "missing");
    });
  });

  it("leva ao WhatsApp com a mensagem do diagnóstico", () => {
    renderWithMotion(<Journey />);
    const cta = screen.getByRole("link", { name: new RegExp(journey.cta) });
    const href = cta.getAttribute("href") ?? "";
    expect(href.startsWith("https://wa.me/")).toBe(true);
    expect(href).toContain(encodeURIComponent(whatsappMessages.journey));
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta.getAttribute("rel")).toContain("noopener");
    expect(cta).toHaveAttribute("data-whatsapp-context", "journey");
  });
});

describe("Audiences", () => {
  it("transforma cada card em um link do WhatsApp com a mensagem do momento", () => {
    renderWithMotion(<Audiences />);
    expect(screen.getByRole("region", { name: audiences.title })).toHaveAttribute("id", "para-quem");
    expect(screen.getAllByRole("link")).toHaveLength(4);
    audiences.items.forEach((item, index) => {
      const link = screen.getByRole("link", { name: `Falar no WhatsApp: ${item.title} (abre em nova aba)` });
      expect(link.getAttribute("href")).toContain(encodeURIComponent(item.message));
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("data-whatsapp-context", `audience-${index}`);
      expect(within(link).getByRole("heading", { name: item.title })).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { upcomingRoutes } from "@/lib/routes";
import { ComingSoon } from "./coming-soon";

describe("ComingSoon", () => {
  it.each(Object.values(upcomingRoutes))("mostra $title como único h1 com o selo Em breve", (page) => {
    render(
      <MotionProvider>
        <ComingSoon title={page.title} description={page.description} context="teste" />
      </MotionProvider>,
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(page.title);
    expect(screen.getByText("Em breve")).toBeInTheDocument();
    expect(screen.getByText(page.description)).toBeInTheDocument();
  });

  it("oferece a volta para o início e o WhatsApp", () => {
    render(
      <MotionProvider>
        <ComingSoon title="Gestão" description="Em breve, o painel." />
      </MotionProvider>,
    );
    expect(screen.getByRole("link", { name: /Voltar para o início/ })).toHaveAttribute("href", "/");
    const whatsapp = screen.getByRole("link", { name: /Falar pelo WhatsApp/ });
    expect(whatsapp).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\/\d+\?text=/));
    expect(whatsapp).toHaveAttribute("data-whatsapp-context", "coming-soon");
    expect(whatsapp).toHaveAttribute("target", "_blank");
  });
});

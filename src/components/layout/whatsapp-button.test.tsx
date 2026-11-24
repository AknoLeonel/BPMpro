import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { whatsappMessages } from "@/lib/site-config";
import { WhatsAppButton } from "./whatsapp-button";

let emit: ((y: number) => void) | undefined;
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useMotionValueEvent: (_value: unknown, _event: string, cb: (y: number) => void) => {
    emit = cb;
  },
}));

function renderButton() {
  return render(
    <MotionProvider>
      <WhatsAppButton />
    </MotionProvider>,
  );
}

describe("WhatsAppButton", () => {
  it("aparece só depois de rolar além do hero e abre o WhatsApp com a mensagem padrão", async () => {
    renderButton();
    expect(screen.queryByTestId("whatsapp-button")).not.toBeInTheDocument();
    act(() => emit?.(300));
    expect(screen.queryByTestId("whatsapp-button")).not.toBeInTheDocument();

    act(() => emit?.(900));
    const link = await screen.findByRole("link", { name: "Conversar no WhatsApp (abre em nova aba)" });
    expect(link).toHaveAttribute("data-testid", "whatsapp-button");
    expect(link).toHaveAttribute("data-whatsapp-context", "floating");
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(link.getAttribute("href")).toContain(encodeURIComponent(whatsappMessages.default));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("mostra a dica de hover apenas como reforço visual", async () => {
    renderButton();
    act(() => emit?.(900));
    await screen.findByTestId("whatsapp-button");
    expect(screen.getByText("Fale no WhatsApp")).toHaveAttribute("aria-hidden", "true");
  });
});

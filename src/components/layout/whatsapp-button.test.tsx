import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { WhatsAppButton } from "./whatsapp-button";

let emit: ((y: number) => void) | undefined;
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useMotionValueEvent: (_value: unknown, _event: string, cb: (y: number) => void) => {
    emit = cb;
  },
}));

describe("WhatsAppButton", () => {
  it("aparece só depois de rolar além do hero e aponta para o WhatsApp", async () => {
    render(
      <MotionProvider>
        <WhatsAppButton />
      </MotionProvider>,
    );
    expect(screen.queryByTestId("whatsapp-button")).not.toBeInTheDocument();
    act(() => emit?.(900));
    const link = await screen.findByRole("link", { name: "Conversar no WhatsApp" });
    expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\/\d+$/));
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

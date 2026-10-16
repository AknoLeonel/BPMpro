import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { testimonials } from "@/lib/site-config";
import { Testimonials } from "./testimonials";

const quote = (i: number) => new RegExp(testimonials[i]?.quote.slice(0, 20) ?? "");

describe("Testimonials", () => {
  it("navega para frente, para trás (circular) e por indicador", async () => {
    render(
      <MotionProvider>
        <Testimonials />
      </MotionProvider>,
    );
    expect(screen.getByText(quote(0))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Próximo depoimento" }));
    expect(await screen.findByText(quote(1))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Depoimento anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Depoimento anterior" }));
    expect(await screen.findByText(quote(testimonials.length - 1))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ir para depoimento 1" }));
    expect(screen.getByRole("button", { name: "Ir para depoimento 1" })).toHaveAttribute("aria-current", "true");
  });
});

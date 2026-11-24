import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import type { Testimonial } from "@/lib/site-config";
import { TestimonialsSection } from "./social-proof";
import { Testimonials } from "./testimonials";

const items: Testimonial[] = [
  { quote: "Primeiro depoimento de teste.", name: "Ana Souza", role: "Presidente", organization: "Liga Teste" },
  {
    quote: "Segundo depoimento de teste.",
    name: "Bruno Lima",
    role: "Diretor",
    organization: "Instituto Teste",
    photo: "/images/teste.jpg",
  },
];

function renderCarousel(list: readonly Testimonial[] = items) {
  return render(
    <MotionProvider>
      <Testimonials items={list} />
    </MotionProvider>,
  );
}

describe("TestimonialsSection", () => {
  it("não renderiza nada enquanto os depoimentos estão ocultos", () => {
    const { container } = render(
      <MotionProvider>
        <TestimonialsSection />
      </MotionProvider>,
    );
    expect(container).toBeEmptyDOMElement();
    expect(document.getElementById("depoimentos")).toBeNull();
  });
});

describe("Testimonials", () => {
  it("expõe o carrossel acessível com slides 'N de M'", () => {
    renderCarousel();
    const carousel = screen.getByRole("region", { name: "Depoimentos" });
    expect(carousel).toHaveAttribute("aria-roledescription", "carrossel");
    const slide = screen.getByRole("group", { name: "1 de 2" });
    expect(slide).toHaveAttribute("aria-roledescription", "slide");
    expect(screen.getByText("Ana Souza")).toBeInTheDocument();
    expect(screen.getByText(/Presidente · Liga Teste/)).toBeInTheDocument();
  });

  it("navega para frente e para trás de forma circular, sem autoplay", async () => {
    renderCarousel();
    expect(screen.getByText(items[0]?.quote ?? "")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Próximo depoimento" }));
    expect(await screen.findByText(items[1]?.quote ?? "")).toBeInTheDocument();
    expect(await screen.findByRole("group", { name: "2 de 2" })).toBeInTheDocument();
    expect(document.querySelector("img")).toHaveAttribute("width", "48");

    fireEvent.click(screen.getByRole("button", { name: "Depoimento anterior" }));
    expect(await screen.findByText(items[0]?.quote ?? "")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Depoimento anterior" }));
    expect(await screen.findByText(items[1]?.quote ?? "")).toBeInTheDocument();
  });

  it("aceita as setas do teclado", async () => {
    renderCarousel();
    fireEvent.keyDown(screen.getByRole("region", { name: "Depoimentos" }), { key: "ArrowRight" });
    expect(await screen.findByRole("group", { name: "2 de 2" })).toBeInTheDocument();
  });

  it("esconde os controles com um único depoimento e nada renderiza sem itens", () => {
    const { unmount } = renderCarousel(items.slice(0, 1));
    expect(screen.queryByRole("button", { name: "Próximo depoimento" })).toBeNull();
    unmount();
    const { container } = renderCarousel([]);
    expect(container).toBeEmptyDOMElement();
  });
});

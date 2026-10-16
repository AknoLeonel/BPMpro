import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { areas, cases, journey, solutions, stats } from "@/lib/site-config";
import { MockIntersectionObserver } from "../../../tests/setup";
import { HomePage } from "./home-page";

vi.mock("@/features/contact/actions", () => ({ sendContact: vi.fn() }));

describe("HomePage (integração)", () => {
  it("renderiza todas as seções institucionais com hierarquia acessível", () => {
    render(
      <MotionProvider>
        <HomePage />
      </MotionProvider>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/em movimento/);
    for (const id of [
      "solucoes-title",
      "como-funciona-title",
      "areas-title",
      "cases-title",
      "faq-title",
      "contato-title",
    ]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
    for (const item of [...solutions, ...journey, ...areas, ...cases]) {
      expect(screen.getAllByRole("heading", { name: item.title }).length).toBeGreaterThan(0);
    }
    const statsList = screen.getByRole("region", { name: "Números da BPM" });
    expect(within(statsList).getAllByRole("listitem")).toHaveLength(stats.length);
  });

  it("blocos interativos começam como skeleton e carregam ao entrar na viewport", async () => {
    render(
      <MotionProvider>
        <HomePage />
      </MotionProvider>,
    );
    expect(screen.getByTestId("testimonials-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("faq-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("contact-skeleton")).toBeInTheDocument();

    act(() => {
      for (const observer of MockIntersectionObserver.instances) observer.trigger(true);
    });

    expect(await screen.findByRole("button", { name: /solicitar diagnóstico/i })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Próximo depoimento" })).toBeInTheDocument();
  });
});

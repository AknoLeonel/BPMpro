import { act, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { areas, contact, differentials, hero, journey, pains, services } from "@/lib/site-config";
import { MockIntersectionObserver } from "../../../tests/setup";
import { HomePage } from "./home-page";

vi.mock("@/features/contact/actions", () => ({ sendContact: vi.fn() }));

function renderHome() {
  return render(
    <MotionProvider>
      <HomePage />
    </MotionProvider>,
  );
}

/**
 * Ordem do funil (documento "esqueleto e conteúdo" + seção "Onde já atuamos").
 * Projetos e depoimentos ficam ocultos até as autorizações.
 */
const funnel = [
  "dores",
  "quem-somos",
  "servicos",
  "como-funciona",
  "para-quem",
  "areas",
  "diferenciais",
  "onde-atuamos",
  "duvidas",
  "contato",
];

describe("HomePage (integração)", () => {
  // Os blocos interativos chegam por import dinâmico; sob cobertura o primeiro import leva segundos.
  // Pré-carregar os módulos deixa o teste determinístico sem mudar o comportamento em produção.
  beforeAll(async () => {
    await Promise.all([import("./sections/faq"), import("@/features/contact/contact-form")]);
  }, 30_000);

  it("segue a ordem do funil, com um h1 e cada seção rotulada pelo seu h2", () => {
    const { container } = renderHome();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(hero.title);

    const order = Array.from(container.querySelectorAll("section[id]"), (el) => el.id).filter((id) =>
      funnel.includes(id),
    );
    expect(order).toEqual(funnel);
    for (const id of funnel) {
      const title = document.getElementById(`${id}-title`);
      expect(title?.tagName).toBe("H2");
      expect(document.getElementById(id)).toHaveAttribute("aria-labelledby", `${id}-title`);
    }
  });

  it("mostra o conteúdo aprovado de cada etapa", () => {
    renderHome();
    const titles: string[] = [
      ...pains.items.map((item) => item.title),
      ...services.groups.flatMap((group) => group.items.map((item): string => item.title)),
      ...journey.steps.map((item) => item.title),
      ...areas.items.map((item) => item.title),
      ...differentials.items.map((item) => item.title),
    ];
    for (const title of titles) {
      expect(screen.getAllByRole("heading", { name: title }).length).toBeGreaterThan(0);
    }
    expect(screen.getByText(pains.closing)).toBeInTheDocument();
  });

  it("respeita as regras: números de autoridade visíveis, itens ocultos fora da página", () => {
    const { container } = renderHome();
    // Único valor em reais é o total captado (selo e bloco de números) — nunca valor de projeto.
    // Lê só o texto acessível: a cópia visual da contagem (aria-hidden) começa em "R$ 0".
    const accessible = container.cloneNode(true) as HTMLElement;
    for (const hidden of accessible.querySelectorAll("[aria-hidden='true']")) hidden.remove();
    const amounts = accessible.textContent?.match(/R\$ ?\d[\d.,]*/g) ?? [];
    expect(new Set(amounts)).toEqual(new Set(["R$ 16"]));
    expect(screen.getByTestId("differentials-stats")).toBeInTheDocument();
    expect(document.getElementById("depoimentos")).toBeNull();
    expect(document.getElementById("projetos")).toBeNull();
    expect(screen.queryByText("anos de experiência")).toBeNull();
  });

  it("leva ao WhatsApp em todos os pontos de contato da página", () => {
    const { container } = renderHome();
    const contexts = Array.from(container.querySelectorAll("[data-whatsapp-context]"), (el) =>
      el.getAttribute("data-whatsapp-context"),
    );
    expect(contexts).toEqual(
      expect.arrayContaining(["journey", "audience-0", "audience-1", "audience-2", "audience-3", "faq", "contact"]),
    );
    for (const link of container.querySelectorAll<HTMLAnchorElement>("a[data-whatsapp-context]")) {
      expect(link.href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("blocos interativos começam como skeleton e carregam ao entrar na viewport", async () => {
    renderHome();
    expect(screen.getByTestId("faq-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("contact-skeleton")).toBeInTheDocument();

    await act(async () => {
      for (const observer of MockIntersectionObserver.instances) observer.trigger(true);
    });

    const lazy = { timeout: 5_000 };
    expect(await screen.findByRole("button", { name: contact.submit }, lazy)).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /garantem a aprovação/i }, lazy)).toBeInTheDocument();
  });
});

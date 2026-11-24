import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { navItems, whatsappMessages } from "@/lib/site-config";
import { MockIntersectionObserver } from "../../../tests/setup";
import { Header, resolveNavHref } from "./header";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

// O prefetch do next/link também usa IntersectionObserver; aqui basta um <a> simples.
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

let emit: ((y: number) => void) | undefined;
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useMotionValueEvent: (_value: unknown, _event: string, cb: (y: number) => void) => {
    emit = cb;
  },
}));

function renderHeader(children?: ReactNode) {
  return render(
    <MotionProvider>
      <Header />
      {children}
    </MotionProvider>,
  );
}

beforeEach(() => {
  pathname = "/";
  MockIntersectionObserver.instances = [];
  document.body.style.overflow = "";
});

describe("Header", () => {
  it("renderiza os itens de navegação como âncoras na home", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    for (const item of navItems) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
  });

  it("aponta os itens para a home e já começa sólido fora da página inicial", () => {
    pathname = "/privacidade";
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getByRole("link", { name: "Serviços" })).toHaveAttribute("href", "/#servicos");
    expect(screen.getByRole("banner")).toHaveAttribute("data-state", "solid");
  });

  it("fica transparente no topo e sólido depois de rolar", () => {
    renderHeader();
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-state", "transparent");
    act(() => emit?.(100));
    expect(header).toHaveAttribute("data-state", "solid");
    act(() => emit?.(10));
    expect(header).toHaveAttribute("data-state", "transparent");
  });

  it("leva ao WhatsApp com a mensagem padrão", () => {
    renderHeader();
    const cta = screen.getByRole("link", { name: /Fale no WhatsApp/ });
    expect(cta).toHaveAttribute("data-whatsapp-context", "header");
    expect(cta.getAttribute("href")).toContain(encodeURIComponent(whatsappMessages.default));
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("abre e fecha o menu móvel; Esc devolve o foco ao botão", async () => {
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");

    fireEvent.click(toggle);
    const panel = screen.getByRole("navigation", { name: "Menu móvel" });
    expect(panel).toHaveAttribute("id", "mobile-menu");
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Fechar menu");
    expect(screen.getByRole("banner")).toHaveAttribute("data-state", "open");
    expect(document.body.style.overflow).toBe("hidden");
    for (const item of navItems) {
      expect(within(panel).getByRole("link", { name: item.label })).toBeInTheDocument();
    }
    expect(within(panel).getByRole("link", { name: /Fale no WhatsApp/ })).toHaveAttribute(
      "data-whatsapp-context",
      "header-mobile",
    );

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Menu móvel" })).not.toBeInTheDocument());
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("fecha o menu ao escolher um destino", async () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    const panel = screen.getByRole("navigation", { name: "Menu móvel" });
    fireEvent.click(within(panel).getByRole("link", { name: "Dúvidas" }));
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Menu móvel" })).not.toBeInTheDocument());
  });

  it("marca a seção visível no menu (scroll-spy)", () => {
    renderHeader(
      <>
        <section id="servicos" />
        <section id="como-funciona" />
      </>,
    );
    const observer = MockIntersectionObserver.instances.at(-1);
    expect(observer).toBeDefined();
    const target = document.getElementById("como-funciona") ?? undefined;
    act(() => observer?.callback([{ target, isIntersecting: true }]));
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getByRole("link", { name: "Como funciona" })).toHaveAttribute("aria-current", "true");
    expect(within(nav).getByRole("link", { name: "Serviços" })).not.toHaveAttribute("aria-current");
  });

  it("funciona sem IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    try {
      renderHeader(<section id="servicos" />);
      expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    } finally {
      vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    }
  });
});

describe("resolveNavHref", () => {
  it("mantém âncoras na home e prefixa com / nas demais rotas", () => {
    expect(resolveNavHref("#contato", true)).toBe("#contato");
    expect(resolveNavHref("#contato", false)).toBe("/#contato");
    expect(resolveNavHref("/privacidade", false)).toBe("/privacidade");
  });
});

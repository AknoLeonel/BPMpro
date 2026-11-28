import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { restrictedAreaLink, routes } from "@/lib/routes";
import { navItems, whatsappMessages } from "@/lib/site-config";
import { MockIntersectionObserver } from "../../../tests/setup";
import { Header, isNavActive, startsOnDark } from "./header";

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

function renderHeader() {
  return render(
    <MotionProvider>
      <Header />
    </MotionProvider>,
  );
}

beforeEach(() => {
  pathname = "/";
  MockIntersectionObserver.instances = [];
  document.body.style.overflow = "";
});

describe("Header", () => {
  it("renderiza o menu principal como links de página, na ordem do mapa do site", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(navItems.map((item) => item.label));
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/servicos",
      "/produtos",
      "/como-funciona",
      "/projetos",
      "/sobre",
      "/contato",
    ]);
    for (const link of links) expect(link).not.toHaveAttribute("aria-current");
  });

  it("marca o item da página atual, inclusive em subpáginas", () => {
    pathname = "/produtos/ficha-limpa";
    renderHeader();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getByRole("link", { name: "Produtos" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Serviços" })).not.toHaveAttribute("aria-current");
  });

  it("mostra o link discreto da Área restrita", () => {
    renderHeader();
    const link = screen.getByRole("link", { name: restrictedAreaLink.label });
    expect(link).toHaveAttribute("href", "/area-restrita");
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
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

  it("começa transparente nas páginas com faixa escura no topo", () => {
    pathname = "/produtos/ficha-limpa/ouro";
    renderHeader();
    expect(screen.getByRole("banner")).toHaveAttribute("data-state", "transparent");
  });

  it.each([routes.card, routes.privacy, "/nao-existe"])("já começa sólido em %s", (path) => {
    pathname = path;
    renderHeader();
    expect(screen.getByRole("banner")).toHaveAttribute("data-state", "solid");
  });

  it("leva ao WhatsApp com a mensagem padrão", () => {
    renderHeader();
    const cta = screen.getByRole("link", { name: /Fale no WhatsApp/ });
    expect(cta).toHaveAttribute("data-whatsapp-context", "header");
    expect(cta.getAttribute("href")).toContain(encodeURIComponent(whatsappMessages.default));
    expect(cta).toHaveAttribute("target", "_blank");
  });

  it("abre e fecha o menu móvel; Esc devolve o foco ao botão", async () => {
    pathname = "/sobre";
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
      expect(within(panel).getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
    expect(within(panel).getByRole("link", { name: "Sobre" })).toHaveAttribute("aria-current", "page");
    expect(within(panel).getByRole("link", { name: restrictedAreaLink.label })).toHaveAttribute(
      "href",
      restrictedAreaLink.href,
    );
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
    fireEvent.click(within(panel).getByRole("link", { name: "Produtos" }));
    await waitFor(() => expect(screen.queryByRole("navigation", { name: "Menu móvel" })).not.toBeInTheDocument());
  });
});

describe("isNavActive", () => {
  it("casa a rota exata ou as subpáginas, nunca prefixos parciais", () => {
    expect(isNavActive("/produtos", "/produtos")).toBe(true);
    expect(isNavActive("/produtos/ficha-limpa/prata", "/produtos")).toBe(true);
    expect(isNavActive("/produtos/", "/produtos")).toBe(true);
    expect(isNavActive("/produtos-x", "/produtos")).toBe(false);
    expect(isNavActive("/", "/produtos")).toBe(false);
    expect(isNavActive(null, "/produtos")).toBe(false);
    expect(isNavActive("/", "/")).toBe(true);
    expect(isNavActive("/sobre", "/")).toBe(false);
  });
});

describe("startsOnDark", () => {
  it("é verdadeiro nas rotas com faixa escura e falso no cartão, na política e em rotas desconhecidas", () => {
    expect(startsOnDark("/")).toBe(true);
    expect(startsOnDark(null)).toBe(true);
    expect(startsOnDark("/servicos")).toBe(true);
    expect(startsOnDark("/produtos/ficha-limpa/")).toBe(true);
    expect(startsOnDark("/cartao")).toBe(false);
    expect(startsOnDark("/politica-de-privacidade")).toBe(false);
    expect(startsOnDark("/nao-existe")).toBe(false);
  });
});

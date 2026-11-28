import { render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { PageHeader, PageHeaderSkeleton, PageSectionSkeleton } from "./page-header";

function renderHeader(ui: ReactElement) {
  return render(<MotionProvider>{ui}</MotionProvider>);
}

describe("PageHeader", () => {
  it("renderiza um único h1 com eyebrow, descrição e ações", () => {
    renderHeader(
      <PageHeader
        id="titulo"
        eyebrow="Serviços"
        title="Tudo o que o seu projeto precisa"
        description="Do início ao fim."
      >
        <a href="/contato">Falar com a gente</a>
      </PageHeader>,
    );
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Tudo o que o seu projeto precisa");
    expect(headings[0]).toHaveAttribute("id", "titulo");
    expect(screen.getByText("Serviços")).toBeInTheDocument();
    expect(screen.getByText("Do início ao fim.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Falar com a gente" })).toHaveAttribute("href", "/contato");
  });

  it("omite trilha, descrição e ações quando não informadas", () => {
    renderHeader(<PageHeader title="Contato" />);
    expect(screen.queryByRole("navigation", { name: "Trilha de navegação" })).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Contato");
  });

  it("mostra a trilha com links e a página atual marcada", () => {
    renderHeader(
      <PageHeader
        title="Selo Prata"
        breadcrumb={[
          { href: "/", label: "Início" },
          { href: "/produtos", label: "Produtos" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Trilha de navegação" });
    expect(within(nav).getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(within(nav).getByRole("link", { name: "Produtos" })).toHaveAttribute("href", "/produtos");
    expect(within(nav).getByText("Selo Prata")).toHaveAttribute("aria-current", "page");
  });
});

describe("PageHeaderSkeleton", () => {
  it("só desenha os botões quando pedido", () => {
    const { rerender } = render(<PageHeaderSkeleton />);
    const base = screen.getAllByTestId("skeleton").length;
    rerender(<PageHeaderSkeleton withActions />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(base + 2);
  });

  it("a seção genérica desenha a quantidade de cards pedida", () => {
    const { rerender } = render(<PageSectionSkeleton cards={2} />);
    const two = screen.getAllByTestId("skeleton").length;
    rerender(<PageSectionSkeleton cards={4} />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(two + 2);
  });
});

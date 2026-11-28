import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { fichaLimpa } from "@/lib/products";
import { ComparisonTable } from "./comparison-table";

const renderTable = (focus?: "prata" | "ouro") =>
  render(
    <MotionProvider>
      <ComparisonTable {...(focus ? { focus } : {})} />
    </MotionProvider>,
  );

describe("ComparisonTable", () => {
  it("renderiza a tabela (md+) com caption, cabeçalhos de coluna e de linha", () => {
    const { container } = renderTable();
    const table = screen.getByRole("table", { name: fichaLimpa.comparison.title });
    expect(table.closest("[data-layout='table']")).toHaveClass("hidden", "md:block");
    expect(within(table).getByRole("columnheader", { name: "Selo Prata" })).toHaveAttribute("scope", "col");
    expect(within(table).getByRole("columnheader", { name: "Selo Ouro" })).toBeInTheDocument();
    for (const row of fichaLimpa.comparison.rows) {
      expect(within(table).getByRole("rowheader", { name: row.label })).toHaveAttribute("scope", "row");
    }
    expect(within(table).getByRole("cell", { name: "Pronta para celebrar" })).toBeInTheDocument();
    expect(container.querySelectorAll("thead svg[data-seal]")).toHaveLength(2);
  });

  it("renderiza também os dois cards do celular, escondidos no md+", () => {
    const { container } = renderTable();
    const cards = container.querySelector("[data-layout='cards']");
    expect(cards).toHaveClass("md:hidden");
    const articles = cards?.querySelectorAll("article") ?? [];
    expect(articles).toHaveLength(2);
    expect(screen.getByRole("heading", { level: 3, name: "Selo Prata" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Selo Ouro" })).toBeInTheDocument();
    const [prata, ouro] = [...articles] as HTMLElement[];
    for (const row of fichaLimpa.comparison.rows) {
      expect(within(prata as HTMLElement).getAllByText(row.prata).length).toBeGreaterThan(0);
      expect(within(ouro as HTMLElement).getAllByText(row.ouro).length).toBeGreaterThan(0);
    }
    expect(within(prata as HTMLElement).queryByText("Pronta para celebrar")).toBeNull();
  });

  it("destaca o selo em foco nas duas representações", () => {
    const { container } = renderTable("ouro");
    const focused = container.querySelectorAll("[data-focus]");
    expect(focused).toHaveLength(2);
    expect(within(focused[0] as HTMLElement).getByText("Selo Ouro")).toBeInTheDocument();
    expect(within(focused[1] as HTMLElement).getByText("Selo Ouro")).toBeInTheDocument();
  });

  it("sem foco, nenhuma coluna destacada", () => {
    const { container } = renderTable();
    expect(container.querySelectorAll("[data-focus]")).toHaveLength(0);
  });
});

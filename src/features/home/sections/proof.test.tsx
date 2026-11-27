import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { projectItems, returningClients, sportsSpecialistText, stats, statsNote } from "@/lib/numbers";
import { areas, differentials, projects } from "@/lib/site-config";
import { Areas } from "./areas";
import { Differentials } from "./differentials";
import { Projects } from "./projects";

const renderWithMotion = (ui: ReactNode) => render(<MotionProvider>{ui}</MotionProvider>);

describe("Areas", () => {
  it("renderiza as quatro áreas, as esferas e cada modalidade uma única vez na lista acessível", () => {
    renderWithMotion(<Areas />);
    const section = screen.getByRole("region", { name: areas.title });
    expect(section).toHaveAttribute("id", "areas");

    for (const area of areas.items) {
      expect(within(section).getByRole("heading", { level: 3, name: area.title })).toBeInTheDocument();
    }
    expect(screen.getByText(areas.spheres)).toBeInTheDocument();

    const list = screen.getByRole("list", { name: "Modalidades" });
    const items = within(list).getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual([...areas.modalities]);
    for (const modality of areas.modalities) {
      expect(screen.getAllByText(modality).filter((el) => el.closest("[aria-hidden]") === null)).toHaveLength(1);
    }

    // A faixa em movimento é decorativa e fica fora da árvore de acessibilidade.
    expect(screen.getByTestId("areas-marquee")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getAllByTestId("marquee-track")).toHaveLength(1);
  });
});

describe("Differentials", () => {
  it("renderiza os quatro diferenciais com o novo texto de Especialistas em esporte", () => {
    renderWithMotion(<Differentials />);
    expect(screen.getByRole("heading", { level: 2, name: differentials.title })).toHaveAttribute(
      "id",
      "diferenciais-title",
    );
    for (const item of differentials.items) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
    expect(screen.getByText(sportsSpecialistText)).toBeInTheDocument();
  });

  it("mostra só os números visíveis, com o texto exato do arquivo de dados e a nota", () => {
    renderWithMotion(<Differentials />);
    const block = screen.getByTestId("differentials-stats");
    const visible = stats.filter((stat) => stat.visible);
    expect(within(block).getAllByRole("term")).toHaveLength(visible.length);
    for (const stat of visible) {
      expect(within(block).getByText(stat.label)).toBeInTheDocument();
      // Valor final no HTML (sr-only), independente da animação.
      expect(within(block).getByText(stat.value, { selector: ".sr-only" })).toBeInTheDocument();
    }
    for (const stat of stats.filter((item) => !item.visible)) {
      expect(within(block).queryByText(stat.label)).not.toBeInTheDocument();
    }
    expect(block).toHaveClass("grid-cols-2", `lg:grid-cols-${visible.length}`);
    expect(screen.getByText(statsNote.text)).toBeInTheDocument();
  });

  it("um item oculto aparece só de mudar visible para true", () => {
    const allVisible = stats.map((stat) => ({ ...stat, visible: true }));
    renderWithMotion(<Differentials stats={allVisible} />);
    const block = screen.getByTestId("differentials-stats");
    expect(within(block).getAllByRole("term")).toHaveLength(stats.length);
    expect(block).toHaveClass("lg:grid-cols-5");
  });

  it("sem números visíveis, o bloco some", () => {
    renderWithMotion(<Differentials stats={stats.map((stat) => ({ ...stat, visible: false }))} />);
    expect(screen.queryByTestId("differentials-stats")).not.toBeInTheDocument();
  });

  it("destaca o card Clientes que voltam e permite ocultá-lo", () => {
    const { unmount } = renderWithMotion(<Differentials />);
    const card = screen.getByRole("complementary", { name: returningClients.title });
    expect(card).toHaveTextContent(returningClients.text);
    unmount();
    renderWithMotion(<Differentials returningClients={{ ...returningClients, visible: false }} />);
    expect(screen.queryByRole("complementary", { name: returningClients.title })).not.toBeInTheDocument();
  });
});

describe("Projects", () => {
  it("não aparece enquanto todos os projetos estão ocultos (padrão atual)", () => {
    expect(projectItems.length).toBeGreaterThan(0);
    const { container } = renderWithMotion(<Projects />);
    expect(container).toBeEmptyDOMElement();
  });

  it("mostra só os projetos visíveis, com nome, modalidade e cidade, sem valores", () => {
    const items = projectItems.map((project, index) => ({ ...project, visible: index < 2 }));
    const { container } = renderWithMotion(<Projects items={items} />);
    expect(screen.getByRole("heading", { level: 2, name: projects.title })).toHaveAttribute("id", "projetos-title");
    const gallery = screen.getByRole("region", { name: "Galeria de projetos" });
    expect(within(gallery).getAllByRole("listitem")).toHaveLength(2);
    for (const item of items.slice(0, 2)) {
      expect(screen.getByRole("heading", { level: 3, name: item.name })).toBeInTheDocument();
      expect(screen.getByText(item.modality)).toBeInTheDocument();
    }
    expect(screen.queryByRole("heading", { level: 3, name: items[2]?.name })).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/R$/);
  });
});

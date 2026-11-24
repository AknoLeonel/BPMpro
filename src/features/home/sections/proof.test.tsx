import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
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
  it("renderiza os quatro diferenciais e oculta os números por padrão", () => {
    renderWithMotion(<Differentials />);
    expect(screen.getByRole("heading", { level: 2, name: differentials.title })).toHaveAttribute(
      "id",
      "diferenciais-title",
    );
    for (const item of differentials.items) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("differentials-stats")).not.toBeInTheDocument();
  });

  it("mostra os números quando liberados", () => {
    renderWithMotion(<Differentials showStats />);
    const stats = screen.getByTestId("differentials-stats");
    for (const stat of differentials.stats) {
      expect(within(stats).getByText(stat.label)).toBeInTheDocument();
    }
  });
});

describe("Projects", () => {
  it("mostra o estado vazio honesto quando não há projetos autorizados", () => {
    renderWithMotion(<Projects />);
    expect(screen.getByRole("heading", { level: 2, name: projects.title })).toHaveAttribute("id", "projetos-title");
    expect(screen.getByTestId("projects-empty")).toBeInTheDocument();
    expect(screen.getByText(projects.note)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /Quer ver o seu projeto aqui/ });
    expect(cta).toHaveAttribute("data-whatsapp-context", "projects");
    expect(cta.getAttribute("href")).toMatch(/^https:\/\/wa\.me\//);
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });

  it("renderiza os cards com nome, modalidade e cidade, sem valores", () => {
    const items = [
      { name: "Copa de Futsal da Comunidade", modality: "Futsal", city: "Ceilândia/DF", image: "/images/futsal.jpg" },
      { name: "Festival de Capoeira", modality: "Capoeira", city: "Salvador/BA", image: "" },
    ];
    const { container } = renderWithMotion(<Projects items={items} />);
    expect(screen.queryByTestId("projects-empty")).not.toBeInTheDocument();
    const gallery = screen.getByRole("region", { name: "Galeria de projetos" });
    expect(within(gallery).getAllByRole("listitem")).toHaveLength(2);
    for (const item of items) {
      expect(screen.getByRole("heading", { level: 3, name: item.name })).toBeInTheDocument();
      expect(screen.getByText(item.modality)).toBeInTheDocument();
      expect(screen.getByText(item.city)).toBeInTheDocument();
    }
    expect(container.textContent).not.toMatch(/R\$/);
  });
});

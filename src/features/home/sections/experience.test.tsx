import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { experience } from "@/lib/numbers";
import { Experience } from "./experience";

function renderSection(data = experience) {
  return render(
    <MotionProvider>
      <Experience data={data} />
    </MotionProvider>,
  );
}

describe("Experience (Onde já colocamos projetos em movimento)", () => {
  it("é uma seção com âncora, rotulada pelo seu h2", () => {
    renderSection();
    const heading = screen.getByRole("heading", { level: 2, name: experience.title });
    expect(heading).toHaveAttribute("id", "onde-atuamos-title");
    expect(screen.getByRole("region", { name: experience.title })).toHaveAttribute("id", "onde-atuamos");
  });

  it("lista os órgãos em texto, com ícone decorativo e sem imagens/logos", () => {
    const { container } = renderSection();
    const list = screen.getByRole("list", { name: experience.organsTitle });
    const visible = experience.organs.filter((organ) => organ.visible);
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(visible.map((o) => o.name));
    expect(container.querySelectorAll("img")).toHaveLength(0);
    for (const icon of list.querySelectorAll("svg")) expect(icon.closest("[aria-hidden]")).not.toBeNull();
  });

  it("mostra só as fontes de recurso visíveis em chips", () => {
    renderSection();
    const chips = within(screen.getByRole("list", { name: experience.sourcesTitle })).getAllByRole("listitem");
    expect(chips.map((chip) => chip.textContent)).toEqual(
      experience.sources.filter((source) => source.visible).map((source) => source.name),
    );
    expect(screen.queryByText("Lei de Incentivo ao Esporte")).not.toBeInTheDocument();
  });

  it("um item oculto aparece ao mudar visible; sem nada visível a seção some", () => {
    const sources = experience.sources.map((source) => ({ ...source, visible: true }));
    const { unmount } = renderSection({ ...experience, sources });
    expect(screen.getByText("Fundo de Apoio à Cultura (FAC-DF)")).toBeInTheDocument();
    unmount();
    const { container } = renderSection({
      ...experience,
      organs: experience.organs.map((organ) => ({ ...organ, visible: false })),
      sources: experience.sources.map((source) => ({ ...source, visible: false })),
    });
    expect(container).toBeEmptyDOMElement();
  });
});

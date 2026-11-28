import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { type Project, projectItems } from "@/lib/numbers";
import { projects } from "@/lib/site-config";
import { ProjectsPage } from "./projects-page";

const hidden: Project = { name: "Projeto oculto", modality: "Futsal", city: "Brasília/DF", visible: false };
const shown: Project = { ...hidden, name: "Projeto autorizado", visible: true };

function renderPage(items?: readonly Project[]) {
  return render(
    <MotionProvider>
      <ProjectsPage items={items}>
        <div data-testid="galeria">galeria</div>
      </ProjectsPage>
    </MotionProvider>,
  );
}

describe("ProjectsPage", () => {
  it("sem projetos visíveis mostra o estado vazio honesto, sem projetos fictícios", () => {
    renderPage([hidden]);
    expect(screen.queryByTestId("galeria")).toBeNull();
    expect(screen.getByRole("heading", { level: 2, name: projects.title })).toBeInTheDocument();
    expect(screen.getByText(projects.subtitle)).toBeInTheDocument();
    expect(screen.getByText(/depois que a entidade autoriza a divulgação/)).toBeInTheDocument();
    expect(screen.queryByText("Projeto oculto")).toBeNull();
    expect(screen.getByRole("link", { name: /Falar pelo WhatsApp/ })).toHaveAttribute(
      "data-whatsapp-context",
      "projects-empty",
    );
  });

  it("com algum projeto visível delega para a galeria", () => {
    renderPage([hidden, shown]);
    expect(screen.getByTestId("galeria")).toBeInTheDocument();
    expect(screen.queryByText(/depois que a entidade autoriza/)).toBeNull();
  });

  it("usa os projetos de numbers.ts por padrão", () => {
    renderPage();
    const anyVisible = projectItems.some((project) => project.visible);
    expect(screen.queryByTestId("galeria") !== null).toBe(anyVisible);
  });
});

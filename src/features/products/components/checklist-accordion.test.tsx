import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import {
  checklistGroups,
  checklistRules,
  groupsForLevel,
  tcuCertificates,
  tcuNotes,
} from "@/lib/ficha-limpa-checklist";
import { ChecklistAccordion } from "./checklist-accordion";

const renderChecklist = (level?: "prata" | "ouro") =>
  render(
    <MotionProvider>
      <ChecklistAccordion {...(level ? { level } : {})} />
    </MotionProvider>,
  );

const groupButton = (title: string) => screen.getByRole("button", { name: new RegExp(title) });

describe("ChecklistAccordion", () => {
  it("abre com as 4 regras antes do acordeão", () => {
    renderChecklist();
    const rules = screen.getByRole("list", { name: "Antes de começar: 4 regras" });
    expect(within(rules).getAllByRole("listitem")).toHaveLength(checklistRules.length);
  });

  it("sem nível, lista todos os grupos com eyebrow, título e contagem; só o primeiro aberto", () => {
    renderChecklist();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(checklistGroups.length);
    for (const group of checklistGroups) {
      const button = groupButton(group.title);
      expect(button).toHaveTextContent(group.eyebrow);
      expect(button).toHaveTextContent(`${group.items.length} itens`);
    }
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("rotula o grupo exclusivo do Selo Ouro", () => {
    renderChecklist();
    expect(groupButton("O recurso certo para a entidade certa")).toHaveTextContent("Selo Ouro");
    expect(groupButton("As 3 obrigatórias")).not.toHaveTextContent("Selo Ouro");
  });

  it("Prata não mostra o Pilar 3 (fonte do recurso)", () => {
    renderChecklist("prata");
    expect(screen.getAllByRole("button")).toHaveLength(groupsForLevel("prata").length);
    expect(screen.queryByRole("button", { name: /Pilar 3/ })).toBeNull();
    expect(screen.getByRole("button", { name: /Pilar 2/ })).toBeInTheDocument();
  });

  it("Ouro mostra o Pilar 3", () => {
    renderChecklist("ouro");
    expect(screen.getByRole("button", { name: /Pilar 3/ })).toBeInTheDocument();
  });

  it("cada item mostra nome, descrição, Onde:, tag de esfera e tags de documento", () => {
    renderChecklist();
    const region = screen.getByRole("region", { name: /As 3 obrigatórias/ });
    const item = region.querySelector("[data-item='debitos-federais']") as HTMLElement;
    expect(within(item).getByRole("heading", { level: 4 })).toHaveTextContent("Débitos Federais");
    expect(item).toHaveTextContent("Onde: Receita Federal / PGFN");
    const sphere = item.querySelector("[data-tag='sphere']");
    expect(sphere).toHaveTextContent("Esfera: Federal");
    const docs = item.querySelectorAll("[data-tag='document']");
    expect([...docs].map((d) => d.textContent)).toEqual(["Documento: CNPJ"]);
    expect(sphere?.className).not.toEqual(docs[0]?.className);
  });

  it("abre grupos pelo clique e navega com o teclado", () => {
    renderChecklist();
    const second = groupButton("Governo do DF");
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    const region = screen.getByRole("region", { name: /Governo do DF/ });
    expect(region.querySelector("[data-item='divida-ativa-df'] [data-tag='sphere']")).toHaveTextContent("GDF");
    // Múltiplos abertos: o primeiro continua aberto.
    expect(groupButton("As 3 obrigatórias")).toHaveAttribute("aria-expanded", "true");

    second.focus();
    fireEvent.keyDown(second, { key: "End" });
    expect(screen.getAllByRole("button").at(-1)).toHaveFocus();
  });

  it("tabela das 6 certidões do TCU com Sim/Não acessíveis e notas", () => {
    renderChecklist();
    const table = screen.getByRole("table", { name: "As 6 certidões do TCU" });
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(tcuCertificates.length + 1);
    const inabilitados = within(table).getByRole("row", { name: /Inabilitados/ });
    const [cnpj, cpf] = within(inabilitados).getAllByRole("cell");
    expect(cnpj).toHaveTextContent("Não");
    expect(cpf).toHaveTextContent("Sim");
    expect(screen.getByText(tcuNotes.tip)).toBeInTheDocument();
    expect(screen.getByText(tcuNotes.why)).toBeInTheDocument();
  });
});

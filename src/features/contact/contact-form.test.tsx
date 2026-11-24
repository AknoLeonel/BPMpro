import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { contact } from "@/lib/site-config";
import { ContactForm } from "./contact-form";
import type { ContactState } from "./schema";
import { deliveryErrorMessage } from "./submit-contact";

const sendContact = vi.fn<(prev: ContactState, data: FormData) => Promise<ContactState>>();
vi.mock("./actions", () => ({ sendContact: (prev: ContactState, data: FormData) => sendContact(prev, data) }));

const renderForm = () =>
  render(
    <MotionProvider>
      <ContactForm />
    </MotionProvider>,
  );

const submit = () => fireEvent.click(screen.getByRole("button", { name: contact.submit }));

describe("ContactForm (integração)", () => {
  beforeEach(() => sendContact.mockReset());

  it("exibe todos os campos do documento com label visível, na ordem", () => {
    renderForm();
    const labels = [
      "Nome",
      "Entidade",
      "Cargo",
      "Cidade e UF",
      "WhatsApp",
      "E-mail",
      "Área",
      "Em que etapa você está?",
      "Mensagem",
    ];
    const controls = labels.map((label) => screen.getByLabelText(label));
    for (let i = 1; i < controls.length; i++) {
      const prev = controls[i - 1] as HTMLElement;
      expect(prev.compareDocumentPosition(controls[i] as HTMLElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    expect(
      within(screen.getByLabelText("Área"))
        .getAllByRole("option")
        .map((o) => o.textContent),
    ).toEqual(["Selecione…", "Esporte", "Cultura", "Turismo", "Social"]);
    expect(screen.getByLabelText("Em que etapa você está?")).toHaveDisplayValue("Selecione…");
    expect(screen.getByRole("checkbox", { name: /autorizo o contato/i })).not.toBeChecked();
    expect(screen.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/privacidade");
  });

  it("exibe erros de campo com aria-invalid, preserva valores e foca o primeiro inválido", async () => {
    sendContact.mockResolvedValue({
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors: {
        city: "Informe a cidade e a UF, ex.: Brasília/DF.",
        consent: "Você precisa autorizar o contato para continuar.",
      },
      values: { name: "Ana Lima", city: "Brasília", area: "Turismo" },
    });
    renderForm();
    submit();

    expect(await screen.findByText("Informe a cidade e a UF, ex.: Brasília/DF.")).toBeInTheDocument();
    const city = screen.getByLabelText("Cidade e UF");
    expect(city).toHaveAttribute("aria-invalid", "true");
    expect(city).toHaveAttribute("aria-describedby", "contact-city-error");
    expect(city).toHaveFocus();
    expect(screen.getByText("Você precisa autorizar o contato para continuar.")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /autorizo o contato/i })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Nome")).toHaveValue("Ana Lima");
    expect(screen.getByLabelText("Nome")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByLabelText("Área")).toHaveValue("Turismo");
    expect(sendContact.mock.calls[0]?.[1]).toBeInstanceOf(FormData);
  });

  it("mostra a mensagem de sucesso em role=status", async () => {
    sendContact.mockResolvedValue({ status: "success", message: contact.success });
    renderForm();
    submit();

    expect(await screen.findByRole("status")).toHaveTextContent(contact.success);
  });

  it("mostra erro geral com opção de WhatsApp quando a entrega falha", async () => {
    sendContact.mockResolvedValue({ status: "error", message: deliveryErrorMessage });
    renderForm();
    submit();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(deliveryErrorMessage);
    expect(within(alert).getByRole("link", { name: /falar pelo whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/"),
    );
  });
});

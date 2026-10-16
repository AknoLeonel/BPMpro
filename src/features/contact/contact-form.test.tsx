import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ContactForm } from "./contact-form";
import type { ContactState } from "./schema";

const sendContact = vi.fn<(prev: ContactState, data: FormData) => Promise<ContactState>>();
vi.mock("./actions", () => ({ sendContact: (prev: ContactState, data: FormData) => sendContact(prev, data) }));

const renderForm = () =>
  render(
    <MotionProvider>
      <ContactForm />
    </MotionProvider>,
  );

describe("ContactForm (integração)", () => {
  beforeEach(() => sendContact.mockReset());

  it("exibe erros de campo vindos da action, com aria-invalid", async () => {
    sendContact.mockResolvedValue({
      status: "error",
      message: "Revise os campos destacados.",
      fieldErrors: { email: "Informe um e-mail válido." },
      values: { name: "Ana", email: "x" },
    });
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /solicitar diagnóstico/i }));

    expect(await screen.findByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Nome")).toHaveValue("Ana");
    expect(sendContact.mock.calls[0]?.[1]).toBeInstanceOf(FormData);
  });

  it("mostra estado de sucesso após envio", async () => {
    sendContact.mockResolvedValue({ status: "success", message: "Recebemos sua mensagem!" });
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /solicitar diagnóstico/i }));

    expect(await screen.findByRole("status")).toHaveTextContent("Mensagem enviada");
  });

  it("mostra erro geral quando a entrega falha", async () => {
    sendContact.mockResolvedValue({ status: "error", message: "Não foi possível enviar agora." });
    renderForm();
    fireEvent.click(screen.getByRole("button", { name: /solicitar diagnóstico/i }));

    expect(await screen.findByText("Não foi possível enviar agora.")).toBeInTheDocument();
  });
});

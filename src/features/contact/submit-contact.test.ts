import { beforeEach, describe, expect, it, vi } from "vitest";
import { logger } from "@/lib/observability/logger";
import { contact } from "@/lib/site-config";
import { deliveryErrorMessage, submitContact } from "./submit-contact";

vi.mock("@/lib/observability/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const valid = {
  name: "João Souza",
  organization: "Instituto Movimento",
  role: "Diretor",
  city: "Goiânia/GO",
  whatsapp: "+55 (62) 98888-7777",
  email: "joao@instituto.org",
  area: "Cultura",
  stage: "Tenho um recurso indicado",
  product: "Selo Ouro",
  message: "Gostaria de um diagnóstico.",
  consent: "on",
  website: "",
};

const personalValues = [valid.name, valid.organization, valid.role, valid.city, valid.email, "62988887777"];

function loggedText(): string {
  return JSON.stringify([
    vi.mocked(logger.info).mock.calls,
    vi.mocked(logger.warn).mock.calls,
    vi.mocked(logger.error).mock.calls,
  ]);
}

describe("submitContact (integração schema + entrega + logger)", () => {
  const deliver = vi.fn<(lead: unknown) => Promise<void>>();
  beforeEach(() => {
    deliver.mockReset();
    vi.mocked(logger.info).mockClear();
    vi.mocked(logger.warn).mockClear();
    vi.mocked(logger.error).mockClear();
  });

  it("entrega leads válidos e confirma com a mensagem do site", async () => {
    deliver.mockResolvedValue();
    const state = await submitContact(valid, deliver);
    expect(deliver).toHaveBeenCalledWith(
      expect.objectContaining({ email: "joao@instituto.org", whatsapp: "62988887777", consent: true }),
    );
    expect(state).toEqual({ status: "success", message: contact.success });
  });

  it("registra apenas área, etapa e produto no log (LGPD)", async () => {
    deliver.mockResolvedValue();
    await submitContact(valid, deliver);
    expect(logger.info).toHaveBeenCalledTimes(1);
    const [event, payload] = vi.mocked(logger.info).mock.calls[0] ?? [];
    expect(event).toBe("contact.received");
    expect(Object.keys(payload ?? {}).sort()).toEqual(["area", "product", "stage"]);
    expect(payload).toEqual({ area: "Cultura", stage: "Tenho um recurso indicado", product: "Selo Ouro" });
    for (const value of personalValues) expect(loggedText()).not.toContain(value);
  });

  it("sem produto escolhido, registra product nulo (sem dados pessoais)", async () => {
    deliver.mockResolvedValue();
    await submitContact({ ...valid, product: "" }, deliver);
    expect(logger.info).toHaveBeenCalledWith("contact.received", {
      area: "Cultura",
      stage: "Tenho um recurso indicado",
      product: null,
    });
    for (const value of personalValues) expect(loggedText()).not.toContain(value);
  });

  it("devolve erros de campo e preserva o que foi digitado", async () => {
    const state = await submitContact({ ...valid, email: "x" }, deliver);
    expect(deliver).not.toHaveBeenCalled();
    expect(state).toMatchObject({
      status: "error",
      fieldErrors: { email: "Informe um e-mail válido." },
      values: { name: "João Souza", email: "x", city: "Goiânia/GO", consent: "on" },
    });
  });

  it("honeypot preenchido não entrega mas responde sucesso (bot não percebe)", async () => {
    const state = await submitContact({ ...valid, website: "https://spam.example" }, deliver);
    expect(state).toEqual({ status: "success", message: contact.success });
    expect(deliver).not.toHaveBeenCalled();
    expect(logger.info).not.toHaveBeenCalled();
  });

  it("falha na entrega vira erro amigável e é registrada sem dados pessoais", async () => {
    deliver.mockRejectedValue(new Error("CRM offline"));
    const state = await submitContact(valid, deliver);
    // O React 19 reinicia o formulário após a action: os valores voltam para o usuário não redigitar.
    expect(state).toEqual({ status: "error", message: deliveryErrorMessage, values: valid });
    expect(logger.error).toHaveBeenCalledWith("contact.delivery_failed", { error: "CRM offline" });
    for (const value of personalValues) expect(loggedText()).not.toContain(value);
  });

  it("falha não-Error também é tratada", async () => {
    deliver.mockRejectedValue("timeout");
    expect((await submitContact(valid, deliver)).status).toBe("error");
    expect(logger.error).toHaveBeenCalledWith("contact.delivery_failed", { error: "timeout" });
  });
});

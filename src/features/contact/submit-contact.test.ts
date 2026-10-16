import { beforeEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./submit-contact";

vi.mock("@/lib/observability/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const valid = {
  name: "João Souza",
  email: "joao@instituto.org",
  phone: "",
  organizationType: "Instituto / Fundação",
  message: "Gostaria de um diagnóstico para a Lei Rouanet.",
  website: "",
};

describe("submitContact (integração schema + entrega + logger)", () => {
  const deliver = vi.fn<(lead: unknown) => Promise<void>>();
  beforeEach(() => {
    deliver.mockReset();
  });

  it("entrega leads válidos e confirma ao usuário", async () => {
    deliver.mockResolvedValue();
    const state = await submitContact(valid, deliver);
    expect(deliver).toHaveBeenCalledWith(expect.objectContaining({ email: "joao@instituto.org" }));
    expect(state).toEqual({ status: "success", message: expect.stringContaining("1 dia útil") });
  });

  it("devolve erros de campo e preserva o que foi digitado", async () => {
    const state = await submitContact({ ...valid, email: "x" }, deliver);
    expect(deliver).not.toHaveBeenCalled();
    expect(state).toMatchObject({
      status: "error",
      fieldErrors: { email: "Informe um e-mail válido." },
      values: { name: "João Souza", email: "x" },
    });
  });

  it("honeypot preenchido não entrega mas responde sucesso (bot não percebe)", async () => {
    const state = await submitContact({ ...valid, website: "https://spam.example" }, deliver);
    expect(state.status).toBe("success");
    expect(deliver).not.toHaveBeenCalled();
  });

  it("falha na entrega vira erro amigável", async () => {
    deliver.mockRejectedValue(new Error("CRM offline"));
    const state = await submitContact(valid, deliver);
    expect(state).toEqual({ status: "error", message: "Não foi possível enviar agora. Tente novamente em instantes." });
  });

  it("falha não-Error também é tratada", async () => {
    deliver.mockRejectedValue("timeout");
    expect((await submitContact(valid, deliver)).status).toBe("error");
  });
});

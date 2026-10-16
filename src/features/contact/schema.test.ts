import { describe, expect, it } from "vitest";
import { parseContact } from "./schema";

const valid = {
  name: "Maria Silva",
  email: "maria@ong.org.br",
  phone: "(61) 99999-0000",
  organizationType: "Associação / ONG",
  message: "Queremos captar recursos para um projeto de esporte.",
  website: "",
};

describe("parseContact", () => {
  it("aceita um lead válido e normaliza espaços", () => {
    const result = parseContact({ ...valid, name: "  Maria Silva  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe("Maria Silva");
  });

  it("telefone é opcional", () => {
    expect(parseContact({ ...valid, phone: "" }).ok).toBe(true);
  });

  it.each([
    ["name", { name: "Al" }, "Informe seu nome completo."],
    ["email", { email: "nao-e-email" }, "Informe um e-mail válido."],
    ["phone", { phone: "123" }, "Informe um telefone com DDD."],
    ["organizationType", { organizationType: "Clube" }, "Selecione o tipo de organização."],
    ["message", { message: "curta" }, "Conte um pouco mais sobre o projeto (mín. 20 caracteres)."],
  ] as const)("rejeita %s inválido", (field, override, message) => {
    const result = parseContact({ ...valid, ...override });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors[field]).toBe(message);
  });

  it("retorna apenas o primeiro erro por campo", () => {
    const result = parseContact({ ...valid, message: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.fieldErrors)).toEqual(["message"]);
  });
});

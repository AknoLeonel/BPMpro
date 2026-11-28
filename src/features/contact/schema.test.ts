import { describe, expect, it } from "vitest";
import { consentError, isValidCityUf, normalizeBrazilianPhone, parseContact } from "./schema";

const valid = {
  name: "Maria Silva",
  organization: "Associação Esportiva Movimento",
  role: "Presidente",
  city: "Brasília/DF",
  whatsapp: "(61) 99999-0000",
  email: "maria@ong.org.br",
  area: "Esporte",
  stage: "Tenho uma ideia",
  message: "",
  consent: "on",
  website: "",
};

describe("parseContact", () => {
  it("aceita um lead válido, normaliza espaços e o WhatsApp", () => {
    const result = parseContact({ ...valid, name: "  Maria Silva  " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Maria Silva");
      expect(result.data.whatsapp).toBe("61999990000");
      expect(result.data.consent).toBe(true);
    }
  });

  it("aceita e-mail com espaços nas pontas (autocompletar do celular)", () => {
    const result = parseContact({ ...valid, email: " maria@ong.org.br " });
    expect(result.ok && result.data.email).toBe("maria@ong.org.br");
  });

  it("mensagem é opcional, mas limitada a 2000 caracteres", () => {
    const { message: _omit, ...withoutMessage } = valid;
    expect(parseContact(withoutMessage).ok).toBe(true);
    const long = parseContact({ ...valid, message: "a".repeat(2001) });
    expect(long.ok).toBe(false);
    if (!long.ok) expect(long.fieldErrors.message).toBe("A mensagem pode ter até 2000 caracteres.");
  });

  it.each([
    ["name", { name: "Al" }, "Informe seu nome completo."],
    ["organization", { organization: "A" }, "Informe o nome da entidade."],
    ["role", { role: "" }, "Informe o seu cargo na entidade."],
    ["city", { city: "Brasília/XX" }, "Informe a cidade e a UF, ex.: Brasília/DF."],
    ["city", { city: "Brasília" }, "Informe a cidade e a UF, ex.: Brasília/DF."],
    ["whatsapp", { whatsapp: "9999-0000" }, "Informe um WhatsApp com DDD."],
    ["email", { email: "nao-e-email" }, "Informe um e-mail válido."],
    ["area", { area: "Saúde" }, "Selecione a área do projeto."],
    ["area", { area: "" }, "Selecione a área do projeto."],
    ["stage", { stage: "Outro" }, "Selecione a etapa em que você está."],
  ] as const)("rejeita %s inválido (%o)", (field, override, message) => {
    const result = parseContact({ ...valid, ...override });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors[field]).toBe(message);
  });

  it("exige o consentimento", () => {
    const { consent: _omit, ...withoutConsent } = valid;
    const result = parseContact(withoutConsent);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors).toEqual({ consent: consentError });
  });

  it.each(["Esporte", "Cultura", "Turismo", "Social"])("aceita a área %s", (area) => {
    expect(parseContact({ ...valid, area }).ok).toBe(true);
  });

  it.each(["Tenho uma ideia", "Tenho um recurso indicado", "Tenho um projeto aprovado", "Preciso prestar contas"])(
    "aceita a etapa %s",
    (stage) => {
      expect(parseContact({ ...valid, stage }).ok).toBe(true);
    },
  );

  it("produto é opcional: aceita ausente ou vazio (ainda não sei)", () => {
    const { product: _omit, ...withoutProduct } = { ...valid, product: "" };
    expect(parseContact(withoutProduct).ok).toBe(true);
    const empty = parseContact({ ...valid, product: "" });
    expect(empty.ok && empty.data.product).toBe("");
  });

  it.each(["Selo Prata", "Selo Ouro"])("aceita o produto %s", (product) => {
    const result = parseContact({ ...valid, product });
    expect(result.ok && result.data.product).toBe(product);
  });

  it.each(["Selo Bronze", "selo ouro", 42])("rejeita produto desconhecido (%o)", (product) => {
    const result = parseContact({ ...valid, product });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.product).toBe("Selecione um produto da lista.");
  });

  it("retorna apenas o primeiro erro por campo", () => {
    const result = parseContact({ ...valid, name: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.fieldErrors)).toEqual(["name"]);
  });
});

describe("isValidCityUf", () => {
  it.each(["Brasília/DF", "Brasília - DF", "Goiânia/GO", "São Paulo SP", "Rio de Janeiro-RJ", "brasília/df"])(
    "aceita %s",
    (city) => expect(isValidCityUf(city)).toBe(true),
  );

  it.each(["Brasília", "Brasília/XX", "DF", "/DF", "Brasília/DFX", "BrasíliaDF", "1/DF"])("rejeita %s", (city) =>
    expect(isValidCityUf(city)).toBe(false),
  );
});

describe("normalizeBrazilianPhone", () => {
  it.each([
    ["(61) 99999-0000", "61999990000"],
    ["61 3333-4444", "6133334444"],
    ["+55 61 99999-0000", "61999990000"],
    ["5561999990000", "61999990000"],
  ])("normaliza %s", (input, expected) => expect(normalizeBrazilianPhone(input)).toBe(expected));

  it.each(["99999-0000", "123", "(01) 99999-0000", "61 99999-00001", ""])("rejeita %s", (input) =>
    expect(normalizeBrazilianPhone(input)).toBeNull(),
  );
});

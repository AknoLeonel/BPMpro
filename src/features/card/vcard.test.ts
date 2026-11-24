import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";
import { buildVCard, escapeVCardText, foldLine, normalizePhone } from "./vcard";

/** Desfaz a dobra de linhas (CRLF + espaço) para inspecionar as propriedades. */
const unfold = (card: string) => card.replace(/\r\n /g, "");

describe("escapeVCardText", () => {
  it("escapa vírgula, ponto e vírgula, barra invertida e quebras de linha", () => {
    expect(escapeVCardText("a,b;c\\d\ne\r\nf")).toBe("a\\,b\\;c\\\\d\\ne\\nf");
  });

  it("mantém texto simples intacto", () => {
    expect(escapeVCardText("Brasília — DF")).toBe("Brasília — DF");
  });
});

describe("normalizePhone", () => {
  it("mantém o + e remove espaços e hífens", () => {
    expect(normalizePhone("+55 61 0000-0000")).toBe("+556100000000");
    expect(normalizePhone("(61) 9999-0000")).toBe("6199990000");
  });
});

describe("foldLine", () => {
  it("não altera linhas curtas", () => {
    expect(foldLine("FN:BPM")).toBe("FN:BPM");
  });

  it("dobra em até 75 octetos sem partir caracteres multibyte", () => {
    const line = `NOTE:${"á".repeat(100)}`;
    const folded = foldLine(line);
    const encoder = new TextEncoder();
    for (const part of folded.split("\r\n")) expect(encoder.encode(part).length).toBeLessThanOrEqual(75);
    expect(folded.replace(/\r\n /g, "")).toBe(line);
  });
});

describe("buildVCard", () => {
  const card = buildVCard();
  const lines = unfold(card).split("\r\n");

  it("é um vCard 3.0 com CRLF em todas as linhas", () => {
    expect(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n")).toBe(true);
    expect(card.endsWith("END:VCARD\r\n")).toBe(true);
    expect(card.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
  });

  it("traz nome, organização, telefone, e-mail, site, endereço e nota do siteConfig", () => {
    expect(lines).toContain("FN:Brasil Projetos em Movimento");
    expect(lines).toContain("ORG:Brasil Projetos em Movimento");
    expect(lines).toContain(`TEL;TYPE=CELL,VOICE:${normalizePhone(siteConfig.phone)}`);
    expect(lines).toContain(`EMAIL;TYPE=INTERNET,WORK:${siteConfig.email}`);
    expect(lines).toContain(`URL:${siteConfig.url}`);
    expect(lines).toContain(`ADR;TYPE=WORK:;;${siteConfig.address};;;;Brasil`);
    expect(lines).toContain(`LABEL;TYPE=WORK:${siteConfig.address}`);
    expect(lines).toContain(`NOTE:${escapeVCardText(siteConfig.summary)}`);
  });

  it("escapa os valores de texto de um contato personalizado", () => {
    const custom = unfold(
      buildVCard({
        name: "Liga A; B",
        phone: "+55 11 1234-5678",
        email: "a@b.com",
        url: "https://exemplo.com",
        address: "Rua 1, Centro\nSão Paulo",
        note: "Linha 1\nLinha 2",
      }),
    );
    expect(custom).toContain("FN:Liga A\\; B\r\n");
    expect(custom).toContain("ADR;TYPE=WORK:;;Rua 1\\, Centro\\nSão Paulo;;;;Brasil\r\n");
    expect(custom).toContain("NOTE:Linha 1\\nLinha 2\r\n");
    expect(custom).toContain("TEL;TYPE=CELL,VOICE:+551112345678\r\n");
  });
});

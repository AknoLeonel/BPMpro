import { siteConfig } from "@/lib/site-config";

/** Dados mínimos para montar o cartão de contato. */
export interface VCardContact {
  name: string;
  phone: string;
  email: string;
  url: string;
  address: string;
  note: string;
}

const CRLF = "\r\n";
/** Limite de octetos por linha (RFC 2426 §2.6 / RFC 6350 §3.2). */
const MAX_LINE_OCTETS = 75;

/** Escapa barra invertida, vírgula, ponto e vírgula e quebras de linha (RFC 2426 §4 / RFC 6350 §3.4). */
export function escapeVCardText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r\n|\r|\n/g, "\\n");
}

/** Dobra linhas longas em até 75 octetos UTF-8 sem partir caracteres multibyte. */
export function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // Linhas de continuação começam com um espaço, que conta no limite.
    const limit = parts.length === 0 ? MAX_LINE_OCTETS : MAX_LINE_OCTETS - 1;
    if (octets + size > limit) {
      parts.push(current);
      current = "";
      octets = 0;
    }
    current += char;
    octets += size;
  }
  parts.push(current);
  return parts.join(`${CRLF} `);
}

/** Telefone no formato E.164 (só `+` e dígitos), usado em `TEL` e em links `tel:`. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return phone.trim().startsWith("+") ? `+${digits}` : digits;
}

const defaultVCardContact: VCardContact = {
  name: siteConfig.fullName,
  phone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.url,
  address: siteConfig.address,
  note: siteConfig.summary,
};

/** Monta um vCard 3.0 da organização, com linhas terminadas em CRLF. */
export function buildVCard(contact: VCardContact = defaultVCardContact): string {
  const name = escapeVCardText(contact.name);
  const address = escapeVCardText(contact.address);
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${name};;;;`,
    `FN:${name}`,
    `ORG:${name}`,
    "X-ABShowAs:COMPANY",
    `TEL;TYPE=CELL,VOICE:${normalizePhone(contact.phone)}`,
    `EMAIL;TYPE=INTERNET,WORK:${contact.email}`,
    `URL:${contact.url}`,
    `ADR;TYPE=WORK:;;${address};;;;Brasil`,
    `LABEL;TYPE=WORK:${address}`,
    `NOTE:${escapeVCardText(contact.note)}`,
    "END:VCARD",
  ];
  return lines.map(foldLine).join(CRLF) + CRLF;
}

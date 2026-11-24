"use client";

/**
 * Ano corrente calculado no navegador: as páginas são pré-renderizadas no build,
 * então um `new Date()` no servidor congelaria o ano da última publicação.
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}

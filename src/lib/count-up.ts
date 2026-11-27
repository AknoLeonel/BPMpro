const DIGITS = /\d+/g;

/** `true` quando o texto tem algarismos para animar (ex.: "+ de 60"; "[X]" não tem). */
export function hasDigits(text: string): boolean {
  return /\d/.test(text);
}

/**
 * Quadro da contagem: cada número do texto vai de 0 até o valor final conforme `progress` (0–1),
 * mantendo todo o resto igual — "+ de R$ 16 milhões" em 0.5 vira "+ de R$ 8 milhões"; "3 + 3" vira "2 + 2".
 * Em `progress >= 1` devolve o texto original, exatamente como está no arquivo de dados.
 */
export function countUpFrame(text: string, progress: number): string {
  if (progress >= 1) return text;
  const p = Math.max(0, progress);
  return text.replace(DIGITS, (digits) => String(Math.round(Number(digits) * p)));
}

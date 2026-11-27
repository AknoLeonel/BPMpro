import { describe, expect, it } from "vitest";
import { countUpFrame, hasDigits } from "./count-up";

describe("countUpFrame", () => {
  it("começa em zero e preserva o texto ao redor dos números", () => {
    expect(countUpFrame("+ de R$ 16 milhões", 0)).toBe("+ de R$ 0 milhões");
    expect(countUpFrame("3 + 3", 0)).toBe("0 + 0");
  });

  it("anima cada número proporcionalmente", () => {
    expect(countUpFrame("+ de R$ 16 milhões", 0.5)).toBe("+ de R$ 8 milhões");
    expect(countUpFrame("+ de 60", 0.5)).toBe("+ de 30");
  });

  it("termina exatamente no texto original (sem arredondar nada)", () => {
    expect(countUpFrame("+ de R$ 16 milhões", 1)).toBe("+ de R$ 16 milhões");
    expect(countUpFrame("18", 1.2)).toBe("18");
  });

  it("não deixa a contagem ficar negativa", () => {
    expect(countUpFrame("18", -0.3)).toBe("0");
  });
});

describe("hasDigits", () => {
  it("detecta textos com algarismos", () => {
    expect(hasDigits("3 + 3")).toBe(true);
    expect(hasDigits("[X]")).toBe(false);
  });
});

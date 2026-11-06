import { describe, expect, it } from "vitest";
import { colorCycle, cycleColor } from "./palette";

describe("cycleColor", () => {
  it("percorre a paleta em ciclo", () => {
    expect(cycleColor(0)).toBe(colorCycle[0]);
    expect(cycleColor(colorCycle.length)).toBe(colorCycle[0]);
    expect(cycleColor(colorCycle.length + 2)).toBe(colorCycle[2]);
  });

  it("aceita índices negativos", () => {
    expect(cycleColor(-1)).toBe(colorCycle[colorCycle.length - 1]);
  });

  it("amarelo usa texto escuro para manter contraste AA", () => {
    const yellow = colorCycle.find((c) => c.solid.includes("bg-accent"));
    expect(yellow?.solid).toContain("text-ink-950");
  });
});

import { describe, expect, it } from "vitest";
import { cn, formatNumber } from "./utils";

describe("cn", () => {
  it("mescla classes e resolve conflitos do Tailwind", () => {
    expect(cn("px-2 py-1", false, "px-4")).toBe("py-1 px-4");
  });
});

describe("formatNumber", () => {
  it("usa separador pt-BR", () => {
    expect(formatNumber(1234567)).toBe("1.234.567");
  });
});

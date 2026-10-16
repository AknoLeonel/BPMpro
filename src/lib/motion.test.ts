import { describe, expect, it } from "vitest";
import { distance, duration, easing, exitDuration, fadeSlide, offsetFor } from "./motion";

describe("motion tokens", () => {
  it("ordena durações do micro ao grande", () => {
    expect(duration.micro).toBeLessThan(duration.small);
    expect(duration.small).toBeLessThan(duration.medium);
    expect(duration.medium).toBeLessThan(duration.large);
  });

  it("saída é 30% mais rápida que a entrada", () => {
    expect(exitDuration(1)).toBe(0.7);
    expect(exitDuration(duration.medium)).toBeLessThan(duration.medium);
  });

  it.each([
    ["up", { x: 0, y: distance.md }],
    ["down", { x: 0, y: -distance.md }],
    ["left", { x: distance.md, y: 0 }],
    ["right", { x: -distance.md, y: 0 }],
    ["none", { x: 0, y: 0 }],
  ] as const)("offsetFor(%s)", (direction, expected) => {
    expect(offsetFor(direction)).toEqual(expected);
  });

  it("fadeSlide entra com ease-out e sai com ease-in", () => {
    const v = fadeSlide("up");
    expect(v.hidden).toEqual({ opacity: 0, x: 0, y: distance.md });
    expect(v.visible.transition.ease).toBe(easing.enter);
    expect(v.exit.transition.ease).toBe(easing.exit);
    expect(v.exit.transition.duration).toBeLessThan(v.visible.transition.duration);
  });

  it("reduced-motion remove deslocamento e encurta a entrada", () => {
    const v = fadeSlide("left", true);
    expect(v.hidden).toEqual({ opacity: 0, x: 0, y: 0 });
    expect(v.exit).toMatchObject({ x: 0, y: 0 });
    expect(v.visible.transition.duration).toBe(duration.micro);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton, SkeletonText } from "./skeleton";

describe("Skeleton", () => {
  it("é decorativo (aria-hidden) e aplica a forma", () => {
    render(<Skeleton shape="circle" className="size-8" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("aria-hidden");
    expect(el).toHaveClass("skeleton", "rounded-full", "size-8");
  });

  it("SkeletonText renderiza N linhas com a última mais curta", () => {
    render(<SkeletonText lines={4} />);
    const lines = screen.getAllByTestId("skeleton");
    expect(lines).toHaveLength(4);
    expect(lines.at(-1)).toHaveClass("w-2/3");
    expect(lines[0]).toHaveClass("w-full");
  });
});

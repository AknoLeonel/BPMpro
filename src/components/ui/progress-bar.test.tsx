import { render, screen } from "@testing-library/react";
import { domAnimation, LazyMotion } from "motion/react";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./progress-bar";

const wrap = (ui: React.ReactNode) => render(<LazyMotion features={domAnimation}>{ui}</LazyMotion>);

describe("ProgressBar", () => {
  it("determinado expõe aria-valuenow limitado a 0–100", () => {
    wrap(<ProgressBar value={140} label="Envio" />);
    expect(screen.getByRole("progressbar", { name: "Envio" })).toHaveAttribute("aria-valuenow", "100");
  });

  it("valores negativos viram 0", () => {
    wrap(<ProgressBar value={-5} label="Envio" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("indeterminado omite aria-valuenow", () => {
    wrap(<ProgressBar label="Carregando" />);
    expect(screen.getByRole("progressbar", { name: "Carregando" })).not.toHaveAttribute("aria-valuenow");
  });
});

import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollToHash } from "./scroll-to-hash";

function setup(hash: string, top: number) {
  window.history.replaceState(null, "", `/${hash}`);
  const target = document.createElement("section");
  target.id = "duvidas";
  target.getBoundingClientRect = () => ({ top }) as DOMRect;
  target.scrollIntoView = vi.fn();
  document.body.append(target);
  return target;
}

describe("ScrollToHash", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    window.history.replaceState(null, "", "/");
  });

  it("rola até a âncora do link quando o navegador ainda não saltou", () => {
    const target = setup("#duvidas", 4200);
    render(<ScrollToHash />);
    expect(target.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
  });

  it("não mexe quando a âncora já está no lugar", () => {
    const target = setup("#duvidas", 0);
    render(<ScrollToHash />);
    expect(target.scrollIntoView).not.toHaveBeenCalled();
  });

  it("ignora URLs sem âncora ou com âncora inexistente", () => {
    const target = setup("", 4200);
    render(<ScrollToHash />);
    window.history.replaceState(null, "", "/#nao-existe");
    render(<ScrollToHash />);
    expect(target.scrollIntoView).not.toHaveBeenCalled();
  });
});

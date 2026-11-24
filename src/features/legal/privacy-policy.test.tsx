import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/lib/site-config";
import { PrivacyPolicy } from "./privacy-policy";

describe("PrivacyPolicy (integração)", () => {
  it("tem um único h1, seções rotuladas e o contato de privacidade", () => {
    render(
      <MotionProvider>
        <PrivacyPolicy />
      </MotionProvider>,
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Política de Privacidade");
    for (const name of ["Quem somos", "Base legal", "Seus direitos", "Cookies e monitoramento técnico"]) {
      expect(screen.getByRole("region", { name: new RegExp(name) })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: siteConfig.email })[0]).toHaveAttribute(
      "href",
      `mailto:${siteConfig.email}`,
    );
    expect(screen.getByText(/art\. 7º, I/)).toBeInTheDocument();
    expect(screen.getByText(/art\. 18 da LGPD/)).toBeInTheDocument();
    expect(screen.getByText("Versão provisória.")).toBeInTheDocument();
  });
});

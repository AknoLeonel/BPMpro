import { fichaLimpa } from "@/lib/products";
import { Accordion } from "./accordion";
import { ProductSection } from "./product-section";

/** Seção 9 — dúvidas sobre os selos, um item aberto por vez. */
export function ProductFaq() {
  const { faq } = fichaLimpa;
  const first = faq.items[0]?.question;
  return (
    <ProductSection id="duvidas" title={faq.title}>
      <div className="mx-auto max-w-3xl">
        <Accordion
          defaultOpen={first ? [first] : []}
          items={faq.items.map((item) => ({
            id: item.question,
            header: <span className="font-semibold text-[1.0625rem] leading-snug">{item.question}</span>,
            content: <p className="max-w-2xl pr-12 text-ink-600 leading-relaxed">{item.answer}</p>,
          }))}
        />
      </div>
    </ProductSection>
  );
}

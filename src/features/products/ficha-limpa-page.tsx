import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { fichaLimpa, sealOrder } from "@/lib/products";
import { routes } from "@/lib/routes";
import { Breadcrumb } from "./components/breadcrumb";
import { ChecklistAccordion } from "./components/checklist-accordion";
import { ComparisonTable } from "./components/comparison-table";
import { DirectorsBlock } from "./components/directors-block";
import { FinalCta } from "./components/final-cta";
import { PainBlock } from "./components/pain-block";
import { PillarsGrid } from "./components/pillars-grid";
import { ProductFaq } from "./components/product-faq";
import { ProductHero } from "./components/product-hero";
import { ProductSection } from "./components/product-section";
import { SealCard } from "./components/seal-card";
import { StepsList } from "./components/steps-list";
import { TransparencySection } from "./components/transparency-notice";

/** /produtos/ficha-limpa — as 10 seções na ordem do funil. */
export function FichaLimpaPage() {
  const { hero, comparison, checklist } = fichaLimpa;
  return (
    <>
      <ProductHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        chips={hero.chips}
        cta={{ label: hero.cta, href: "#solicitar" }}
        levels={sealOrder}
        breadcrumb={<Breadcrumb items={[{ label: "Produtos", href: routes.products }, { label: hero.title }]} />}
      />
      <PainBlock />
      <PillarsGrid />
      <ProductSection id="prata-x-ouro" title={comparison.title} surface="muted">
        <ComparisonTable />
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
          {sealOrder.map((level) => (
            <StaggerItem key={level}>
              <SealCard level={level} />
            </StaggerItem>
          ))}
        </Stagger>
      </ProductSection>
      <ProductSection id="o-que-conferimos" title={checklist.title}>
        <ChecklistAccordion />
      </ProductSection>
      <DirectorsBlock />
      <StepsList />
      <TransparencySection />
      <ProductFaq />
      <FinalCta />
    </>
  );
}

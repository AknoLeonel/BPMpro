import { Reveal } from "@/components/motion/reveal";
import { fichaLimpa, type SealLevel, sealPages, seals } from "@/lib/products";
import { routes } from "@/lib/routes";
import { Breadcrumb } from "./components/breadcrumb";
import { ChecklistAccordion } from "./components/checklist-accordion";
import { ComparisonTable } from "./components/comparison-table";
import { DirectorsBlock } from "./components/directors-block";
import { FinalCta } from "./components/final-cta";
import { PainBlock } from "./components/pain-block";
import { ProductFaq } from "./components/product-faq";
import { ProductHero } from "./components/product-hero";
import { ProductSection } from "./components/product-section";
import { SealCard } from "./components/seal-card";
import { StepsList } from "./components/steps-list";
import { TransparencySection } from "./components/transparency-notice";

const otherLevel = (level: SealLevel): SealLevel => (level === "prata" ? "ouro" : "prata");

/** /produtos/ficha-limpa/prata e /ouro — os mesmos blocos, focados em um selo. */
export function SealPage({ level }: { level: SealLevel }) {
  const page = sealPages[level];
  const { comparison, checklist, hero } = fichaLimpa;
  return (
    <>
      <ProductHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        chips={hero.chips}
        cta={{ label: hero.cta, href: "#solicitar" }}
        levels={[level]}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Produtos", href: routes.products },
              { label: hero.title, href: routes.fichaLimpa },
              { label: seals[level].name },
            ]}
          />
        }
      />
      <PainBlock />
      <ProductSection id="prata-x-ouro" title={comparison.title} surface="muted">
        <ComparisonTable focus={level} />
        <Reveal className="mx-auto mt-10 max-w-xl">
          <SealCard level={otherLevel(level)} />
        </Reveal>
      </ProductSection>
      <ProductSection id="o-que-conferimos" title={checklist.title}>
        <ChecklistAccordion level={level} />
      </ProductSection>
      <DirectorsBlock />
      <StepsList />
      <TransparencySection />
      <ProductFaq />
      <FinalCta level={level} />
    </>
  );
}

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fichaLimpa } from "@/lib/products";

/** Seção 7 — como funciona, em 4 passos numerados. */
export function StepsList() {
  const { steps } = fichaLimpa;
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading id="como-funciona-title" title={steps.title} />
        <Stagger
          as="ol"
          aria-labelledby="como-funciona-title"
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          {steps.items.map((step, i) => (
            <StaggerItem as="li" key={step} className="flex">
              <div className="flex w-full flex-col border-brand-500 border-t-4 bg-ink-100 p-6 sm:p-7">
                <span
                  aria-hidden
                  className="font-display font-semibold text-4xl text-brand-700 tabular-nums leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-pretty font-medium text-ink-950 text-lg leading-snug">{step}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

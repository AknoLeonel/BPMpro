import { Areas } from "./sections/areas";
import { Cases } from "./sections/cases";
import { Contact } from "./sections/contact";
import { Hero } from "./sections/hero";
import { Journey } from "./sections/journey";
import { FaqSection, TestimonialsSection } from "./sections/social-proof";
import { Solutions } from "./sections/solutions";
import { Stats } from "./sections/stats";

/**
 * Conteúdo institucional é renderizado no servidor (SEO) e revelado com motion;
 * blocos interativos (depoimentos, FAQ, formulário) são lazy + skeleton.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Solutions />
      <Journey />
      <Areas />
      <Cases />
      <TestimonialsSection />
      <FaqSection />
      <Contact />
    </>
  );
}

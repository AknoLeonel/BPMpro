import { About } from "./sections/about";
import { Areas } from "./sections/areas";
import { AreasMarquee } from "./sections/areas-marquee";
import { Cases } from "./sections/cases";
import { Contact } from "./sections/contact";
import { Hero } from "./sections/hero";
import { Insights } from "./sections/insights";
import { Journey } from "./sections/journey";
import { Partners } from "./sections/partners";
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
      <AreasMarquee />
      <About />
      <Solutions />
      <Journey />
      <Areas />
      <Cases />
      <Partners />
      <TestimonialsSection />
      <Insights />
      <FaqSection />
      <Contact />
    </>
  );
}

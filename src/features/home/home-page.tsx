import { About } from "./sections/about";
import { Areas } from "./sections/areas";
import { Audiences } from "./sections/audiences";
import { Contact } from "./sections/contact";
import { Differentials } from "./sections/differentials";
import { Hero } from "./sections/hero";
import { Journey } from "./sections/journey";
import { Pains } from "./sections/pains";
import { Projects } from "./sections/projects";
import { Services } from "./sections/services";
import { FaqSection, TestimonialsSection } from "./sections/social-proof";

/**
 * Landing page na ordem do funil de vendas (documento "esqueleto e conteúdo"):
 * topo prende a atenção e mostra a dor, meio explica e qualifica, fundo prova e converte.
 * Cabeçalho, rodapé e botão flutuante vêm do layout raiz.
 */
export function HomePage() {
  return (
    <>
      {/* Topo */}
      <Hero />
      <Pains />
      <About />
      {/* Meio */}
      <Services />
      <Journey />
      <Audiences />
      <Areas />
      <Differentials />
      {/* Fundo */}
      <Projects />
      <TestimonialsSection />
      <FaqSection />
      <Contact />
    </>
  );
}

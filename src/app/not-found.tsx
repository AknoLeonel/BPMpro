import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center pt-24 text-center">
      <Reveal>
        <p className="font-extrabold text-7xl text-gradient">404</p>
        <h1 className="mt-4 font-bold text-3xl text-ink-950 dark:text-white">Página não encontrada</h1>
        <p className="mt-3 text-ink-600 dark:text-ink-300">O conteúdo que você procura mudou de lugar.</p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden /> Voltar ao início
        </ButtonLink>
      </Reveal>
    </Container>
  );
}

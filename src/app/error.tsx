"use client";

import * as Sentry from "@sentry/nextjs";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] items-center justify-center pt-24 text-center">
      <Reveal>
        <p className="font-semibold text-brand-600">Algo saiu do movimento</p>
        <h1 className="mt-3 font-bold text-4xl text-ink-950 dark:text-white">Tivemos um problema inesperado</h1>
        <p className="mt-4 text-ink-600 dark:text-ink-300">Nossa equipe já foi notificada. Tente novamente.</p>
        <Button className="mt-8" onClick={reset}>
          <RotateCcw className="size-4" aria-hidden /> Tentar novamente
        </Button>
      </Reveal>
    </Container>
  );
}

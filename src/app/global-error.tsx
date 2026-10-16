"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "system-ui", display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <main style={{ textAlign: "center" }}>
          <h1>Erro inesperado</h1>
          <p>Recarregue a página para continuar.</p>
        </main>
      </body>
    </html>
  );
}

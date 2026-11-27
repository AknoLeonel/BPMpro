"use client";

import { useEffect } from "react";

/**
 * Garante o salto para a âncora de links compartilhados (ex.: bpmpro.com.br/#duvidas).
 * O navegador só faz esse salto quando termina de carregar a página — em aparelhos lentos isso
 * demora segundos e o visitante fica no topo. Assim que a página fica interativa, rolamos até o alvo
 * (respeitando o `scroll-margin-top` do cabeçalho fixo).
 */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const { top } = target.getBoundingClientRect();
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    // Já está no lugar (o navegador saltou antes): não mexe.
    if (Math.abs(top - margin) < 2) return;
    target.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  return null;
}

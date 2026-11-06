# Motion System

Baseado nos *Motion Principles* (referência: `kylezantos/design-principles`) e adaptado ao BPMpro.
Tokens em [`src/lib/motion.ts`](../src/lib/motion.ts).

## Princípios

1. **Propósito** — o movimento orienta a atenção e comunica estado; nunca é só decoração.
2. **Duração proporcional** — `micro 120ms` (ícones) · `small 200ms` (botões, tooltips) · `medium 320ms` (painéis, accordions) · `large 500ms` (seções) · `progress 600ms`.
3. **Easing com intenção** — entrada desacelera (`easing.enter`), saída acelera (`easing.exit`), troca de estado usa `easing.move`.
4. **Saída mais rápida que entrada** — `exitDuration()` = 70% da entrada.
5. **Distâncias curtas** — 8 / 16 / 24px. Animar só `opacity` e `transform`.
6. **Coreografia** — itens relacionados entram em sequência (`stagger.tight` 50ms, `stagger.base` 80ms).
7. **Continuidade** — skeleton tem o mesmo layout do conteúdo final; troca por crossfade (CLS ≈ 0).
8. **Respeito** — `prefers-reduced-motion`: sem deslocamento, fade curto, sem autoplay, shimmer vira pulso.

## Identidade "Brasil em movimento"

- Paleta em ciclo (`src/lib/palette.ts`): verde `brand`, amarelo `accent`, azul `ocean`, coral `coral`. Use `cycleColor(i)` para alternar cores em listas — nunca hex soltos. Texto sobre amarelo é sempre escuro (AA).
- Títulos (`h1`, `h2`, `.font-display`) em **Bricolage Grotesque**; corpo em Geist.
- Assinatura visual: `.brand-bar` (faixa multicolor) sob os eyebrows, círculos coloridos flutuando no hero e faixa inclinada em marquee.

## Primitivos

| Componente | Arquivo | Uso |
| --- | --- | --- |
| `MotionProvider` | `components/motion/motion-provider.tsx` | `LazyMotion` (bundle enxuto) + `reducedMotion="user"` |
| `Reveal` | `components/motion/reveal.tsx` | entrada ao cruzar a viewport |
| `Stagger` / `StaggerItem` | `components/motion/stagger.tsx` | listas e grids coreografados |
| `LazySection` | `components/motion/lazy-section.tsx` | monta perto da viewport; skeleton → conteúdo |
| `AnimatedCounter` | `components/motion/animated-counter.tsx` | progresso numérico |
| `Marquee` | `components/motion/marquee.tsx` | faixa contínua 100% CSS; pausa no hover/foco; parada com reduced-motion |
| `RotatingWord` | `components/motion/rotating-word.tsx` | palavra rotativa com largura reservada (CLS zero) e lista lida uma vez por leitores de tela |
| `ScrollProgress` | `components/motion/scroll-progress.tsx` | progresso de leitura |
| `Skeleton`, `SkeletonText` | `components/ui/skeleton.tsx` | placeholders com shimmer |
| `ProgressBar` | `components/ui/progress-bar.tsx` | progresso determinado/indeterminado acessível |
| `LazyImage` | `components/ui/lazy-image.tsx` | imagem lazy com skeleton + fade/blur |
| `Button loading` | `components/ui/button.tsx` | estado de carregamento |
| `template.tsx` / `loading.tsx` | `app/` | transição de rota e skeleton de rota |

## Checklist para nova interface

- [ ] Existe skeleton para cada estado de carregamento (rota, seção lazy, imagem, dados)?
- [ ] Conteúdo abaixo da dobra é lazy (`dynamic` + `LazySection` ou `LazyImage`)?
- [ ] Entrada com `Reveal`/`Stagger`; saída com `AnimatePresence` + `exit`?
- [ ] Ações assíncronas mostram carregamento e progresso (botão `loading`, `ProgressBar`)?
- [ ] Sucesso/erro têm transição (ex.: check com spring, shake curto no erro)?
- [ ] Testado com `prefers-reduced-motion: reduce` (há E2E cobrindo)?

# BPM Design System — Token Reference

> Leia este arquivo primeiro. Especificação de componentes em [design-components.md](design-components.md). Acessibilidade e do's/don'ts em [design-guidelines.md](design-guidelines.md).

Linguagem visual do **Manual de Marca BPM — Brasil Projetos em Movimento**: geométrica, contrastada e
institucional, com azul-petróleo como cor de marca, preto e cinza-claro como base e vermelho como sinal.
Tipografia principal **New Science** (títulos) e complementar **Montserrat** (texto). Unidade base de
espaçamento: **4px** (escala do Tailwind). Plataforma: web responsiva (Next.js 16 + Tailwind CSS v4);
os tokens vivem em `src/app/globals.css` (`@theme`).

## Colors

As quatro cores oficiais do manual são as âncoras (marcadas com ★). As demais são escalas derivadas
para estados, superfícies e contraste — nunca introduza matizes fora delas.

### Brand — Azul-petróleo (`brand`)

| Role | Hex | Usage |
|------|-----|-------|
| brand-50 | `#e8f4f7` | Fundo de chips e destaques suaves |
| brand-100 | `#cfe7ee` | Hover de superfícies suaves |
| brand-200 | `#a3d2de` | Bordas suaves, seleção de texto |
| brand-300 | `#6fb8ca` | Texto/ícone de marca sobre preto (7.75:1 com 400) |
| brand-400 | `#3aa0b6` | Ícones e links sobre preto; anel de foco |
| ★ brand-500 | `#187b91` | **Cor de marca.** Botão primário, blocos geométricos, links sobre branco (4.91:1) |
| brand-600 | `#146c80` | Hover do botão primário |
| brand-700 | `#145f70` | Texto de marca sobre cinza-claro (≥ 6:1) |
| brand-800 | `#134d5a` | Pressed |
| brand-900 | `#103e49` | Fundos profundos |
| brand-950 | `#0a2830` | Sombra de marca |
| on-brand | `#ffffff` | Texto/ícone sobre brand-500 (4.91:1) |

### Signal — Vermelho (`signal`)

| Role | Hex | Usage |
|------|-----|-------|
| signal-300 | `#ff8a88` | Destaque sobre preto (texto pequeno) |
| signal-400 | `#ff6b69` | Destaque sobre preto (6.80:1) |
| ★ signal-500 | `#f33836` | **Cor de sinal.** Traço sobre títulos, triângulos, marcadores, números. Texto só ≥ 24px ou sobre preto |
| signal-600 | `#de2a28` | Hover de elementos de sinal |
| signal-700 | `#c8201f` | Texto vermelho sobre branco (5.70:1) — erros de formulário |
| signal-800 | `#a01a19` | Pressed |

### Surface & Neutral (`ink`)

| Role | Hex | Usage |
|------|-----|-------|
| white | `#ffffff` | Superfície padrão |
| ink-50 | `#f6f6f6` | Superfície alternada sutil |
| ★ ink-100 | `#ececec` | **Cinza-claro da marca.** Seções alternadas, texto sobre preto (15.98:1) |
| ink-200 | `#dcdcdc` | Bordas e divisores sobre branco |
| ink-300 | `#c4c4c4` | Bordas de input em repouso |
| ink-400 | `#a3a3a3` | Texto secundário sobre preto (7.49:1) |
| ink-500 | `#7a7a7a` | Ícones desabilitados (não usar em texto sobre branco) |
| ink-600 | `#5c5c5c` | Texto secundário sobre branco/cinza (5.66:1 em ink-100) |
| ink-700 | `#3d3d3d` | Texto de corpo alternativo |
| ink-800 | `#262626` | Cards sobre preto, bordas sobre preto |
| ink-900 | `#1a1a1a` | Superfície elevada escura |
| ★ ink-950 | `#111111` | **Preto da marca.** Texto principal, seções escuras, rodapé |

### Semantic / Status

| Role | Hex | Usage |
|------|-----|-------|
| success | `#145f70` (brand-700) | Mensagem de sucesso do formulário (com ícone) |
| error | `#c8201f` (signal-700) | Erros de validação (sobre branco) |
| error-on-dark | `#ff8a88` (signal-300) | Erros sobre preto |
| whatsapp | `#25d366` | Somente o ícone do WhatsApp no botão flutuante |

### Temas de seção

O site **não** troca de tema por `prefers-color-scheme`: a marca alterna superfícies por seção, como nas peças do manual.

| Superfície | Fundo | Texto | Secundário | Acento |
|---|---|---|---|---|
| Clara | `white` | `ink-950` | `ink-600` | `brand-500`, `signal-500` (decorativo) |
| Cinza | `ink-100` | `ink-950` | `ink-600` | `brand-700` (texto), `brand-500` (blocos) |
| Escura | `ink-950` | `ink-100` | `ink-400` | `brand-400`, `signal-500` |
| Marca | `brand-500` | `white` | `brand-50` | `ink-950` (blocos) |

## Typography

| Família | Papel | Fonte web | Fallback |
|---|---|---|---|
| **New Science** | Principal — títulos, eyebrows, números, marca | `--font-display` | Archivo Variable em largura expandida (`wdth` 125), `ui-sans-serif`, `system-ui` |
| **Montserrat** | Complementar — corpo, botões, formulários | `--font-sans` (`Montserrat Variable`) | `ui-sans-serif`, `system-ui` |

> New Science é uma fonte comercial. Enquanto o arquivo licenciado não estiver no repositório,
> `--font-display` usa **Archivo Expanded** (licença OFL), a alternativa livre mais próxima
> (grotesca larga e geométrica). Para trocar, adicione o `@font-face` de New Science e coloque o
> nome dela primeiro em `--font-display`.

| Style | Size (mobile → desktop) | Weight | Line Height | Spacing | Família |
|-------|------|--------|-------------|---------|---------|
| Display | 40px → 72px (`clamp(2.5rem, 4vw + 1.25rem, 4.5rem)`) | 600 | 1.05 | -0.01em | Display |
| Headline (h2) | 30px → 48px | 600 | 1.1 | -0.01em | Display |
| Title (h3) | 20px | 600 | 1.3 | 0 | Display |
| Eyebrow | 12px | 600 | 1 | 0.16em, MAIÚSCULAS | Display |
| Body Large | 18px | 400 | 1.6 | 0 | Montserrat |
| Body | 16px | 400 | 1.6 | 0 | Montserrat |
| Body Small | 14px | 400 | 1.5 | 0 | Montserrat |
| Label | 14px | 500 | 1.25 | 0 | Montserrat |
| Button | 15px (md) / 16px (lg) | 600 | 1 | 0 | Montserrat |
| Stat | 40px → 56px | 600 | 1 | -0.02em | Display, `tabular-nums` |

Títulos de seção usam *sentence case* (como no conteúdo aprovado). Maiúsculas espaçadas só em eyebrows,
rótulos curtos e na assinatura "Brasil Projetos em Movimento".

## Shape

| Token | Radius | Components |
|-------|--------|------------|
| none | 0 | Blocos geométricos (faixas, triângulos), linhas de raia |
| sm | 6px | Inputs, chips de modalidade, barras de cor |
| md | 12px | Cards, itens de acordeão |
| lg | 24px | Painéis (formulário, mapa, cartão digital) |
| xl | 40px | Blocos de destaque (estilo dos cartões de tipografia do manual) |
| full | 9999px | Botões, selos, botão flutuante |

## Elevation

A marca é plana: separe por cor de superfície antes de usar sombra.

| Level | CSS Shadow | Usage |
|-------|-----------|-------|
| 0 | `none` | Superfícies e seções |
| 1 | `0 1px 2px rgb(17 17 17 / .06), 0 1px 3px rgb(17 17 17 / .08)` | Cards em repouso sobre branco |
| 2 | `0 12px 28px -12px rgb(17 17 17 / .22)` | Cards em hover, cabeçalho rolado |
| 3 | `0 24px 48px -16px rgb(17 17 17 / .32)` | Botão flutuante, menu mobile |

## Interaction States

| State | Treatment | Notes |
|-------|-------------|-------|
| Enabled | Base | Repouso |
| Hover | Fundo um tom acima (500 → 600); cards sobem 4px (`-translate-y-1`) e passam à elevação 2 | Só em dispositivos com ponteiro |
| Focus | Anel 2px `brand-400` + offset 2px (`ring-offset` da superfície) | Sempre visível com teclado |
| Pressed | Tom 800; `scale(0.97)` | Removido com reduced-motion |
| Disabled | 60% de opacidade, sem ponteiro | Nunca a única pista de estado |
| Selected | Borda/indicador `signal-500` de 2px | Raia ativa, item de menu atual |

## Layout

| Class | Width | Columns | Navigation |
|-------|-------|-------|------------|
| Compact | < 640px | 1 (cards empilhados; galeria em carrossel) | Menu hambúrguer, logo só com símbolo + "BPM Pro" |
| Medium | 640–1023px | 2 | Hambúrguer |
| Expanded | ≥ 1024px | 2–4 | Menu no centro, botão WhatsApp à direita, logo completa |

- Container: `max-w-7xl` (1280px), gutters 16 / 24 / 32px.
- Ritmo vertical de seção: `py-20` (80px) mobile → `py-28` (112px) desktop.
- Cabeçalho fixo de 72px; âncoras com `scroll-margin-top: 88px`.

## Motion

Fonte única: `src/lib/motion.ts` (detalhes em [MOTION.md](MOTION.md)).

| Token | Valor | Uso |
|---|---|---|
| duration.micro | 120ms | Hover, foco, reduced-motion |
| duration.small | 200ms | Botões, ícones |
| duration.medium | 320ms | Acordeão, menu |
| duration.large | 500ms | Entrada de seção (Reveal) |
| duration.progress | 600ms | Barras e contadores |
| easing.enter | `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas |
| easing.exit | `cubic-bezier(0.7, 0, 0.84, 0)` | Saídas (~30% mais rápidas) |
| easing.move | `cubic-bezier(0.65, 0, 0.35, 1)` | Mudanças de estado |
| stagger | 50 / 80ms | Grupos de cards |

Assinatura de movimento da marca: elementos geométricos entram **deslizando na horizontal** (como
raias de pista). O traço vermelho sobre os títulos cresce da esquerda (`scaleX` 0 → 1).

## Icons

| Spec | Value |
|---|---|
| Biblioteca | `lucide-react` (traço fino, terminais arredondados — mesmo estilo dos ícones do manual) |
| Stroke | 1.5px (o padrão 2px do Lucide é mais pesado que o manual) |
| Tamanhos | 20px (inline), 24px (cards), 32px (áreas), 40px (destaques) |
| Cor | `currentColor`; `brand-500` sobre branco, `brand-400` sobre preto |
| Contêiner | Quadrado `size-12`, raio sm, fundo `brand-50` (claro) ou `ink-900` (escuro) |

## Brand Assets

| Asset | Arquivo | Uso |
|---|---|---|
| Logotipo (símbolo + "BPM" + ®) | `src/components/layout/logo.tsx` | Cabeçalho, rodapé, cartão |
| Símbolo hexagonal "b" | `src/components/layout/brand-symbol.tsx`, `src/app/icon.svg` | Favicon, telas pequenas, marca d'água |
| Elementos geométricos | `src/components/ui/brand-shapes.tsx` | Faixas, triângulos, quarto de círculo, traço vermelho |

Área de proteção do logotipo: altura do "B" em todos os lados. Tamanho mínimo: 24px de altura (símbolo) / 96px de largura (logotipo).

## Design Tokens

Tokens CSS do Tailwind v4 em `@theme`: `--color-{brand|signal|ink}-{50…950}`, `--font-{sans|display}`,
`--radius-*`, `--shadow-elevation-{1|2|3}`. Em classes: `bg-brand-500`, `text-signal-700`,
`font-display`, `shadow-elevation-2`. Motion em TypeScript: `duration.large`, `easing.enter`.

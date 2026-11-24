# BPM Guidelines — Accessibility & Do's/Don'ts

> Valores de tokens em [design.md](design.md). Especificação de componentes em [design-components.md](design-components.md).

## Accessibility

Meta: **WCAG 2.2 AA**. O axe roda nos testes E2E (`e2e/`) e bloqueia regressões.

### Contrast Requirements

| Requirement | Ratio |
|---|---|
| Texto normal (< 24px, ou < 19px em negrito) | 4.5:1 |
| Texto grande (≥ 24px, ou ≥ 19px em negrito) | 3:1 |
| Ícones, bordas de input, anéis de foco | 3:1 |

Pares aprovados da paleta oficial (medidos):

| Pair | Ratio | Status |
|---|---|---|
| `ink-950` sobre `ink-100` | 15.98:1 | ✅ qualquer texto |
| `white` sobre `brand-500` | 4.91:1 | ✅ texto normal — botão primário |
| `brand-500` sobre `white` | 4.91:1 | ✅ links e texto |
| `brand-500` sobre `ink-100` | 4.15:1 | ⚠️ só texto grande/ícones — use `brand-700` para texto |
| `brand-500` sobre `ink-950` | 3.85:1 | ⚠️ só texto grande/ícones — use `brand-300/400` para texto |
| `signal-500` sobre `white` | 3.87:1 | ⚠️ só decorativo ou texto ≥ 24px — use `signal-700` (5.70:1) |
| `signal-500` sobre `ink-950` | 4.88:1 | ✅ texto normal |
| `white` sobre `signal-500` | 3.87:1 | ❌ não usar em texto pequeno |
| `ink-600` sobre `ink-100` | 5.66:1 | ✅ texto secundário |
| `ink-400` sobre `ink-950` | 7.49:1 | ✅ texto secundário no escuro |

| Component | 3:1 Against |
|---|---|
| Borda de input (`ink-300` → foco `brand-500`) | Fundo do formulário |
| Anel de foco (`brand-400`) | Superfície e o próprio controle |
| Indicador de etapa (raia) | Fundo da seção |
| Checkbox de consentimento | Fundo do painel |

### Touch Targets

- Mínimo **44×44px** para qualquer alvo (botões `md` têm 44px; `lg` 56px).
- Botão flutuante: 56×56px, 24px das bordas, acima da barra de navegação do celular (`env(safe-area-inset-bottom)`).
- Espaço mínimo de 8px entre alvos adjacentes (chips, links do rodapé, botões do cartão).

### Keyboard Navigation

| Key | Action |
|---|---|
| Tab / Shift+Tab | Percorre links, botões, campos, itens do acordeão |
| Enter / Space | Ativa botão; abre/fecha item do acordeão |
| Esc | Fecha o menu mobile e devolve o foco ao botão do menu |
| ← / → | Navega no carrossel de projetos e de depoimentos (quando focado) |
| Primeiro Tab | "Pular para o conteúdo" |

### Assistive Technology

- Um único `h1` (título do hero); cada seção é `<section aria-labelledby>` com seu `h2`.
- Elementos geométricos são `aria-hidden` — nunca carregam informação.
- Links do WhatsApp têm nome acessível com o destino: "Falar no WhatsApp: tenho uma ideia de projeto" e abrem em nova aba com aviso (`(abre em nova aba)` em `sr-only`).
- Acordeão: `button[aria-expanded][aria-controls]` + região `role="region"`.
- Formulário: `label` visível em todo campo, `aria-invalid` + `aria-describedby` para erros, resumo de erro com foco, mensagem de sucesso em `role="status"`.
- Carrossel: `aria-roledescription="carrossel"`, slides com "N de M", sem autoplay.
- `prefers-reduced-motion`: sem deslocamento, só fade curto; nada essencial depende de animação.

## Gestures

| Gesture | Use |
|---|---|
| Tap | Ação principal (botões, cards de "Para quem", acordeão) |
| Scroll | Navegação da página; revela seções |
| Swipe horizontal | Carrossel de projetos (mobile) e de depoimentos, com `scroll-snap` |
| Long press | Não usado |
| Pinch | Livre (nunca bloquear zoom) |

## Content Design

- **Tom:** direto, próximo e seguro — "Você cuida do esporte. A gente cuida do projeto." Segunda pessoa (você/sua entidade).
- **Textos:** os do documento "Site bpmpro.com.br: esqueleto e conteúdo", centralizados em `src/lib/site-config.ts`.
- **Regras do documento (obrigatórias):**
  - Nunca prometer aprovação ("A aprovação é sempre do órgão público").
  - Não exibir valores, nomes de parlamentares ou partidos.
  - Números, depoimentos e CNPJ ocultos até a liberação (flags em `site-config.ts`).
  - Fotos de entidades só com autorização.
- **Capitalização:** *sentence case* em títulos e botões; MAIÚSCULAS só em eyebrows.
- **Comprimento de linha:** 60–75 caracteres no corpo (`max-w-prose` / `max-w-2xl`).
- **Botões:** verbo + objeto, 1–5 palavras ("Quero um diagnóstico gratuito", "Fale no WhatsApp").

## Do's and Don'ts

### Color
- **Do** usar `brand-500` como a cor da ação principal e dos grandes blocos de marca.
- **Do** usar `signal-500` em pequenas doses: traço sobre títulos, triângulos, números, marcadores.
- **Don't** usar vermelho em texto pequeno sobre branco ou cinza (use `signal-700`).
- **Don't** criar gradientes de cor; a marca usa áreas chapadas.
- **Don't** usar cores fora da paleta (exceto o verde do ícone do WhatsApp).

### Shape
- **Do** combinar formas retas (faixas, triângulos) com curvas pontuais (quarto de círculo), como nas peças do manual.
- **Don't** arredondar os elementos geométricos da marca.
- **Don't** usar mais de um raio diferente dentro do mesmo card.

### Elevation
- **Do** separar seções por cor de superfície (branco → cinza → preto).
- **Don't** empilhar sombras pesadas; elevação 3 é só para elementos flutuantes.

### Interaction
- **Do** manter o foco visível em todas as superfícies (anel `brand-400` com offset).
- **Do** ter um único botão primário por bloco.
- **Don't** depender só de hover para mostrar informação.

### Layout
- **Do** seguir a ordem do funil (topo → meio → fundo) definida no documento.
- **Do** alternar o alinhamento: hero e "Quem somos" à esquerda; Dores e títulos de grade centralizados.
- **Don't** colocar mais de 4 cards por linha.

### Typography
- **Do** usar a fonte display (New Science) só em títulos, números e rótulos.
- **Do** usar Montserrat para todo texto corrido e controles.
- **Don't** usar MAIÚSCULAS em títulos longos.
- **Don't** ir abaixo de 14px em texto de leitura.

### Motion
- **Do** usar `Reveal`/`Stagger` e os tokens de `src/lib/motion.ts`.
- **Do** animar só `opacity` e `transform`.
- **Don't** usar autoplay em carrosséis.
- **Don't** criar loops infinitos que distraiam do conteúdo (a faixa de modalidades é a única exceção e pausa com reduced-motion e no hover).

### Components
- **Do** abrir o WhatsApp com a mensagem pronta certa para cada ponto de contato.
- **Do** manter skeleton com o mesmo layout do conteúdo final.
- **Don't** exibir blocos com conteúdo de exemplo ("[X] projetos") em produção — use as flags de visibilidade.

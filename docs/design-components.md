# BPM Components

> Especificação dos 24 componentes do site, agrupados por fluxo.
> Tokens em [design.md](design.md). Regras e acessibilidade em [design-guidelines.md](design-guidelines.md).

## Actions

### Button

**Types:** Primary (fundo `brand-500`, texto branco) > Secondary (contorno: `ink-950` sobre claro, `white` sobre escuro/marca) > Ghost (só texto).
Altura 44px (`md`) / 56px (`lg`). Raio full. Label Montserrat 600, 15/16px. *Sentence case*.

| Property | Value |
|---|---|
| Contrast | 4.91:1 (branco sobre `brand-500`) |
| States | Rest, Hover (`brand-600`, sobe 2px), Pressed (`brand-800`, scale .97), Focus (anel `brand-400`), Disabled (60%), Loading (spinner + `aria-busy`) |
| Touch target | 44×44px min |
| Ícone | 20px à esquerda (ação) ou seta à direita (navegação) |

**Do:** um primário por bloco; verbo + objeto.
**Don't:** botão vermelho com texto branco pequeno; "Clique aqui".

---

### WhatsApp Link Button

Variante do botão que abre `https://wa.me/<número>?text=<mensagem codificada>` em nova aba. Ícone do WhatsApp à esquerda.
Na seção escura usa contorno branco (como "Fale conosco no WhatsApp" nas peças do manual).

| Property | Value |
|---|---|
| Mensagem | Uma por contexto (cabeçalho, hero, raias, cada card de "Para quem", dúvidas, flutuante) |
| Acessibilidade | Nome com o contexto + "(abre em nova aba)" em `sr-only` |
| Observabilidade | Evento `whatsapp_click` com o `context` (sem dados pessoais) |

**Do:** usar o builder `whatsappUrl(message)` de `src/lib/whatsapp.ts`.
**Don't:** montar a URL na mão em cada componente.

---

### Floating WhatsApp Button

Círculo de 56px, fixo no canto inferior direito (24px), fundo `ink-950` com ícone `#25d366`, elevação 3.
Entra com fade + subida depois de 1,2s de rolagem; tooltip "Fale no WhatsApp" no hover (desktop).
Mensagem: "Olá! Vim pelo site e quero saber como a BPM Pro pode ajudar a minha entidade."

---

### Link

Montserrat 500, `brand-500` sobre branco / `brand-300` sobre preto, sublinhado no hover (`underline-offset-4`).
No rodapé: `ink-400` → `white` no hover.

---

## Navigation

### Header (App Bar)

Fixo, 72px. Transparente sobre o hero escuro; após 24px de rolagem vira `white/90` com `backdrop-blur` e elevação 2.
Logo à esquerda (símbolo + "BPM Pro" no celular, logotipo completo no desktop), menu no centro, botão "Fale no WhatsApp" à direita.

| Property | Value |
|---|---|
| Itens | Serviços · Como funciona · Para quem · Projetos · Dúvidas · Contato |
| Item ativo | Traço `signal-500` de 2px sob o rótulo (scroll-spy) |
| Mobile | Hambúrguer → painel em tela cheia `ink-950`, itens em display 28px, Esc fecha |

---

### Skip Link

"Pular para o conteúdo" — primeiro foco da página, fundo `brand-500`, raio full.

---

### Footer

Fundo `ink-950`. Logotipo completo (versão clara), assinatura "Resultado comprovado, do edital à prestação de contas.",
colunas de links, redes sociais e linha legal (Brasil Projetos em Movimento · CNPJ oculto até a liberação · bpmpro.com.br).
Faixa geométrica de marca no topo (listras `brand-500` + triângulos `signal-500`).

---

## Containment

### Section

`<section id aria-labelledby>` com `scroll-margin-top: 88px`. Superfícies: clara, cinza (`ink-100`), escura (`ink-950`) ou marca (`brand-500`).
Ritmo `py-20 lg:py-28`.

---

### Section Heading

Eyebrow (display 12px MAIÚSCULAS, `brand-700` / `brand-300`) → traço vermelho 48×4px (`signal-500`, cresce da esquerda) → título h2 display 600 → descrição opcional (Body Large, `ink-600`).
Alinhamento `left` ou `center`.

---

### Pain Card (Dores)

Card branco sobre `ink-100`, raio md, padding 24–28px. Ícone 24px em quadrado `signal-500/10` com traço `signal-700`; título h3; frase `ink-600`.
Grade 1 → 2 → 4 colunas. Frase final abaixo, centralizada, Body Large em display.

---

### Service Card

Agrupados em três blocos rotulados **ANTES / DURANTE / SEMPRE** (rótulo display com índice 01/02/03 e linha de raia).
Card: ícone 24px `brand-500` em `brand-50`, nome (h4, display 600 18px), uma frase.

---

### Audience Card (Para quem)

Card clicável inteiro (link do WhatsApp com mensagem pronta), raio lg, fundo `ink-900` sobre seção escura, borda `ink-800`.
Número da etapa grande (display, `signal-500`), título, frase, rodapé "Conversar no WhatsApp →".
Hover: borda `brand-400`, sobe 4px; foco: anel `brand-400`.

---

### Differential Card

Ícone de traço 32px, título, frase. Fundo branco, borda `ink-200`, raio md.
Bloco de números abaixo (oculto por flag `showStats`).

---

### Project Card

Foto 4:3 (`LazyImage`), nome do projeto, modalidade (chip) e cidade/UF. Sem valores.
Grade 3 colunas no desktop; carrossel com `scroll-snap` no mobile. Oculto até haver projetos autorizados (`showProjects`); placeholder de marca no lugar da foto.

---

### Accordion (FAQ)

Item com borda inferior `ink-200`; pergunta Montserrat 600 17px + ícone "+" que gira 45°; resposta Body `ink-600`.
Altura animada com `AnimatePresence` (entrada 320ms, saída 30% mais rápida). Um item aberto por vez.

---

### Contact Panel

Seção `brand-500`: texto à esquerda (h2 branco, subtítulo, contatos WhatsApp/e-mail/endereço com ícones) e formulário à direita em painel branco, raio lg, elevação 3.
Mapa do escritório abaixo (iframe lazy, com título acessível).

---

### Digital Business Card (/cartao)

Página própria, centrada, máx. 420px. Topo `ink-950` com símbolo e nome; frase; lista de botões em pilha (WhatsApp, Ligar, E-mail, Instagram, LinkedIn, Site, Como chegar, Salvar contato).
"Salvar contato" baixa um `.vcf` (vCard 3.0) gerado em `/cartao/vcard`.

---

## Input

### Text Field

Label visível acima (Label 14/500), input 48px, raio sm, borda `ink-300`, foco `brand-500` + anel `brand-400/30`.
Erro: borda `signal-700`, mensagem 13px `signal-700` com ícone, `aria-invalid`.

---

### Select

Mesmo visual do Text Field, seta Lucide `ChevronDown`. Usado em Área e Etapa.

---

### Textarea

Mesmo visual, 4 linhas, contador opcional.

---

### Checkbox (Consentimento)

20px, raio 4px, marcado `brand-500`; label clicável com link para a Política de Privacidade. Obrigatório.

---

## Data Display

### Chip (Modalidade / Selo)

Altura 32px, raio full, padding 14px, Montserrat 500 14px. Claro: `ink-100` / `ink-950`; escuro: `ink-800` / `ink-100`.
Selos do hero: ícone de check `signal-500` + texto `ink-100`.

---

### Area Block

Ícone 32px, título display (Esporte, Cultura, Turismo, Projetos sociais), fundo alternando `brand-500` e `ink-950` (blocos de cor chapada).

---

### Lane Timeline (Como funciona)

Linha do tempo em "raias de pista": 7 etapas. Desktop: horizontal, raias separadas por linhas tracejadas brancas sobre `ink-950`, número da etapa em display `signal-500`.
Mobile: vertical, raia à esquerda. Etapas entram em sequência (stagger 80ms) e o progresso da raia avança com o scroll (`ScrollProgress` local).

---

### Testimonial

Citação até 3 linhas (display 20px), foto 48px redonda, nome, cargo e entidade. Carrossel sem autoplay. Oculto até termos depoimentos autorizados (`showTestimonials`).

---

### Brand Shapes

Decoração geométrica, sempre `aria-hidden`: `Stripes` (3–4 faixas horizontais), `Triangles` (grade de triângulos `signal-500`/`white`), `QuarterCircle` (`brand-500`), `RedRule` (traço 48×4px).

---

### Skeleton

Mesmo layout do conteúdo final; fundo `ink-200` (claro) / `ink-800` (escuro) com shimmer; pulso com reduced-motion.

---

## Feedback

### Form Status

Sucesso: painel `brand-50` com ícone de check `brand-700` e o texto "Recebemos seus dados! Nossa equipe vai falar com você pelo WhatsApp em breve." (`role="status"`).
Erro de envio: painel `signal-700/10` com texto `signal-700` e opção de falar pelo WhatsApp.

---

### Progress

`ScrollProgress` no topo (2px, `signal-500`). Botão em estado `loading` durante o envio.

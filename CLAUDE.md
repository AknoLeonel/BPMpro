# CLAUDE.md

Siga **[AGENTS.md](AGENTS.md)** — é a fonte única de regras deste repositório
(fluxo Issue → PR → Deploy, Motion System, observabilidade, qualidade e testes).

Resumo do essencial:
- Toda tarefa = **Issue no GitHub** (Correção / Melhoria / Nova função) antes de codar.
- Trabalhe em branch e entregue via **Pull Request com `Closes #N`** na descrição.
- Rode `pnpm check` (e `pnpm build && pnpm test:e2e` para mudanças de UI) antes de abrir o PR.

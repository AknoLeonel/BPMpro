/**
 * Conventional Commits + referência obrigatória à Issue no rodapé/assunto.
 * Ex.: "feat(contato): valida telefone (#12)"  ou rodapé "Refs #12".
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
    "references-empty": [1, "never"],
  },
  parserPreset: { parserOpts: { issuePrefixes: ["#"] } },
};

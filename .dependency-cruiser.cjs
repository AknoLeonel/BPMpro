/**
 * Contratos de arquitetura (arch-contract).
 * Camadas, de cima para baixo:  app → features → components → lib
 * Uma camada só pode depender das camadas ABAIXO dela.
 */
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Ciclos de dependência dificultam testes e tree-shaking.",
      from: {},
      to: { circular: true },
    },
    {
      name: "lib-is-foundation",
      severity: "error",
      comment: "src/lib é a base: não conhece UI, features ou rotas.",
      from: { path: "^src/lib" },
      to: { path: "^src/(components|features|app)" },
    },
    {
      name: "components-are-generic",
      severity: "error",
      comment: "Componentes compartilhados não dependem de features nem de rotas.",
      from: { path: "^src/components" },
      to: { path: "^src/(features|app)" },
    },
    {
      name: "features-do-not-know-routes",
      severity: "error",
      comment: "Features são montadas pelas rotas, nunca o contrário.",
      from: { path: "^src/features" },
      to: { path: "^src/app" },
    },
    {
      name: "features-only-touch-public-api",
      severity: "error",
      comment: "Uma feature só usa de outra o componente público (contact-form) ou o schema.",
      from: { path: "^src/features/([^/]+)/" },
      to: {
        path: "^src/features/([^/]+)/",
        pathNot: ["^src/features/$1/", "^src/features/[^/]+/(contact-form|schema)\\.tsx?$"],
      },
    },
    {
      name: "no-test-code-in-prod",
      severity: "error",
      from: { path: "^src", pathNot: "\\.test\\.tsx?$" },
      to: { path: "(\\.test\\.tsx?$|^tests/|^e2e/)" },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      from: {},
      to: { couldNotResolve: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "\\.next" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"],
    },
  },
};

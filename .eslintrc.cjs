module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", "coverage", "node_modules", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  plugins: ["react-refresh"],
  rules: {
    // Poprawki, które nie wymagają typów — obowiązują w .js/.jsx i .ts/.tsx.
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-var": "error",
    "no-alert": "error",
    // React 19 + hooki: propsy są już opisane typami TS.
    "react/prop-types": "off",
    // Ostrzeżenia są bezużyteczne przy `lint --max-warnings 0` — od razu błąd.
    "react-refresh/only-export-components": [
      "error",
      { allowConstantExport: true },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
  overrides: [
    {
      // Pliki TypeScript — dodawane stopniowo obok istniejących .js/.jsx.
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Typy bierzemy z najbliższego tsconfig (obsługuje też pliki spoza
        // "include", np. konfiguracje), bez ręcznego wskazywania projektu.
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { fixStyle: "separate-type-imports" },
        ],
        // Reguły wymagające informacji o typach (spełniają się na obecnym kodzie).
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-implied-eval": "error",

        // --- Świadomie wyłączone (obecny kod by je łamał) ---
        // Splash.tsx używa łańcucha .then() bez await.
        "@typescript-eslint/no-floating-promises": "off",
        // Metody klasowe przekazywane jako referencje (Game/Splash/AppView).
        "@typescript-eslint/unbound-method": "off",
      },
    },
    {
      // Konfiguracja Vite działa w środowisku Node.
      files: ["vite.config.ts"],
      env: { node: true },
    },
  ],
};

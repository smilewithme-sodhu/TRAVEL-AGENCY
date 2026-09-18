/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use ts-jest to transform TypeScript files — no Babel involved.
  preset: "ts-jest",

  // Node environment — this is a backend service, not a browser.
  testEnvironment: "node",

  // Point ts-jest at the server's own tsconfig so it uses CommonJS module
  // resolution (not the root project's ESM "type": "module" setting).
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/server/tsconfig.json",
        diagnostics: {
          // Surface real type errors as test failures — no silent skips.
          warnOnly: false,
        },
      },
    ],
  },

  // Only run files inside server/src — never touch the React frontend tests.
  testMatch: ["<rootDir>/server/src/**/__tests__/**/*.test.ts"],

  // Module file extensions: check .ts before .js.
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Coverage collection scoped strictly to the server source tree.
  collectCoverageFrom: [
    "server/src/**/*.ts",
    "!server/src/**/__tests__/**",
    "!server/src/**/*.d.ts",
  ],

  // Clear mocks between every test so jest-mock-extended state doesn't bleed.
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

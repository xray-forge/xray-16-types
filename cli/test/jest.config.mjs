/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  rootDir: "../..",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^xray16$": "<rootDir>/src/mocks/xray16-runtime.ts",
    "^xray16/lib$": "<rootDir>/src/lib/index.ts",
    "^xray16/macros$": "<rootDir>/src/macros.ts",
    "^xray16/mocks$": "<rootDir>/src/mocks/index.ts",
    "^xray16/mocks/xray16-runtime$": "<rootDir>/src/mocks/xray16-runtime.ts",
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/src/tsconfig.json" }],
  },
};

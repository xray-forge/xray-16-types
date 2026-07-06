/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  rootDir: "../..",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^xray16$": "<rootDir>/src/mocks/xray/xray16-runtime.ts",
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/src/tsconfig.json" }],
  },
};

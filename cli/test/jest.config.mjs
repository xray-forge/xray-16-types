/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  rootDir: "../..",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/src/tsconfig.json" }],
  },
};

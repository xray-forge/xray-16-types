import { describe, expect, it } from "@jest/globals";

import { createJestConfig } from "./create-jest-config";

describe("createJestConfig", () => {
  it("should provide xray defaults", () => {
    const config = createJestConfig();

    expect(config.preset).toBe("ts-jest");
    expect(config.testEnvironment).toBe("node");
    expect((config.moduleNameMapper as Record<string, string>)["^xray16$"]).toMatch(/xray16-runtime\.js$/);
    expect((config.setupFiles as Array<string>).some((it) => it.endsWith("setup.js"))).toBe(true);
  });

  it("should merge consumer overrides additively", () => {
    const config = createJestConfig({
      moduleNameMapper: { "^@/(.*)": "<rootDir>/src/$1" },
      setupFiles: ["./my-setup.ts"],
      roots: ["<rootDir>/tests"],
    });

    const mapper: Record<string, string> = config.moduleNameMapper as Record<string, string>;

    expect(mapper["^xray16$"]).toMatch(/xray16-runtime\.js$/);
    expect(mapper["^@/(.*)"]).toBe("<rootDir>/src/$1");
    expect(config.setupFiles as Array<string>).toContain("./my-setup.ts");
    expect(config.roots).toEqual(["<rootDir>/tests"]);
  });
});

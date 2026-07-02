import { transpile } from "./testing";

describe("inline_constants plugin imports cleanup", () => {
  it("should strip inlined bindings and drop requires of pure modules", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const MAX_VALUE = 255;

/** @inline */
export enum EColor {
  RED = "red",
}
`,
      "main.ts": `
import { EColor, MAX_VALUE } from "./constants";

export function get(): unknown {
  return [MAX_VALUE, EColor.RED];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('{255, "red"}');
    expect(lua["main.lua"]).not.toContain("require");
    // Tables are still emitted in the defining module:
    expect(lua["constants.lua"]).toContain('RED = "red"');
  });

  it("should keep requires when whole-object usages remain", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const detectors = { detector_simple: "detector_simple" } as const;
`,
      "main.ts": `
import { detectors } from "./constants";

export function all(): unknown {
  return detectors;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('require("constants")');
    expect(lua["main.lua"]).toContain("return detectors");
  });

  it("should keep requires of impure modules as side-effect imports", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const MAX_VALUE = 10;

export function sideEffect(): number {
  return 1;
}
`,
      "main.ts": `
import { MAX_VALUE } from "./constants";

export function get(): number {
  return MAX_VALUE;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("return 10");
    expect(lua["main.lua"]).toContain('require("constants")');
    expect(lua["main.lua"]).not.toContain("MAX_VALUE");
  });

  it("should keep untagged bindings and mixed imports", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const MAX_VALUE = 10;

export function compute(): number {
  return 2;
}
`,
      "main.ts": `
import { compute, MAX_VALUE } from "./constants";

export function get(): number {
  return MAX_VALUE + compute();
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("10 + compute");
    expect(lua["main.lua"]).toContain('require("constants")');
    expect(lua["main.lua"]).not.toContain("MAX_VALUE");
  });

  it("should keep bindings referenced by re-exports and shorthand properties", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const MAX_VALUE = 10;
`,
      "main.ts": `
import { MAX_VALUE } from "./constants";

export { MAX_VALUE };

export function get(): unknown {
  return { MAX_VALUE };
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('require("constants")');
    expect(lua["main.lua"]).toContain("MAX_VALUE");
  });

  it("should drop requires through pure barrel re-export chains", () => {
    const { lua, errors } = transpile({
      "enums.ts": `
/** @inline */
export enum EOne {
  FIRST = 1,
}
`,
      "barrel.ts": `
export * from "./enums";
`,
      "main.ts": `
import { EOne } from "./barrel";

export function get(): number {
  return EOne.FIRST;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("return 1");
    expect(lua["main.lua"]).not.toContain("require");
  });
});

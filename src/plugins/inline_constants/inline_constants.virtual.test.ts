import { transpile } from "./testing";

describe("inline_constants plugin virtual declarations handling", () => {
  it("should erase virtual objects and inline accesses across modules", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/**
 * @virtual
 */
export const medkits = {
  medkit: "medkit",
  medkit_army: "medkit_army",
} as const;
`,
      "main.ts": `
import { medkits } from "./constants";

export function pick(): string {
  return medkits.medkit_army;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('return "medkit_army"');
    expect(lua["main.lua"]).not.toContain("medkits");
    expect(lua["main.lua"]).not.toContain("require");
    expect(lua["constants.lua"]).not.toContain("medkits");
  });

  it("should erase virtual scalars and enums", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @virtual */
export const MAX_VALUE = 60 * 1000;

/** @virtual */
export enum EVirtual {
  FIRST = "first",
  SECOND = 2,
}
`,
      "main.ts": `
import { EVirtual, MAX_VALUE } from "./constants";

export function get(): unknown {
  return [MAX_VALUE, EVirtual.FIRST, EVirtual.SECOND];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('{60000, "first", 2}');
    expect(lua["main.lua"]).not.toContain("require");
    expect(lua["constants.lua"]).not.toContain("EVirtual");
    expect(lua["constants.lua"]).not.toContain("MAX_VALUE");
  });

  it("should expand virtual object spreads into emitted objects", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @virtual */
export const medkits = { medkit: "medkit", medkit_army: "medkit_army" } as const;
`,
      "main.ts": `
import { medkits } from "./constants";

/** @inline */
export const drugs = { ...medkits, antirad: "antirad" } as const;

export function keep(): unknown {
  return drugs;
}
`,
    });

    expect(errors).toEqual([]);
    // Virtual object declaration is erased, but spread is expanded into literal entries:
    expect(lua["main.lua"]).toContain('medkit = "medkit"');
    expect(lua["main.lua"]).toContain('medkit_army = "medkit_army"');
    expect(lua["main.lua"]).not.toContain('require("constants")');
    expect(lua["constants.lua"]).not.toContain("medkits");
  });

  it("should error when virtual declarations are referenced as values", () => {
    const { errors } = transpile({
      "constants.ts": `
/** @virtual */
export const detectors = { detector_simple: "detector_simple" } as const;
`,
      "main.ts": `
import { detectors } from "./constants";

export function all(): unknown {
  return detectors;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'detectors' is referenced as a value");
    expect(errors[0]).toContain("demote it to '@inline'");
  });

  it("should error for dynamic access of virtual enums", () => {
    const { errors } = transpile({
      "constants.ts": `
/** @virtual */
export enum EVirtual {
  FIRST = 1,
}
`,
      "main.ts": `
import { EVirtual } from "./constants";

export function reverse(id: number): unknown {
  return EVirtual[id];
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'EVirtual' is referenced as a value");
  });

  it("should error when virtual module contains impure statements", () => {
    const { errors } = transpile({
      "main.ts": `
/** @virtual */
export const values = { a: "a" } as const;

export function helper(): number {
  return 1;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("Modules with '@virtual' declarations may contain only");
  });

  it("should error on value re-exports of virtual declarations", () => {
    const { errors } = transpile({
      "constants.ts": `
/** @virtual */
export const values = { a: "a" } as const;
`,
      "barrel.ts": `
export { values } from "./constants";
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'values' is referenced as a value");
  });

  it("should allow type-only usage and declarations in virtual modules", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
import type { TAlias } from "./types";

/** @virtual */
export const values = { a: "a" } as const;

export type TValues = typeof values;

declare const ambient: TAlias;
`,
      "types.ts": `
export type TAlias = string;
`,
      "main.ts": `
import { values } from "./constants";

import type { TValues } from "./constants";

export function get(): TValues[keyof TValues] {
  return values.a;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('return "a"');
    expect(lua["main.lua"]).not.toContain("require");
  });
});

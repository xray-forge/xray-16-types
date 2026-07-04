import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline plugin virtual declarations handling", () => {
  it("should erase virtual objects and inline accesses across modules", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.pick(self)
    return "medkit_army"
end
return ____exports
`);
  });

  it("should erase virtual scalars and enums", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {60000, "first", 2}
end
return ____exports
`);
  });

  it("should expand virtual object spreads into emitted objects", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
---
-- @inline
____exports.drugs = __TS__ObjectAssign({medkit = "medkit", medkit_army = "medkit_army"}, {antirad = "antirad"})
function ____exports.keep(self)
    return ____exports.drugs
end
return ____exports
`);
  });

  it("should error when virtual declarations are referenced as values", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@virtual' declaration 'detectors' is referenced as a value and cannot be erased, demote it to '@inline' or make the reference computable on build time.",
    ]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____constants = require("constants")
local detectors = ____constants.detectors
function ____exports.all(self)
    return detectors
end
return ____exports
`);
  });

  it("should error for dynamic access of virtual enums", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@virtual' declaration 'EVirtual' is referenced as a value and cannot be erased, demote it to '@inline' or make the reference computable on build time.",
    ]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____constants = require("constants")
local EVirtual = ____constants.EVirtual
function ____exports.reverse(self, id)
    return EVirtual[id]
end
return ____exports
`);
  });

  it("should error when virtual module contains impure statements", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @virtual */
export const values = { a: "a" } as const;

export function helper(): number {
  return 1;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "Modules with '@virtual' declarations may contain only type-only imports, '@inline'/'@virtual' constants, constant enums, type aliases and interfaces.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.helper(self)
    return 1
end
return ____exports
`);
  });

  it("should error on value re-exports of virtual declarations", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "constants.ts": `
/** @virtual */
export const values = { a: "a" } as const;
`,
        "barrel.ts": `
export { values } from "./constants";
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@virtual' declaration 'values' is referenced as a value and cannot be erased, demote it to '@inline' or make the reference computable on build time.",
    ]);
    expect(lua["barrel.lua"]).toBe(`local ____exports = {}
do
    local ____constants = require("constants")
    ____exports.values = ____constants.values
end
return ____exports
`);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
  });

  it("should allow type-only usage and declarations in virtual modules", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return "a"
end
return ____exports
`);
    expect(lua["types.lua"]).toBe(`local ____exports = {}
return ____exports
`);
  });
});

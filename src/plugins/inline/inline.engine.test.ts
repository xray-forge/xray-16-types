import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

const XRAY16_TYPES: string = `
declare module "xray16" {
  export class stalker_ids {
    public static readonly action_dying: 1;
    public static readonly action_base: 4;
    public static readonly property_name: "generic";
  }

  export class thing {
    public readonly value: 5;
  }
}
`;

describe("inline plugin engine constants handling", () => {
  it("should substitute engine references instead of baking declared literal types", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "xray16.d.ts": XRAY16_TYPES,
        "ids.ts": `
import { stalker_ids } from "xray16";

/** @virtual */
export enum EActionId {
  DYING = stalker_ids.action_dying,
  CUSTOM = 10_000,
  SHIFTED = stalker_ids.action_base + 2,
}
`,
        "main.ts": `
import { EActionId } from "./ids";

export function get(): unknown {
  return [EActionId.DYING, EActionId.CUSTOM, EActionId.SHIFTED];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["ids.lua"]).toBe(`local ____exports = {}
require("xray16")
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {stalker_ids.action_dying, 10000, stalker_ids.action_base + 2}
end
return ____exports
`);
  });

  it("should substitute engine references in scalars and expression trees", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "xray16.d.ts": XRAY16_TYPES,
        "constants.ts": `
import { stalker_ids } from "xray16";

/** @virtual */
export const DYING_ID = stalker_ids.action_dying;

/** @inline */
export const DOUBLED = stalker_ids.action_base * 2;

/** @inline */
export const NEGATED = -stalker_ids.action_base;
`,
        "main.ts": `
import { DOUBLED, DYING_ID, NEGATED } from "./constants";

export function get(): unknown {
  return [DYING_ID, DOUBLED, NEGATED];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
local ____xray16 = require("xray16")
local stalker_ids = ____xray16.stalker_ids
---
-- @inline
____exports.DOUBLED = stalker_ids.action_base * 2
---
-- @inline
____exports.NEGATED = -stalker_ids.action_base
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {stalker_ids.action_dying, stalker_ids.action_base * 2, -stalker_ids.action_base}
end
return ____exports
`);
  });

  it("should substitute engine references in object properties and spread expansion", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "xray16.d.ts": XRAY16_TYPES,
        "constants.ts": `
import { stalker_ids } from "xray16";

/** @virtual */
export const base = { dying: stalker_ids.action_dying } as const;
`,
        "main.ts": `
import { base } from "./constants";

/** @inline */
export const merged = { ...base, custom: 5 } as const;

export function keep(): unknown {
  return merged;
}

export function pick(): number {
  return merged.dying;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
require("xray16")
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
---
-- @inline
____exports.merged = __TS__ObjectAssign({dying = stalker_ids.action_dying}, {custom = 5})
function ____exports.keep(self)
    return ____exports.merged
end
function ____exports.pick(self)
    return stalker_ids.action_dying
end
return ____exports
`);
  });

  it("should reject unsupported operations with engine references", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "xray16.d.ts": XRAY16_TYPES,
        "main.ts": `
import { stalker_ids } from "xray16";

/** @inline */
export const MODULO = stalker_ids.action_base % 2;

/** @inline */
export const CONCAT = "id_" + stalker_ids.action_base;

/** @inline */
export const BITWISE = stalker_ids.action_base & 1;
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' constant 'MODULO' must have a compile-time constant value, use a literal or an expression computable at build time.",
      "'@inline' constant 'CONCAT' must have a compile-time constant value, use a literal or an expression computable at build time.",
      "'@inline' constant 'BITWISE' must have a compile-time constant value, use a literal or an expression computable at build time.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____xray16 = require("xray16")
local stalker_ids = ____xray16.stalker_ids
---
-- @inline
____exports.MODULO = stalker_ids.action_base % 2
---
-- @inline
____exports.CONCAT = "id_" .. tostring(stalker_ids.action_base)
---
-- @inline
____exports.BITWISE = bit.band(stalker_ids.action_base, 1)
return ____exports
`);
  });

  it("should not qualify instance members and never bake their literal types", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "xray16.d.ts": XRAY16_TYPES,
        "main.ts": `
import { thing } from "xray16";

declare const instance: thing;

/** @inline */
export const VALUE = instance.value;
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' constant 'VALUE' must have a compile-time constant value, use a literal or an expression computable at build time.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.VALUE = instance.value
return ____exports
`);
  });

  it("should keep virtual modules with ambient engine imports pure", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "xray16.d.ts": XRAY16_TYPES,
        "constants.ts": `
import { stalker_ids } from "xray16";

/** @virtual */
export const NAME = stalker_ids.property_name;
`,
        "main.ts": `
import { NAME } from "./constants";

export function get(): string {
  return NAME;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
require("xray16")
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return stalker_ids.property_name
end
return ____exports
`);
  });
});

import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline plugin computed values handling", () => {
  it("should inline computed scalar constants folded at build time", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "constants.ts": `
declare const math: { readonly pi: number };

/** @inline */
export const MINUTE = 60 * 1000;

/** @inline */
export const HOUR = 60 * MINUTE;

/** @inline */
export const SECTION: string = "smart" + "_" + "terrain";

/** @inline */
export const DEGREE = math.pi / 180;
`,
        "main.ts": `
import { DEGREE, HOUR, MINUTE, SECTION } from "./constants";

export function get(): unknown {
  return [MINUTE, HOUR, SECTION, DEGREE];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.MINUTE = 60 * 1000
---
-- @inline
____exports.HOUR = 60 * 60000
---
-- @inline
____exports.SECTION = ("smart" .. "_") .. "terrain"
---
-- @inline
____exports.DEGREE = math.pi / 180
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {60000, 3600000, "smart_terrain", 0.017453292519943295}
end
return ____exports
`);
  });

  it("should inline computed object properties folded at build time", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export const timeouts = {
  flag: !false,
  name: "t" + "_" + "x",
  short: 15 * 1000,
} as const;

export function get(): unknown {
  return [timeouts.short, timeouts.name, timeouts.flag];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.timeouts = {flag = not false, name = ("t" .. "_") .. "x", short = 15 * 1000}
function ____exports.get(self)
    return {15000, "t_x", true}
end
return ____exports
`);
  });

  it("should inline template literals and constant cross references", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export enum EBase {
  PREFIX = 10,
}

/** @inline */
export const NEXT = EBase.PREFIX + 5;

/** @inline */
export const NAME = \`zone_\${"alpha"}_\${2}\`;

export function get(): unknown {
  return [NEXT, NAME];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.EBase = ____exports.EBase or ({})
____exports.EBase.PREFIX = 10
____exports.EBase[____exports.EBase.PREFIX] = "PREFIX"
---
-- @inline
____exports.NEXT = 10 + 5
---
-- @inline
____exports.NAME = (("zone_" .. "alpha") .. "_") .. 2
function ____exports.get(self)
    return {15, "zone_alpha_2"}
end
return ____exports
`);
  });

  it("should inline element access with build-time computable keys", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export const misc = { device_pda: "device_pda" } as const;

/** @inline */
export const excluded = { [misc.device_pda]: true } as const;

export function get(): boolean {
  return excluded[misc.device_pda];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.misc = {device_pda = "device_pda"}
---
-- @inline
____exports.excluded = {device_pda = true}
function ____exports.get(self)
    return true
end
return ____exports
`);
  });

  it("should reject not foldable computed values", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function runtimeValue(): number;

const mutable = { x: 1 };

/** @inline */
export const FROM_CALL = runtimeValue() * 2;

/** @inline */
export const NOT_FINITE = 1 / 0;

/** @inline */
export const FROM_MUTABLE = mutable.x + 1;

/** @inline */
export const FLOAT_CONCAT = "x" + 1 / 3;
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' constant 'FROM_CALL' must have a compile-time constant value, use a literal or an expression computable at build time.",
      "'@inline' constant 'NOT_FINITE' must have a compile-time constant value, use a literal or an expression computable at build time.",
      "'@inline' constant 'FROM_MUTABLE' must have a compile-time constant value, use a literal or an expression computable at build time.",
      "'@inline' constant 'FLOAT_CONCAT' must have a compile-time constant value, use a literal or an expression computable at build time.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local mutable = {x = 1}
---
-- @inline
____exports.FROM_CALL = runtimeValue(nil) * 2
---
-- @inline
____exports.NOT_FINITE = 1 / 0
---
-- @inline
____exports.FROM_MUTABLE = mutable.x + 1
---
-- @inline
____exports.FLOAT_CONCAT = "x" .. tostring(1 / 3)
return ____exports
`);
  });
});

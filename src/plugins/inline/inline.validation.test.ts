import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline plugin validation", () => {
  it("should not inline untagged declarations", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export const values = { a: "a" } as const;

export enum EUntagged {
  FIRST = "first",
}

export const UNTAGGED_SCALAR = 10;

export function get(): string {
  return values.a + EUntagged.FIRST + UNTAGGED_SCALAR;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
____exports.values = {a = "a"}
____exports.EUntagged = ____exports.EUntagged or ({})
____exports.EUntagged.FIRST = "first"
____exports.UNTAGGED_SCALAR = 10
function ____exports.get(self)
    return (____exports.values.a .. ____exports.EUntagged.FIRST) .. tostring(____exports.UNTAGGED_SCALAR)
end
return ____exports
`);
  });

  it("should error when tagged object spreads untagged object", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "weapons.ts": `
export const pistols = { wpn_pm: "wpn_pm" } as const;

/** @inline */
export const weapons = { ...pistols, wpn_knife: "wpn_knife" } as const;

export function keep(): unknown {
  return weapons;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' object 'weapons' property 'wpn_pm' is declared outside of '@inline' statements, mark the source declaration with '@inline' too.",
    ]);
    expect(lua["weapons.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
____exports.pistols = {wpn_pm = "wpn_pm"}
---
-- @inline
____exports.weapons = __TS__ObjectAssign({}, ____exports.pistols, {wpn_knife = "wpn_knife"})
function ____exports.keep(self)
    return ____exports.weapons
end
return ____exports
`);
  });

  it("should error when tagged object is missing as const assertion", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export const values = { a: "a" };

export function get(): string {
  return values.a;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual(["'@inline' object 'values' must use 'as const' assertion."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.values = {a = "a"}
function ____exports.get(self)
    return "a"
end
return ____exports
`);
  });

  it("should error when tagged declaration is not const", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export let value = 10;
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual(["'@inline' declarations must use 'const' keyword."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.value = 10
return ____exports
`);
  });

  it("should error when tagged declaration is not module-level", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function get(): number {
  /** @inline */
  const localValue = 10;

  return localValue;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual(["'@inline' declarations must be module-level statements."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    ---
    -- @inline
    local localValue = 10
    return 10
end
return ____exports
`);
  });

  it("should error when tagged scalar is not compile-time constant", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export const RUNTIME_VALUE: number = Date.now();
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' constant 'RUNTIME_VALUE' must have a compile-time constant value, use a literal or an expression computable at build time.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.RUNTIME_VALUE = Date:now()
return ____exports
`);
  });

  it("should error when tag is used on unsupported declarations", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export class Something {}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' and '@virtual' are supported only for enums, module-level 'const' declarations and functions.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local ____exports = {}
---
-- @inline
____exports.Something = __TS__Class()
local Something = ____exports.Something
Something.name = "Something"
function Something.prototype.____constructor(self)
end
return ____exports
`);
  });
});

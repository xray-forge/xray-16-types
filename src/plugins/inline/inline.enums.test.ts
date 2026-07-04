import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline plugin enums handling", () => {
  it("should inline tagged enum members and keep enum tables emitted", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "enums.ts": `
/**
 * @inline
 */
export enum EStringEnum {
  FIRST = "first",
  SECOND = "second",
}

/**
 * @inline
 */
export enum ENumericEnum {
  FIRST,
  SECOND,
  TENTH = 10,
  NEXT,
}
`,
        "main.ts": `
import { ENumericEnum, EStringEnum } from "./enums";

export function get(): unknown {
  return [EStringEnum.SECOND, ENumericEnum.NEXT, ENumericEnum["TENTH"]];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["enums.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.EStringEnum = EStringEnum or ({})
____exports.EStringEnum.FIRST = "first"
____exports.EStringEnum.SECOND = "second"
---
-- @inline
____exports.ENumericEnum = ENumericEnum or ({})
____exports.ENumericEnum.FIRST = 0
____exports.ENumericEnum[____exports.ENumericEnum.FIRST] = "FIRST"
____exports.ENumericEnum.SECOND = 1
____exports.ENumericEnum[____exports.ENumericEnum.SECOND] = "SECOND"
____exports.ENumericEnum.TENTH = 10
____exports.ENumericEnum[____exports.ENumericEnum.TENTH] = "TENTH"
____exports.ENumericEnum.NEXT = 11
____exports.ENumericEnum[____exports.ENumericEnum.NEXT] = "NEXT"
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {"second", 11, 10}
end
return ____exports
`);
  });

  it("should error when tagged enum has computed members", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
function computeValue(): number {
  return 10;
}

/** @inline */
export enum EComputed {
  STATIC = 1,
  DYNAMIC = computeValue(),
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual(["'@inline' enum member 'DYNAMIC' must have a compile-time constant value."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function computeValue(self)
    return 10
end
---
-- @inline
____exports.EComputed = EComputed or ({})
____exports.EComputed.STATIC = 1
____exports.EComputed[____exports.EComputed.STATIC] = "STATIC"
____exports.EComputed.DYNAMIC = computeValue(nil)
____exports.EComputed[____exports.EComputed.DYNAMIC] = "DYNAMIC"
return ____exports
`);
  });
});

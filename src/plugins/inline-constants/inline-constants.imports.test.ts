import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline-constants plugin imports cleanup", () => {
  it("should strip inlined bindings and drop requires of pure modules", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.MAX_VALUE = 255
---
-- @inline
____exports.EColor = EColor or ({})
____exports.EColor.RED = "red"
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {255, "red"}
end
return ____exports
`);
  });

  it("should keep requires when whole-object usages remain", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.detectors = {detector_simple = "detector_simple"}
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

  it("should keep requires of impure modules as side-effect imports", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.MAX_VALUE = 10
function ____exports.sideEffect(self)
    return 1
end
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
require("constants")
function ____exports.get(self)
    return 10
end
return ____exports
`);
  });

  it("should keep untagged bindings and mixed imports", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.MAX_VALUE = 10
function ____exports.compute(self)
    return 2
end
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____constants = require("constants")
local compute = ____constants.compute
function ____exports.get(self)
    return 10 + compute(nil)
end
return ____exports
`);
  });

  it("should keep bindings referenced by re-exports and shorthand properties", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.MAX_VALUE = 10
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____constants = require("constants")
local MAX_VALUE = ____constants.MAX_VALUE
____exports.MAX_VALUE = MAX_VALUE
function ____exports.get(self)
    return {MAX_VALUE = MAX_VALUE}
end
return ____exports
`);
  });

  it("should drop requires through pure barrel re-export chains", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["barrel.lua"]).toBe(`local ____exports = {}
do
    local ____export = require("enums")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
return ____exports
`);
    expect(lua["enums.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.EOne = EOne or ({})
____exports.EOne.FIRST = 1
____exports.EOne[____exports.EOne.FIRST] = "FIRST"
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return 1
end
return ____exports
`);
  });
});

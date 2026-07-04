import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline_constants plugin scalars handling", () => {
  it("should inline tagged scalar constants including namespace access", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "constants.ts": `
/** @inline */
export const MAX_VALUE = 255;

/** @inline */
export const MIN_OFFSET = -16;

/** @inline */
export const IS_ENABLED = true;

/** @inline */
export const DEFAULT_NAME = "default";
`,
        "main.ts": `
import * as constants from "./constants";

import { DEFAULT_NAME, IS_ENABLED, MAX_VALUE, MIN_OFFSET } from "./constants";

export function get(): unknown {
  return [MAX_VALUE, MIN_OFFSET, IS_ENABLED, DEFAULT_NAME];
}

export function getFromNamespace(): number {
  return constants.MAX_VALUE;
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
____exports.MIN_OFFSET = -16
---
-- @inline
____exports.IS_ENABLED = true
---
-- @inline
____exports.DEFAULT_NAME = "default"
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local constants = require("constants")
function ____exports.get(self)
    return {255, -16, true, "default"}
end
function ____exports.getFromNamespace(self)
    return 255
end
return ____exports
`);
  });
});

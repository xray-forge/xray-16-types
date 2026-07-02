import { transpile } from "./testing";

describe("inline_constants plugin scalars handling", () => {
  it("should inline tagged scalar constants including namespace access", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("255");
    expect(lua["main.lua"]).toMatch(/-\s*16/);
    expect(lua["main.lua"]).toContain("true");
    expect(lua["main.lua"]).toContain('"default"');
    expect(lua["main.lua"]).toContain("return 255");
    expect(lua["main.lua"]).not.toContain("return constants.MAX_VALUE");
  });
});

import { transpile } from "./testing";

describe("inline_constants plugin computed values handling", () => {
  it("should inline computed scalar constants folded on build time", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("60000");
    expect(lua["main.lua"]).toContain("3600000");
    expect(lua["main.lua"]).toContain('"smart_terrain"');
    expect(lua["main.lua"]).toContain("0.017453292519943295");
  });

  it("should inline computed object properties folded on build time", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("15000");
    expect(lua["main.lua"]).toContain('"t_x"');
    expect(lua["main.lua"]).toContain('{15000, "t_x", true}');
  });

  it("should inline template literals and constant cross references", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('{15, "zone_alpha_2"}');
  });

  it("should reject not foldable computed values", () => {
    const { errors } = transpile({
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
    });

    expect(errors).toHaveLength(4);
    expect(errors[0]).toContain("'FROM_CALL'");
    expect(errors[1]).toContain("'NOT_FINITE'");
    expect(errors[2]).toContain("'FROM_MUTABLE'");
    expect(errors[3]).toContain("'FLOAT_CONCAT'");
  });
});

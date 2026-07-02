import { transpile } from "./testing";

describe("inline_constants plugin enums handling", () => {
  it("should inline tagged enum members and keep enum tables emitted", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('"second"');
    expect(lua["main.lua"]).toContain("11");
    expect(lua["main.lua"]).toContain("10");
    expect(lua["main.lua"]).not.toContain("EStringEnum.SECOND");
    expect(lua["main.lua"]).not.toContain("ENumericEnum.NEXT");
    expect(lua["enums.lua"]).toContain('EStringEnum.FIRST = "first"');
    expect(lua["enums.lua"]).toContain("ENumericEnum.TENTH = 10");
  });

  it("should error when tagged enum has computed members", () => {
    const { errors } = transpile({
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
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'DYNAMIC' must have a compile-time constant value");
  });
});

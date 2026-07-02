import { transpile } from "./testing";

describe("inline_constants plugin validation", () => {
  it("should not inline untagged declarations", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("values.a");
    expect(lua["main.lua"]).toContain("EUntagged.FIRST");
    expect(lua["main.lua"]).toContain("UNTAGGED_SCALAR");
  });

  it("should error when tagged object spreads untagged object", () => {
    const { errors } = transpile({
      "weapons.ts": `
export const pistols = { wpn_pm: "wpn_pm" } as const;

/** @inline */
export const weapons = { ...pistols, wpn_knife: "wpn_knife" } as const;

export function keep(): unknown {
  return weapons;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'wpn_pm'");
    expect(errors[0]).toContain("mark the source declaration with '@inline'");
  });

  it("should error when tagged object is missing as const assertion", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export const values = { a: "a" };

export function get(): string {
  return values.a;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("object 'values' must use 'as const' assertion");
  });

  it("should error when tagged declaration is not const", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export let value = 10;
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("must use 'const' keyword");
  });

  it("should error when tagged declaration is not module-level", () => {
    const { errors } = transpile({
      "main.ts": `
export function get(): number {
  /** @inline */
  const localValue = 10;

  return localValue;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("must be module-level statements");
  });

  it("should error when tagged scalar is not compile-time constant", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export const RUNTIME_VALUE: number = Date.now();
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'RUNTIME_VALUE' must have a compile-time constant value");
  });

  it("should error when tag is used on unsupported declarations", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export class Something {}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("supported only for enums and module-level 'const' declarations");
  });
});

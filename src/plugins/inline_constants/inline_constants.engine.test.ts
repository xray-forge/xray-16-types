import { transpile } from "./testing";

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

describe("inline_constants plugin engine constants handling", () => {
  it("should substitute engine references instead of baking declared literal types", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("stalker_ids.action_dying");
    expect(lua["main.lua"]).toContain("10000");
    expect(lua["main.lua"]).toContain("stalker_ids.action_base + 2");
    expect(lua["main.lua"]).not.toContain("EActionId");
    expect(lua["main.lua"]).not.toContain('require("ids")');
    expect(lua["ids.lua"]).not.toContain("EActionId");
  });

  it("should substitute engine references in scalars and expression trees", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    // References are substituted, declared literal types are never baked:
    expect(lua["main.lua"]).toContain("{stalker_ids.action_dying, stalker_ids.action_base * 2, -stalker_ids.action_base}");
  });

  it("should substitute engine references in object properties and spread expansion", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("dying = stalker_ids.action_dying");
    expect(lua["main.lua"]).toContain("return stalker_ids.action_dying");
  });

  it("should reject unsupported operations with engine references", () => {
    const { errors } = transpile({
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
    });

    expect(errors).toHaveLength(3);
    expect(errors[0]).toContain("'MODULO'");
    expect(errors[1]).toContain("'CONCAT'");
    expect(errors[2]).toContain("'BITWISE'");
  });

  it("should not qualify instance members and never bake their literal types", () => {
    const { errors } = transpile({
      "xray16.d.ts": XRAY16_TYPES,
      "main.ts": `
import { thing } from "xray16";

declare const instance: thing;

/** @inline */
export const VALUE = instance.value;
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'VALUE' must have a compile-time constant value");
  });

  it("should keep virtual modules with ambient engine imports pure", () => {
    const { lua, errors } = transpile({
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
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("return stalker_ids.property_name");
    expect(lua["main.lua"]).not.toContain('require("constants")');
  });
});

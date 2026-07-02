import { transpile } from "./testing";

describe("inline_constants plugin objects handling", () => {
  it("should inline property and element access on tagged as-const objects across modules", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/**
 * List of medkits.
 *
 * @inline
 */
export const medkits = {
  medkit: "medkit",
  medkit_army: "medkit_army",
  "medkit-x": "medkit-x",
} as const;
`,
      "main.ts": `
import { medkits } from "./constants";

export function pick(): string {
  return medkits.medkit_army;
}

export function pickDashed(): string {
  return medkits["medkit-x"];
}

export function pickDynamic(key: keyof typeof medkits): string {
  return medkits[key];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('return "medkit_army"');
    expect(lua["main.lua"]).toContain('return "medkit-x"');
    expect(lua["main.lua"]).not.toContain("medkits.medkit_army");
    expect(lua["main.lua"]).toContain("medkits[key]");
    expect(lua["constants.lua"]).toContain('medkit_army = "medkit_army"');
  });

  it("should inline through spread merges of tagged objects", () => {
    const { lua, errors } = transpile({
      "weapons.ts": `
/** @inline */
export const pistols = { wpn_pm: "wpn_pm", wpn_fort: "wpn_fort" } as const;

/** @inline */
export const rifles = { wpn_ak74: "wpn_ak74" } as const;

/** @inline */
export const weapons = { ...pistols, ...rifles, wpn_knife: "wpn_knife" } as const;
`,
      "main.ts": `
import { weapons } from "./weapons";

export function get(): unknown {
  return [weapons.wpn_pm, weapons.wpn_ak74, weapons.wpn_knife];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('"wpn_pm"');
    expect(lua["main.lua"]).toContain('"wpn_ak74"');
    expect(lua["main.lua"]).toContain('"wpn_knife"');
    expect(lua["main.lua"]).not.toContain("weapons.wpn_pm");
  });

  it("should inline properties declared in tagged objects when accessed through untagged spreads", () => {
    const { lua, errors } = transpile({
      "main.ts": `
/** @inline */
export const medkits = { medkit: "medkit" } as const;

export const drugs = { ...medkits, antirad: "antirad" } as const;

export function get(): unknown {
  return [drugs.medkit, drugs.antirad];
}
`,
    });

    expect(errors).toEqual([]);
    // Value is declared inside tagged statement, so access through untagged spread is inlined:
    expect(lua["main.lua"]).toContain('"medkit"');
    expect(lua["main.lua"]).not.toContain("drugs.medkit");
    // Own property of untagged object is not inlined:
    expect(lua["main.lua"]).toContain("drugs.antirad");
  });

  it("should keep tables emitted and whole-object usages functional", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const detectors = { detector_simple: "detector_simple" } as const;
`,
      "main.ts": `
import { detectors } from "./constants";

export function all(): unknown {
  return detectors;
}

export function one(): string {
  return detectors.detector_simple;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("return detectors");
    expect(lua["main.lua"]).toContain('return "detector_simple"');
    expect(lua["constants.lua"]).toContain('detector_simple = "detector_simple"');
  });
});

import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline-constants plugin objects handling", () => {
  it("should inline property and element access on tagged as-const objects across modules", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "constants.ts": `
/** @inline */
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["constants.lua"]).toBe(`local ____exports = {}
---
-- @inline
____exports.medkits = {medkit = "medkit", medkit_army = "medkit_army", ["medkit-x"] = "medkit-x"}
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____constants = require("constants")
local medkits = ____constants.medkits
function ____exports.pick(self)
    return "medkit_army"
end
function ____exports.pickDashed(self)
    return "medkit-x"
end
function ____exports.pickDynamic(self, key)
    return medkits[key]
end
return ____exports
`);
  });

  it("should inline through spread merges of tagged objects", () => {
    const { errors, lua } = transpileWithPlugins(
      {
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
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.get(self)
    return {"wpn_pm", "wpn_ak74", "wpn_knife"}
end
return ____exports
`);
    expect(lua["weapons.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
---
-- @inline
____exports.pistols = {wpn_pm = "wpn_pm", wpn_fort = "wpn_fort"}
---
-- @inline
____exports.rifles = {wpn_ak74 = "wpn_ak74"}
---
-- @inline
____exports.weapons = __TS__ObjectAssign({}, ____exports.pistols, ____exports.rifles, {wpn_knife = "wpn_knife"})
return ____exports
`);
  });

  it("should inline properties declared in tagged objects when accessed through untagged spreads", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
export const medkits = { medkit: "medkit" } as const;

export const drugs = { ...medkits, antirad: "antirad" } as const;

export function get(): unknown {
  return [drugs.medkit, drugs.antirad];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local ____exports = {}
---
-- @inline
____exports.medkits = {medkit = "medkit"}
____exports.drugs = __TS__ObjectAssign({}, ____exports.medkits, {antirad = "antirad"})
function ____exports.get(self)
    return {"medkit", ____exports.drugs.antirad}
end
return ____exports
`);
  });

  it("should keep tables emitted and whole-object usages functional", () => {
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

export function one(): string {
  return detectors.detector_simple;
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
function ____exports.one(self)
    return "detector_simple"
end
return ____exports
`);
  });
});

import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

const xray16Declaration = `
declare module "xray16" {
  export const engineValue: number;
}
`;

describe("global_declarations_transform plugin", () => {
  it("should erase xray16 imports while keeping regular imports", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "local.ts": `
export const localValue = 2;
`,
        "main.ts": `
import { engineValue } from "xray16";

import { localValue } from "./local";

export const result = engineValue + localValue;
`,
        "xray16.d.ts": xray16Declaration,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["local.lua"]).toBe(`local ____exports = {}
____exports.localValue = 2
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____local = require("local")
local localValue = ____local.localValue
____exports.result = engineValue + localValue
return ____exports
`);
  });

  it("should erase namespace imports of xray16", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
import * as xr from "xray16";

export const value = xr.engineValue;
`,
        "xray16.d.ts": xray16Declaration,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
____exports.value = xr.engineValue
return ____exports
`);
  });

  it("should erase side-effect xray16 imports while keeping other side-effect imports", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
import "xray16";
import "./side";

export const value = 1;
`,
        "side.ts": `export const s = 2;`,
        "xray16.d.ts": xray16Declaration,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
require("side")
____exports.value = 1
return ____exports
`);
  });
});

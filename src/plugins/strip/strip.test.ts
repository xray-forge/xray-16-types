import { ENV_XR_NO_LUA_LOGS } from "../constants";
import { transpileWithPlugins } from "../testing";

import { createPlugin } from "./plugin";

describe("strip plugin", () => {
  describe("luaLogger", () => {
    const originalNoLuaLogs = process.env[ENV_XR_NO_LUA_LOGS];

    afterEach(() => {
      if (originalNoLuaLogs === undefined) {
        delete process.env[ENV_XR_NO_LUA_LOGS];
      } else {
        process.env[ENV_XR_NO_LUA_LOGS] = originalNoLuaLogs;
      }
    });

    it("should strip LuaLogger declarations and calls when luaLogger is enabled", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
declare class LuaLogger {
  public info(message: string): void;
}

declare function getLogger(): LuaLogger;

export function run(): number {
  const logger = getLogger();
  const kept = 1;

  logger.info("removed");

  return kept;
}
`,
        },
        { plugins: [createPlugin({ luaLogger: true })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    local kept = 1
    return kept
end
return ____exports
`);
    });

    it("should drop only the LuaLogger binding from a multi-declaration statement", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
declare class LuaLogger { public info(message: string): void; }
declare function getLogger(): LuaLogger;

export function run(): number {
  const logger = getLogger(), kept = 5;

  logger.info("x");

  return kept;
}
`,
        },
        { plugins: [createPlugin({ luaLogger: true })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    local kept = 5
    return kept
end
return ____exports
`);
    });

    it("should keep unrelated statements and only strip logger calls", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
declare class LuaLogger { public info(message: string): void; }
declare const console: { log(message: string): void };

export function run(): void {
  const logger = new LuaLogger();

  console.log("kept");
  logger.info("removed");
}
`,
        },
        { plugins: [createPlugin({ luaLogger: true })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    console:log("kept")
end
return ____exports
`);
    });

    it("should keep LuaLogger declarations and calls when luaLogger is disabled", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
declare class LuaLogger { public info(message: string): void; }
declare function getLogger(): LuaLogger;

export function run(): number {
  const logger = getLogger();

  logger.info("x");

  return 1;
}
`,
        },
        { plugins: [createPlugin({ luaLogger: false })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    local logger = getLogger(nil)
    logger:info("x")
    return 1
end
return ____exports
`);
    });

    it("should fall back to the env variable when luaLogger is unset", () => {
      process.env[ENV_XR_NO_LUA_LOGS] = "true";

      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
declare class LuaLogger { public info(message: string): void; }
declare function getLogger(): LuaLogger;

export function run(): number {
  const logger = getLogger();
  const kept = 1;

  logger.info("removed");

  return kept;
}
`,
        },
        { plugins: [createPlugin()] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    local kept = 1
    return kept
end
return ____exports
`);
    });
  });

  describe("engineImports", () => {
    const xray16Declaration = `
declare module "xray16" {
  export const engineValue: number;
}
`;

    it("should erase xray16 imports while keeping regular imports (default)", () => {
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
        { plugins: [createPlugin()] }
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

    it("should erase namespace and side-effect xray16 imports", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
import * as xr from "xray16";
import "xray16";
import "./side";

export const value = xr.engineValue;
`,
          "side.ts": `export const s = 2;`,
          "xray16.d.ts": xray16Declaration,
        },
        { plugins: [createPlugin({ engineImports: true })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
require("side")
____exports.value = xr.engineValue
return ____exports
`);
    });

    it("should keep xray16 imports when engineImports is disabled", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
import "xray16";

export const value = 1;
`,
          "xray16.d.ts": xray16Declaration,
        },
        { plugins: [createPlugin({ engineImports: false })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
require("xray16")
____exports.value = 1
return ____exports
`);
    });

    it("should erase imports and star re-exports of the xray16/alias subpath", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "alias.d.ts": `declare module "xray16/alias" {
  export type GameObject = number;
}`,
          "main.ts": `
import { GameObject } from "xray16/alias";

export * from "xray16/alias";

export const value: GameObject = 1;
`,
        },
        {
          plugins: [createPlugin({ engineImports: true })],
          compilerOptions: { noResolvePaths: ["xray16", "xray16/alias"] },
        }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
____exports.value = 1
return ____exports
`);
    });
  });
});

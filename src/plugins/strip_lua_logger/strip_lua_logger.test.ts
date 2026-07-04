import { ENV_XR_NO_LUA_LOGS } from "../constants";
import { transpileWithPlugins } from "../testing";

import stripLuaLoggerPlugin from "./plugin";

describe("strip_lua_logger plugin", () => {
  const originalNoLuaLogs = process.env[ENV_XR_NO_LUA_LOGS];

  afterEach(() => {
    if (originalNoLuaLogs === undefined) {
      delete process.env[ENV_XR_NO_LUA_LOGS];
    } else {
      process.env[ENV_XR_NO_LUA_LOGS] = originalNoLuaLogs;
    }
  });

  it("should strip LuaLogger declarations and calls when logging is disabled", () => {
    process.env[ENV_XR_NO_LUA_LOGS] = "true";

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
      { plugins: [stripLuaLoggerPlugin] }
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
    process.env[ENV_XR_NO_LUA_LOGS] = "true";

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
      { plugins: [stripLuaLoggerPlugin] }
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

  it("should keep unrelated statements and only strip logger calls when disabled", () => {
    process.env[ENV_XR_NO_LUA_LOGS] = "true";

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
      { plugins: [stripLuaLoggerPlugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    console:log("kept")
end
return ____exports
`);
  });

  it("should keep LuaLogger declarations and calls when logging is enabled", () => {
    process.env[ENV_XR_NO_LUA_LOGS] = "false";

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
      { plugins: [stripLuaLoggerPlugin] }
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
});

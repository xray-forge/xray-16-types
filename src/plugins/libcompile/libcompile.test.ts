import { deriveLibPaths } from "./emit";
import { plugin } from "./plugin";

describe("libcompile plugin", () => {
  it("should expose a plugin with beforeEmit and afterEmit hooks", () => {
    expect(typeof plugin.beforeEmit).toBe("function");
    expect(typeof plugin.afterEmit).toBe("function");
  });
});

describe("libcompile deriveLibPaths", () => {
  it("should map a node_modules lib source to a flat root bundle and rewrite the lua_modules require", () => {
    const paths = deriveLibPaths("/project/node_modules/xray16/lib/index.ts", "/project/target/gamedata", ".script");

    expect(paths.fromRequire).toBe('require("lua_modules.xray16.lib.index")');
    expect(paths.toRequire).toBe('require("xray_bundle")');
    expect(paths.bundlePath.replace(/\\/g, "/")).toBe("/project/target/gamedata/xray_bundle.script");
    expect(paths.luaModulesPath.replace(/\\/g, "/")).toBe(
      "/project/target/gamedata/lua_modules/xray16/lib/index.script"
    );
  });

  it("should handle Windows-style source paths", () => {
    const paths = deriveLibPaths("C:\\project\\node_modules\\xray16\\lib\\index.ts", "C:\\out", ".lua");

    expect(paths.fromRequire).toBe('require("lua_modules.xray16.lib.index")');
    expect(paths.luaModulesPath.replace(/\\/g, "/")).toBe("C:/out/lua_modules/xray16/lib/index.lua");
  });

  it("should honor the configured output extension", () => {
    const script = deriveLibPaths("/nm/node_modules/xray16/lib/index.ts", "/out", ".script");
    const lua = deriveLibPaths("/nm/node_modules/xray16/lib/index.ts", "/out", ".lua");

    expect(script.bundlePath.replace(/\\/g, "/")).toBe("/out/xray_bundle.script");
    expect(lua.bundlePath.replace(/\\/g, "/")).toBe("/out/xray_bundle.lua");
  });
});

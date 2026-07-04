import * as path from "node:path";

/**
 * Plugins are bundled one-by-one into a single self-contained CommonJS file each.
 * TypeScriptToLua loads them via `require("xray16/plugins/<name>")` and reads the default export.
 */
const PLUGINS = [
  "strip",
  "macros",
  "tracy",
  "optimize",
  "inline",
  "luabind",
];

// Inline everything local, keep third-party deps (typescript, typescript-to-lua) and node builtins external.
function external(id) {
  return !id.startsWith(".") && !path.isAbsolute(id);
}

function bundle(name, input) {
  return {
    input,
    external,
    platform: "node",
    output: {
      file: `plugins/${name}.js`,
      format: "cjs",
      minify: false,
    },
  };
}

export default [
  // Shared constants module, imported directly by consumers (e.g. `xray16/plugins/constants`).
  bundle("constants", "src/plugins/constants.ts"),
  ...PLUGINS.map((name) => bundle(name, `src/plugins/${name}/index.ts`)),
];

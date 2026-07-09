import * as path from "node:path";

import { dts } from "rolldown-plugin-dts";

/**
 * Plugins are bundled one-by-one into a single self-contained CommonJS file each.
 * TypeScriptToLua loads them via `require("xray16/plugins/<name>")` and reads the default export.
 *
 * `plugins/constants` is NOT bundled here — it is a zero-dependency module emitted (js + d.ts)
 * by the core tsc pass (`tsconfig.core.json`).
 *
 * Paths are relative to the project root, where npm scripts run.
 */
const PLUGINS = [
  "strip",
  "macros",
  "tracy",
  "optimize",
  "inline",
  "luabind",
  "libcompile",
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
      file: `target/pkg/xray16/plugins/${name}.js`,
      format: "cjs",
      minify: false,
    },
  };
}

// The typings are hand-written ambient declarations aggregated through side-effect imports.
// Tree-shaking MUST stay off, otherwise rolldown drops every augmentation body (nothing is "used")
// and emits an empty module.
function bundleDts(input, outDir, outName) {
  return {
    input,
    treeshake: false,
    plugins: [
      ...dts({ dtsInput: true, emitDtsOnly: true }),
      {
        name: "finalize-dts",
        renderChunk(code) {
          const body = code
            .replace(/^\/\/#(?:region|endregion).*\r?\n/gm, "")
            .replace(/(?:\r?\nexport\s*\{\s*\};?)*\s*$/, "");

          return `${body}\nexport {};\n`;
        },
      },
    ],
    output: {
      dir: outDir,
      entryFileNames: outName,
      format: "es",
    },
  };
}

export default [
  ...PLUGINS.map((name) => bundle(name, `src/plugins/${name}/index.ts`)),
  bundleDts("./src/types/index.d.ts", "./target/pkg/xray16", "index.d.ts"),
];

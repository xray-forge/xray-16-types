import * as path from "node:path";

import { dts } from "rolldown-plugin-dts";

// `xray16/lib` is authored as multiple source files under `src/lib` and shipped as a single `lib.js` +
// `lib.d.ts`. Only the `@inline` constants have runtime; the types erase.
//
// Paths are relative to the project root, where npm scripts run.
function external(id) {
  return !id.startsWith(".") && !path.isAbsolute(id);
}

export default [
  {
    input: "src/lib/index.ts",
    external,
    platform: "node",
    output: {
      file: "target/pkg/xray16/lib.js",
      format: "cjs",
      minify: false,
    },
  },
  {
    input: "target/tmp/lib/index.d.ts",
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
      dir: "target/pkg/xray16",
      entryFileNames: "lib.d.ts",
      format: "es",
    },
  },
];

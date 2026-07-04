import { dts } from "rolldown-plugin-dts";

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
  bundleDts("./src/types/index.d.ts", ".", "index.d.ts"),
  bundleDts("./src/plugins/macros/types.d.ts", "plugins", "macros.d.ts"),
];

import { dts } from "rolldown-plugin-dts";

// The engine typings are hand-written ambient `declare module "xray16"` augmentations aggregated
// through side-effect imports in `index.d.ts`. Tree-shaking MUST stay off, otherwise rolldown drops
// every augmentation body (nothing is "used") and emits an empty module.
export default {
  input: "./src/types/index.d.ts",
  treeshake: false,
  plugins: [
    ...dts({ dtsInput: true, emitDtsOnly: true }),
    {
      name: "finalize-dts",
      renderChunk(code) {
        const stripped = code.replace(/^\/\/#(?:region|endregion).*\r?\n/gm, "").replace(/\s+$/, "");

        return `${stripped}\nexport {};\n`;
      },
    },
  ],
  output: {
    dir: ".",
    entryFileNames: "xray16.d.ts",
    format: "es",
  },
};

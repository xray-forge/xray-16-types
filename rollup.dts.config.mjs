import { dts } from "rollup-plugin-dts";

export default {
  input: "./types/index.d.ts",
  output: {
    file: "./xray16.d.ts",
    footer: "export {};",
    format: "es",
  },
  plugins: [dts()],
};
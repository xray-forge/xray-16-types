import * as path from "node:path";

/**
 * Path suffix that identifies the `xray16/lib` entry source file in the program.
 */
export const LIB_SOURCE_SUFFIX: string = path.normalize("xray16/lib/index.ts");

/**
 * Flat module name for the emitted bundle, placed at the output root alongside `lualib_bundle`.
 */
export const BUNDLE_NAME: string = "xray_bundle";

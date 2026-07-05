import * as path from "node:path";

export const PROJECT_ROOT: string = path.resolve(__dirname, "../..");
export const TARGET_ROOT: string = path.resolve(PROJECT_ROOT, "target");
export const PKG_ROOT: string = path.resolve(TARGET_ROOT, "pkg/xray16");
export const SRC_ROOT: string = path.resolve(PROJECT_ROOT, "src");
export const TYPEDEFS_ROOT: string = path.resolve(PROJECT_ROOT, "typedefs");

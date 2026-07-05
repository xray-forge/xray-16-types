import * as path from "node:path";

import { BUNDLE_NAME } from "./constants";

/**
 * Emit paths and require rewrite for the lib bundle, derived purely from the source path.
 */
export interface ILibPaths {
  /** Output path of the flat root bundle, e.g. `<outDir>/xray_bundle.script`. */
  bundlePath: string;
  /** Path of tstl's stray `lua_modules/...` copy to remove. */
  luaModulesPath: string;
  /** The `require("lua_modules....")` string tstl generates for the lib. */
  fromRequire: string;
  /** The `require("xray_bundle")` string it is rewritten to. */
  toRequire: string;
}

/**
 * Normalize path separators to forward slashes.
 *
 * @param value - Path to normalize.
 * @returns Path with forward slashes.
 */
export function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, "/");
}

/**
 * Derive the bundle output path, the stray `lua_modules` copy path, and the require rewrite from the lib
 * source path. Pure — depends only on its arguments.
 *
 * @param sourceFileName - Absolute path of the lib source file (under `node_modules`).
 * @param outDir - Resolved output directory.
 * @param extension - Configured Lua output extension (e.g. `.script`).
 * @returns The derived paths and require strings.
 */
export function deriveLibPaths(sourceFileName: string, outDir: string, extension: string): ILibPaths {
  const segments: Array<string> = normalizeSlashes(sourceFileName).split("node_modules/");
  const nodeModulesRelative: string = (segments[segments.length - 1] as string).replace(/\.tsx?$/, "");

  return {
    bundlePath: path.join(outDir, `${BUNDLE_NAME}${extension}`),
    luaModulesPath: path.join(outDir, "lua_modules", `${nodeModulesRelative}${extension}`),
    // tstl maps a node_modules dependency to a `lua_modules.<pkg>....` require; rewrite it to the flat bundle.
    fromRequire: `require("${`lua_modules/${nodeModulesRelative}`.replace(/\//g, ".")}")`,
    toRequire: `require("${BUNDLE_NAME}")`,
  };
}

import * as fs from "node:fs";
import * as path from "node:path";

import { type ILibContext } from "./context";

/**
 * Remove tstl's stray `lua_modules/...` copy of the lib (all requires now point at the flat root bundle)
 * and prune the directories it leaves empty, up to but not including the output root.
 *
 * @param context - Resolved lib context.
 */
export function removeStrayLuaModules(context: ILibContext): void {
  if (!fs.existsSync(context.luaModulesPath)) {
    return;
  }

  fs.rmSync(context.luaModulesPath, { force: true });

  const stop: string = path.normalize(context.outDir);
  let directory: string = path.dirname(context.luaModulesPath);

  while (path.normalize(directory) !== stop && fs.existsSync(directory) && fs.readdirSync(directory).length === 0) {
    fs.rmdirSync(directory);
    directory = path.dirname(directory);
  }
}

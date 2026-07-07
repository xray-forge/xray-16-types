import * as path from "node:path";

import type * as ts from "typescript";
import { type EmitHost } from "typescript-to-lua";
import { createPrinter } from "typescript-to-lua/dist/LuaPrinter";
import { createVisitorMap, transformSourceFile } from "typescript-to-lua/dist/transformation";
import { type EmitFile } from "typescript-to-lua/dist/transpilation/utils";

import { plugin as inlinePlugin } from "../../inline/plugin";
import { createPlugin as createMacrosPlugin } from "../../macros/plugin";
import { createPlugin as createStripPlugin } from "../../strip/plugin";

import { type ILibContext } from "./context";

/**
 * Transpile the lib source and append it to the emit plan as the flat root bundle, rewriting every
 * generated `lua_modules....` require to point at it.
 *
 * @param context - Resolved lib context.
 * @param program - TypeScript program.
 * @param emitHost - Emit host used by the printer.
 * @param result - Emit plan to mutate (rewritten requires, appended bundle).
 */
export function emitLibBundle(
  context: ILibContext,
  program: ts.Program,
  emitHost: EmitHost,
  result: Array<EmitFile>
): void {
  // Guard against double emission if another pass already produced the bundle.
  if (result.some((file) => path.normalize(file.outputPath) === path.normalize(context.bundlePath))) {
    return;
  }

  for (const file of result) {
    if (file.code.includes(context.fromRequire)) {
      file.code = file.code.split(context.fromRequire).join(context.toRequire);
    }
  }

  // The bundle is transpiled in isolation, so it does not see the macros/inline plugins from the consumer build.
  // Re-apply them here so lib-internal `@inline` folds (`MAX_U32` -> `4294967295`, inline calls) and `$` macros
  // (`$isNotNil` -> `~= nil`) match the main transform.
  const inlineVisitors = inlinePlugin.visitors;
  const macrosVisitors = createMacrosPlugin({ buildTimestamp: false }).visitors;
  // Apply the strip plugin so engine-module imports (`xray16`) are dropped:
  const stripVisitors = createStripPlugin({ engineImports: true, luaLogger: false }).visitors;

  const { file } = transformSourceFile(
    program,
    context.libFile,
    createVisitorMap([inlineVisitors, macrosVisitors, stripVisitors].filter((visitors) => visitors !== undefined))
  );

  const printed = createPrinter([])(program, emitHost, context.libFile.fileName, file);

  result.push({ code: printed.code, outputPath: context.bundlePath, sourceMap: printed.sourceMap, sourceFiles: [] });
}

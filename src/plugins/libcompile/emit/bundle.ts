import * as path from "node:path";

import type * as ts from "typescript";
import { type EmitHost } from "typescript-to-lua";
import { createPrinter } from "typescript-to-lua/dist/LuaPrinter";
import { createVisitorMap, transformSourceFile } from "typescript-to-lua/dist/transformation";
import { type EmitFile } from "typescript-to-lua/dist/transpilation/utils";

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

  // Apply the strip plugin so engine-module imports (`xray16`) are dropped:
  const stripVisitors = createStripPlugin({ engineImports: true, luaLogger: false }).visitors;

  const { file } = transformSourceFile(
    program,
    context.libFile,
    createVisitorMap(stripVisitors ? [stripVisitors] : [])
  );

  const printed = createPrinter([])(program, emitHost, context.libFile.fileName, file);

  result.push({ code: printed.code, outputPath: context.bundlePath, sourceMap: printed.sourceMap, sourceFiles: [] });
}

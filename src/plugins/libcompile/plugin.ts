import type * as ts from "typescript";
import { type CompilerOptions, type EmitHost, type Plugin } from "typescript-to-lua";
import { type EmitFile } from "typescript-to-lua/dist/transpilation/utils";

import { emitLibBundle, type ILibContext, removeStrayLuaModules, resolveLibContext } from "./emit";

/**
 * Emits the `xray16/lib` runtime module when a consumer resolves it to TypeScript source.
 * No-op when the lib is consumed as a prebuilt `.lua`/`.d.ts` (its source is not in the program).
 */
export const plugin: Plugin = {
  beforeEmit(program: ts.Program, options: CompilerOptions, emitHost: EmitHost, result: Array<EmitFile>): void {
    const context: ILibContext | null = resolveLibContext(program, options);

    if (context !== null) {
      emitLibBundle(context, program, emitHost, result);
    }
  },
  afterEmit(program: ts.Program, options: CompilerOptions): void {
    const context: ILibContext | null = resolveLibContext(program, options);

    if (context !== null) {
      removeStrayLuaModules(context);
    }
  },
};

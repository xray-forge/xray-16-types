import * as ts from "typescript";
import * as tstl from "typescript-to-lua";
import { createEmitOutputCollector } from "typescript-to-lua/dist/transpilation/output-collector";

import plugin from "./plugin";

const { createVirtualProgram } = tstl as unknown as {
  createVirtualProgram: (files: Record<string, string>, options: tstl.CompilerOptions) => ts.Program;
};

export interface ITranspileResult {
  lua: Record<string, string>;
  errors: Array<string>;
}

/**
 * Transpile virtual project with inline constants plugin enabled.
 *
 * @param files - Map of file names to typescript sources.
 * @returns Map of emitted lua files and error diagnostic messages.
 */
export function transpile(files: Record<string, string>): ITranspileResult {
  const options: tstl.CompilerOptions = {
    luaTarget: tstl.LuaTarget.LuaJIT,
    luaLibImport: tstl.LuaLibImportKind.Require,
    noHeader: true,
    noResolvePaths: ["xray16"],
    skipLibCheck: true,
    strict: true,
  };

  const program: ts.Program = createVirtualProgram(files, options);
  const collector = createEmitOutputCollector();
  const { diagnostics } = new tstl.Transpiler().emit({ program, plugins: [plugin], writeFile: collector.writeFile });

  const lua: Record<string, string> = {};

  for (const file of collector.files) {
    lua[file.outPath.replace(/\\/g, "/").split("/").pop() as string] = file.lua ?? "";
  }

  return {
    lua,
    errors: [...ts.getPreEmitDiagnostics(program), ...diagnostics]
      .filter((it) => it.category === ts.DiagnosticCategory.Error)
      .map((it) => ts.flattenDiagnosticMessageText(it.messageText, "\n")),
  };
}

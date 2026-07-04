import * as ts from "typescript";
import * as tstl from "typescript-to-lua";
import { type Plugin } from "typescript-to-lua";
import { createEmitOutputCollector } from "typescript-to-lua/dist/transpilation/output-collector";

const { createVirtualProgram } = tstl as unknown as {
  createVirtualProgram: (files: Record<string, string>, options: tstl.CompilerOptions) => ts.Program;
};

export interface ITranspileResult {
  lua: Record<string, string>;
  errors: Array<string>;
}

export interface ITranspileOptions {
  compilerOptions?: Partial<tstl.CompilerOptions>;
  plugins?: Array<Plugin>;
}

/**
 * Transpile virtual project with provided TypeScriptToLua plugins enabled.
 *
 * @param files - Map of file names to TypeScript sources.
 * @param options - Transpile options.
 * @returns Map of emitted Lua files and error diagnostic messages.
 */
export function transpileWithPlugins(files: Record<string, string>, options: ITranspileOptions = {}): ITranspileResult {
  const compilerOptions: tstl.CompilerOptions = {
    experimentalDecorators: true,
    luaTarget: tstl.LuaTarget.LuaJIT,
    luaLibImport: tstl.LuaLibImportKind.Require,
    noHeader: true,
    noResolvePaths: ["xray16"],
    skipLibCheck: true,
    strict: true,
    ...options.compilerOptions,
  };

  const program: ts.Program = createVirtualProgram(files, compilerOptions);
  const collector = createEmitOutputCollector();
  const { diagnostics } = new tstl.Transpiler().emit({
    plugins: options.plugins ?? [],
    program,
    writeFile: collector.writeFile,
  });

  const lua: Record<string, string> = {};

  for (const file of collector.files) {
    lua[file.outPath.replace(/\\/g, "/").split("/").pop() as string] = file.lua ?? "";
  }

  return {
    errors: [...ts.getPreEmitDiagnostics(program), ...diagnostics]
      .filter((it) => it.category === ts.DiagnosticCategory.Error)
      .map((it) => ts.flattenDiagnosticMessageText(it.messageText, "\n")),
    lua,
  };
}

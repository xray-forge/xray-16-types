import * as path from "node:path";

import type * as ts from "typescript";
import { type CompilerOptions } from "typescript-to-lua";

import { LIB_SOURCE_SUFFIX } from "./constants";
import { deriveLibPaths, type ILibPaths } from "./paths";

/**
 * Everything the plugin needs about the resolved lib module for one emit run.
 */
export interface ILibContext extends ILibPaths {
  /** The `xray16/lib` entry source file found in the program. */
  libFile: ts.SourceFile;
  /** Resolved output directory. */
  outDir: string;
}

/**
 * Resolve the lib context, or null when the lib source is not in the program (the lib is consumed as a
 * prebuilt artifact) or no output directory is configured.
 *
 * @param program - TypeScript program.
 * @param options - Tstl compiler options.
 * @returns The lib context, or null when the plugin should be a no-op.
 */
export function resolveLibContext(program: ts.Program, options: CompilerOptions): ILibContext | null {
  const libFile: ts.SourceFile | undefined = program
    .getSourceFiles()
    .find((file) => path.normalize(file.fileName).endsWith(LIB_SOURCE_SUFFIX));

  if (libFile === undefined || options.outDir === undefined) {
    return null;
  }

  return {
    libFile,
    outDir: options.outDir,
    ...deriveLibPaths(libFile.fileName, options.outDir, options.extension ?? ".lua"),
  };
}

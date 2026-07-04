import { transpileWithPlugins, type ITranspileResult } from "../testing";

import plugin from "./plugin";

export type { ITranspileResult };

/**
 * Transpile virtual project with inline constants plugin enabled.
 *
 * @param files - Map of file names to typescript sources.
 * @returns Map of emitted lua files and error diagnostic messages.
 */
export function transpile(files: Record<string, string>): ITranspileResult {
  return transpileWithPlugins(files, { plugins: [plugin] });
}

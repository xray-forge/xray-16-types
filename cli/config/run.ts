import { spawn } from "node:child_process";
import * as path from "node:path";

import { PROJECT_ROOT } from "./build.constants";

/**
 * Run a build tool from `node_modules/.bin` in the project root, streaming its output.
 *
 * @param command - Full shell command; binaries resolve through PATH (`.bin` is prepended, matching npm
 *   script behavior) and paths are relative to the project root. Must not need shell escaping.
 * @returns Promise resolving on zero exit code, rejecting otherwise.
 */
export function run(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, {
      cwd: PROJECT_ROOT,
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        PATH: `${path.resolve(PROJECT_ROOT, "node_modules/.bin")}${path.delimiter}${process.env["PATH"] ?? ""}`,
      },
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`'${command}' exited with code ${code}.`));
      }
    });
  });
}

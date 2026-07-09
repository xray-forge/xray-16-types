import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

import { PKG_ROOT, PROJECT_ROOT, SRC_ROOT, TARGET_ROOT, TYPEDEFS_ROOT } from "../config/build.constants";

import { mergeLib } from "./lib-bundle";

/**
 * Single entry point orchestrating the whole package build.
 *
 * Phase 1:
 *   - rolldown: self-contained CommonJS bundle per tstl plugin + bundled ambient `index.d.ts`
 *   - tsc core: `macros`, `alias`, `mocks`, `plugins/constants` (js + d.ts straight from `src`)
 * phase 2: `lib` — merge `src/lib` into one generated module (tstl single-file requirement),
 *   then compile it against the built `alias`/`macros` declarations
 * phase 3: `testing` — compiles against the built `lib`/`macros`/`mocks` declarations
 * phase 4: stage manifest, docs, typedefs, and lib source; verify required artifacts exist.
 */

/**
 * Build artifacts that every build must have emitted into the staged package before it can ship.
 */
const REQUIRED_ARTIFACTS: Array<string> = [
  "index.d.ts",
  "macros.js",
  "macros.d.ts",
  "alias.js",
  "alias.d.ts",
  "lib",
  "plugins",
  "plugins/constants.js",
  "plugins/constants.d.ts",
  "mocks",
  "testing",
];

/**
 * Run a build tool from `node_modules/.bin` in the project root, streaming its output.
 *
 * @param command - Full shell command; binaries resolve through PATH (`.bin` is prepended, matching npm
 *   script behavior) and paths are relative to the project root. Must not need shell escaping.
 * @returns Promise resolving on zero exit code, rejecting otherwise.
 */
function run(command: string): Promise<void> {
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

function verifyBuildArtifacts(): void {
  const missing: Array<string> = REQUIRED_ARTIFACTS.filter((it) => !fs.existsSync(path.resolve(PKG_ROOT, it)));

  if (missing.length > 0) {
    throw new Error(`Build artifacts missing in target/pkg/xray16: ${missing.join(", ")}.`);
  }
}

function stagePluginReadmes(): void {
  const pluginsSrcRoot: string = path.resolve(SRC_ROOT, "plugins");

  for (const entry of fs.readdirSync(pluginsSrcRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const readmePath: string = path.resolve(pluginsSrcRoot, entry.name, "README.md");

    if (fs.existsSync(readmePath)) {
      const destinationDir: string = path.resolve(PKG_ROOT, "plugins", entry.name);

      fs.mkdirSync(destinationDir, { recursive: true });
      fs.copyFileSync(readmePath, path.resolve(destinationDir, "README.md"));
    }
  }
}

/**
 * Stage the merged `xray16/lib` TypeScript source next to its declarations.
 */
function stageLibSource(): void {
  const merged: string = path.resolve(TARGET_ROOT, "tmp/lib/index.ts");

  if (!fs.existsSync(merged)) {
    throw new Error(`Merged lib source missing at ${merged}.`);
  }

  fs.copyFileSync(merged, path.resolve(PKG_ROOT, "lib", "index.ts"));
}

function stagePackage(): void {
  verifyBuildArtifacts();

  stageLibSource();

  fs.copyFileSync(path.resolve(SRC_ROOT, "package.json"), path.resolve(PKG_ROOT, "package.json"));
  fs.copyFileSync(path.resolve(PROJECT_ROOT, "README.md"), path.resolve(PKG_ROOT, "README.md"));
  fs.copyFileSync(path.resolve(PROJECT_ROOT, "LICENSE"), path.resolve(PKG_ROOT, "LICENSE"));

  fs.cpSync(TYPEDEFS_ROOT, path.resolve(PKG_ROOT, "typedefs"), { recursive: true });

  stagePluginReadmes();
}

async function buildPackage(): Promise<void> {
  console.log("Clean:", TARGET_ROOT);
  // Retries are required on Windows, where antivirus/indexer handles briefly hold EPERM locks (rimraf does the same).
  fs.rmSync(TARGET_ROOT, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });

  console.log("Phase 1: plugins + typedef bundles (rolldown), core modules (tsc)");
  await Promise.all([run("rolldown -c cli/build/rolldown.config.mjs"), run("tsc -p cli/build/tsconfig.core.json")]);

  console.log("Phase 2: lib (merge + tsc)");
  mergeLib();
  await run("tsc -p cli/build/tsconfig.lib.json");

  console.log("Phase 3: testing (tsc)");
  await run("tsc -p cli/build/tsconfig.testing.json");

  console.log("Phase 4: stage package");
  stagePackage();

  console.log(`Staged package: ${PKG_ROOT}`);
}

if (require.main === module) {
  buildPackage().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

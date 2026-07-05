import * as fs from "node:fs";
import * as path from "node:path";

import { PKG_ROOT, PROJECT_ROOT, SRC_ROOT, TARGET_ROOT, TYPEDEFS_ROOT } from "../config/build.constants";

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
  "mocks",
];

function verifyBuildArtifacts(): void {
  const missing: Array<string> = REQUIRED_ARTIFACTS.filter((it) => !fs.existsSync(path.resolve(PKG_ROOT, it)));

  if (missing.length > 0) {
    throw new Error(`Build artifacts missing in target/pkg/xray16: ${missing.join(", ")}. Run the build first.`);
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
    throw new Error(`Merged lib source missing at ${merged}. Run 'build:lib' first.`);
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

if (require.main === module) {
  try {
    stagePackage();

    console.log(`Staged package: ${PKG_ROOT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

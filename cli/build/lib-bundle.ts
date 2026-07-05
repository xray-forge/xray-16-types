import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Merges the multi-file `src/lib` source into a single generated module at `target/tmp/lib/index.ts`.
 *
 * Paths are relative to the project root, where npm scripts run.
 */
const LIB_SRC: string = path.resolve("src/lib");
const OUT_DIR: string = path.resolve("target/tmp/lib");
const OUT_FILE: string = path.join(OUT_DIR, "index.ts");

const HEADER: string = `/**
 * GENERATED — do not edit. Produced by cli/build/lib-bundle.ts from src/lib/*.ts.
 *
 * Single-module merge of the multi-file lib source so tstl emits one self-contained \`index.lua\`.
 *
 * @noSelfInFile
 */
`;

// Relative import/export statements referencing sibling lib modules; dropped because the symbols are inlined.
const RELATIVE_IMPORT = /^\s*import\s[^;]*?from\s+["']\.[^"']*["'];?[^\n]*$/gm;
const RELATIVE_EXPORT = /^\s*export\s[^;]*?from\s+["']\.[^"']*["'];?[^\n]*$/gm;

/**
 * Collect every leaf `.ts` module under `src/lib`, recursively, skipping barrel `index.ts` files (pure
 * re-exports that would be stripped anyway) and `*.test.ts` specs. Sorted for deterministic output.
 *
 * @param dir - Directory to scan recursively.
 * @returns Absolute paths of the leaf source modules to merge.
 */
function collectLeaves(dir: string): Array<string> {
  const found: Array<string> = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full: string = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...collectLeaves(full));
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts") && entry.name !== "index.ts") {
      found.push(full);
    }
  }

  return found.sort();
}

function mergeLib(): void {
  const leaves: Array<string> = collectLeaves(LIB_SRC);

  const parts: Array<string> = leaves.map((leaf) =>
    fs.readFileSync(leaf, "utf8").replace(RELATIVE_IMPORT, "").replace(RELATIVE_EXPORT, "").trim()
  );

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${HEADER}\n${parts.join("\n\n")}\n`);

  console.log(`Merged ${leaves.length} lib module(s) -> ${OUT_FILE}`);
}

if (require.main === module) {
  mergeLib();
}

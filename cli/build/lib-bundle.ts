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

const IMPORT_LINE = /^\s*import\s[^;]*?from\s+["']([^"']*)["'];?[^\n]*$/gm;
const RELATIVE_EXPORT = /^\s*export\s[^;]*?from\s+["']\.[^"']*["'];?[^\n]*$/gm;
// Named import (`import { a, b } from "m"`), capturing the specifier list and module. Named imports from the
// same module are merged so two files importing overlapping names (e.g. `Vector`) don't emit duplicates.
const NAMED_IMPORT = /^import\s*\{([^}]*)\}\s*from\s+["']([^"']*)["'];?/;

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

export function mergeLib(): void {
  const leaves: Array<string> = collectLeaves(LIB_SRC);

  // Non-relative imports (e.g. `xray16`, `xray16/alias`) must survive the merge. Named imports are grouped by
  // module and their specifiers unioned; any other form (default/namespace) is kept verbatim.
  const namedByModule: Map<string, Set<string>> = new Map();
  const otherImports: Set<string> = new Set();

  const parts: Array<string> = leaves.map((leaf) => {
    const content: string = fs.readFileSync(leaf, "utf8");

    for (const match of content.matchAll(IMPORT_LINE)) {
      const specifier: string = match[1] as string;

      if (specifier.startsWith(".")) {
        continue;
      }

      const named: RegExpMatchArray | null = match[0].trim().match(NAMED_IMPORT);

      if (named === null) {
        otherImports.add(match[0].trim());
        continue;
      }

      const bindings: Set<string> = namedByModule.get(specifier) ?? new Set();

      for (const binding of (named[1] as string).split(",")) {
        const trimmed: string = binding.trim();

        if (trimmed.length > 0) {
          bindings.add(trimmed);
        }
      }

      namedByModule.set(specifier, bindings);
    }

    return content.replace(IMPORT_LINE, "").replace(RELATIVE_EXPORT, "").trim();
  });

  const namedImports: Array<string> = [...namedByModule.entries()].map(
    ([specifier, bindings]) => `import { ${[...bindings].sort().join(", ")} } from "${specifier}";`
  );
  const imports: string = [...otherImports, ...namedImports].sort().join("\n");

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${HEADER}${imports ? `\n${imports}\n` : ""}\n${parts.join("\n\n")}\n`);

  console.log(`Merged ${leaves.length} lib module(s) -> ${OUT_FILE}`);
}

if (require.main === module) {
  mergeLib();
}

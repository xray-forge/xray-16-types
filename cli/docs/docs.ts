import * as fs from "node:fs";
import * as path from "node:path";

import { PROJECT_ROOT } from "../config/build.constants";
import { run } from "../config/run";

/**
 * Docs website entry point: generates one markdown API section per published package surface into
 * `docs/api/<id>`, then runs VitePress over `docs/` — `build` into `target/docs` (the GitHub Pages
 * artifact), or `dev` with `--dev`.
 *
 * Following the wirestate docs model: the VitePress sidebar is hand-curated in `.vitepress/config.mts`
 * and links only to each section's `index.md` hub page — generated navigation trees are not wired into
 * the sidebar, and the hand-written overview at `docs/api/index.md` survives regeneration.
 */

const DOCS_ROOT: string = path.resolve(PROJECT_ROOT, "docs");
const API_ROOT: string = path.resolve(DOCS_ROOT, "api");

interface IApiSurface {
  id: string;
  name: string;
  entryPoints: Array<string>;
  tsconfig: string;
  entryPointStrategy?: "resolve" | "expand";
  exclude?: Array<string>;
}

/**
 * One TypeDoc run per published surface, so each gets its own navigation section and page tree.
 *
 * The engine declarations are ambient `declare module "xray16"` augmentations with no real exporting
 * module, so `types` documents through `types-entry.d.ts` (`export * from "xray16"`) — one flat module
 * grouped by the `@group` tags instead of a page tree mirroring the `src/types` directory layout.
 */
const SURFACES: Array<IApiSurface> = [
  {
    id: "types",
    name: "xray16",
    entryPoints: ["cli/docs/types-entry.d.ts"],
    tsconfig: "cli/docs/tsconfig.types.json",
  },
  { id: "alias", name: "xray16/alias", entryPoints: ["src/alias.ts"], tsconfig: "src/tsconfig.json" },
  { id: "macros", name: "xray16/macros", entryPoints: ["src/macros.ts"], tsconfig: "src/tsconfig.json" },
  { id: "lib", name: "xray16/lib", entryPoints: ["src/lib/index.ts"], tsconfig: "src/tsconfig.json" },
  {
    id: "testing",
    name: "xray16/testing",
    entryPoints: [
      "src/testing/index.ts",
      "src/testing/setup-xray-runtime.ts",
      "src/testing/utils/index.ts",
      "src/testing/matchers/index.ts",
    ],
    tsconfig: "src/tsconfig.json",
  },
  {
    id: "mocks",
    name: "xray16/mocks",
    entryPoints: ["src/mocks/index.ts", "src/mocks/xray16-runtime.ts"],
    tsconfig: "src/tsconfig.json",
  },
];

/**
 * Generate the markdown API section for one surface.
 *
 * TypeDoc runs through its CLI: it is ESM-only, so loading it through the API from this CJS script
 * creates a second module instance and breaks the markdown plugin's reflection checks.
 *
 * References across surfaces (e.g. Alias pointing at engine classes) cannot resolve inside a single
 * run, so `validation.notExported` is off and `excludeReferences` keeps re-export noise out of pages.
 *
 * @param surface - Surface descriptor with entry points and tsconfig to run TypeDoc against.
 * @returns Promise resolving when the TypeDoc CLI run finishes.
 */
function generateApiSection(surface: IApiSurface): Promise<void> {
  const flags: Array<string> = [
    "--plugin typedoc-plugin-markdown",
    `--name ${surface.name}`,
    ...surface.entryPoints.map((it) => `--entryPoints ${it}`),
    `--entryPointStrategy ${surface.entryPointStrategy ?? "resolve"}`,
    ...(surface.exclude ?? []).map((it) => `--exclude "${it}"`),
    `--tsconfig ${surface.tsconfig}`,
    `--out docs/api/${surface.id}`,
    "--readme none",
    "--excludeExternals",
    "--excludeInternal",
    "--excludeReferences",
    // The full typecheck is `npm run typecheck`'s job; docs generation only needs the AST.
    "--skipErrorChecking",
    "--hideGenerator",
    "--disableSources",
    "--logLevel Warn",
    "--validation.notExported false",
    // Wirestate-style page format: table-based member indexes, code-block signatures, no per-page
    // header/breadcrumbs — each section's index.md is the navigation hub.
    "--entryFileName index",
    "--parametersFormat table",
    "--enumMembersFormat table",
    "--typeDeclarationFormat table",
    "--propertyMembersFormat table",
    "--indexFormat table",
    "--expandParameters",
    "--useCodeBlocks",
    "--expandObjects",
    "--hideBreadcrumbs",
    "--hidePageHeader",
    '--groupOrder "*"',
  ];

  return run(`typedoc ${flags.join(" ")}`);
}

async function buildDocs(): Promise<void> {
  const isDev: boolean = process.argv.includes("--dev");

  // Per-surface cleanup keeps the hand-written overview at `docs/api/index.md` intact.
  for (const surface of SURFACES) {
    fs.rmSync(path.resolve(API_ROOT, surface.id), { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  }

  for (const surface of SURFACES) {
    console.log(`API section: ${surface.name} -> docs/api/${surface.id}`);
    await generateApiSection(surface);
  }

  await run(isDev ? "vitepress dev docs" : "vitepress build docs");

  if (!isDev) {
    console.log(`Docs site: ${path.resolve(PROJECT_ROOT, "target/docs")}`);
  }
}

if (require.main === module) {
  buildDocs().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

/**
 * Docs-only TypeDoc entry point for the engine declarations.
 *
 * The `xray16` types are ambient `declare module "xray16"` augmentations spread across `src/types`
 * and aggregated through side-effect imports, so no real module exports them. Re-exporting the merged
 * ambient module from a single entry makes TypeDoc document everything as one flat module — grouped by
 * the `@group` tags in the declaration comments — instead of mirroring the source directory layout.
 *
 * Compiled only by `cli/docs/tsconfig.types.json` (the docs build); excluded from the cli typecheck,
 * which does not load the ambient declarations.
 */
export * from "xray16";

/**
 * `xray16/lib` — shared, engine-agnostic helpers for X-Ray script code.
 *
 * Types erase at build time; `@inline` constants fold to literals in the gamedata Lua (via the `inline`
 * plugin) and resolve to real values under jest/node.
 */

export * from "./scalars";
export * from "./types";
export * from "./constants";

export * from "./utils/number";
export * from "./utils/vector";
export * from "./utils/vectors";

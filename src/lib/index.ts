/**
 * `xray16/lib` — shared, engine-agnostic helpers for X-Ray script code.
 *
 * Ships generic utility types, semantic scalar aliases and `@inline` compile-time constants. Types erase at
 * build time; constants fold to literals in the gamedata Lua (via the `inline` plugin) and resolve to real
 * values under jest/node.
 */

export * from "./types";
export * from "./scalars";
export * from "./constants";

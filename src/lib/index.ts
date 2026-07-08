/**
 * `xray16/lib` — shared, engine-agnostic helpers for X-Ray script code.
 *
 * Types erase at build time; `@inline` constants fold to literals in the gamedata Lua (via the `inline`
 * plugin) and resolve to real values under jest/node.
 */

export * from "./scalars";
export * from "./types";
export * from "./constants";
export * from "./data";
export * from "./game-difficulties";
export * from "./game-types";
export * from "./ids";
export * from "./memory";
export * from "./words";

export * from "./utils/assertion";
export * from "./utils/binding";
export * from "./utils/class-ids";
export * from "./utils/console";
export * from "./utils/decamelize";
export * from "./utils/distance";
export * from "./utils/game-wait";
export * from "./utils/logging";
export * from "./utils/number";
export * from "./utils/object-set";
export * from "./utils/patrol";
export * from "./utils/random";
export * from "./utils/screen";
export * from "./utils/string";
export * from "./utils/time";
export * from "./utils/vector";
export * from "./utils/vectors";
export * from "./utils/vertex";

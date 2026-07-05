/**
 * Generic utility types used across X-Ray script code.
 *
 * Pure type aliases with no runtime; safe to share and erase completely at build time.
 */
import { type TIndex } from "./scalars";

/**
 * Any object from JS record variant.
 */
export type AnyObject = Record<string, any>;

/**
 * Possible `nil` value in lua, both null and undefined in TS.
 */
export type Nillable<T> = T | undefined | null;

/**
 * Possible `null` value.
 */
export type Nullable<T> = T | null;

/**
 * Type-casted option that extends type with "nil" values.
 */
export type StringNillable<T extends string = string> = T | "nil";

/**
 * Record partial to support enum implementations with subsets of available keys.
 */
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/**
 * Any callable with a bound `this` context.
 */
export type AnyContextualCallable<T = unknown> = (this: T, ...args: AnyArgs) => any;

/**
 * Any callable without a `this` context.
 */
export type AnyCallable = (this: void, ...args: AnyArgs) => any;

/**
 * Module of callables keyed by name.
 */
export type AnyCallablesModule = Record<string, (this: void, ...args: AnyArgs) => any>;

/**
 * Constructor signature for a value of type `T`.
 */
export interface IConstructor<T> {
  prototype: T;
  new (...args: AnyArgs): T;
}

/**
 * Lua array table indexed by number.
 */
export type LuaArray<T> = LuaTable<TIndex, T>;

/**
 * Any list of arguments.
 */
export type AnyArgs = Array<any>;

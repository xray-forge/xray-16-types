import { type AnyObject } from "../types";

/**
 * Declare a global variable and extern it for game engine usage.
 * Declared values can be found in `_G` / global Lua scope.
 *
 * @param key - Name of the value to extern (dot-separated for nested paths).
 * @param value - Value to extern.
 * @param target - Object to set the value on, global `_G` by default.
 */
export function extern(key: string, value: unknown, target: AnyObject = _G): void {
  const entries: Array<string> = key.split(".");

  key = entries[0];

  for (const match of entries.slice(1)) {
    if (!target[key]) {
      target[key] = {};
    }

    target = target[key];
    key = match;
  }

  target[key] = value;
}

/**
 * Get a Lua global / externed value.
 *
 * @inline
 *
 * @param key - Name of the value to retrieve.
 * @param target - Object to read the value from, global `_G` by default.
 * @returns Externed value.
 */
export function getExtern<T>(key: string, target: AnyObject = _G): T {
  return target[key];
}

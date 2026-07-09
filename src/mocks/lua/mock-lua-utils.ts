import { type AnyObject } from "../internal";
import { MockLuaTable } from "../mock-lua-table";

/**
 * Transform lua table to array for easier testing with equals checks.
 */
export function luaTableToArray<T = unknown>(value: LuaTable<number, T> | Array<T> | null | undefined): Array<T> {
  if (value instanceof MockLuaTable) {
    return [...(value as unknown as Map<number, T>).values()].map((it) => {
      return mapFromLua<any>(it);
    });
  } else if (Array.isArray(value)) {
    return value.map((it) => mapFromLua(it));
  } else {
    throw new Error(`Unexpected type instance provided for casting utility: '${typeof value}'.`);
  }
}

/**
 * Transform in a recursive way lua tables to JS arrays for easier testing/verification.
 */
export function luaTableToObject(value: unknown, ancestors: WeakSet<object> = new WeakSet()): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  // A back-reference to an ancestor closes a cycle; return it as-is instead of recursing forever.
  if (ancestors.has(value)) {
    return value;
  }

  if ((value as AnyObject)["$$typeof"]) {
    return value;
  }

  ancestors.add(value);

  const result: AnyObject = (() => {
    if (value instanceof MockLuaTable) {
      return [...value.entries()].reduce((acc, [key, entry]) => {
        acc[key] = luaTableToObject(entry, ancestors);

        return acc;
      }, {} as AnyObject);
    } else if (Array.isArray(value)) {
      return value.reduce((acc: Array<unknown>, it, index) => {
        acc[index + 1] = luaTableToObject(it as AnyObject, ancestors);

        return acc;
      }, {} as Array<unknown>) as unknown as AnyObject;
    }

    return Object.entries(value).reduce((acc, [key, entry]) => {
      acc[key] = luaTableToObject(entry, ancestors);

      return acc;
    }, {} as AnyObject);
  })();

  ancestors.delete(value);

  return result;
}

/**
 * @param value - Lua table, object or class instance to transform.
 * @returns Object based map from lua value.
 */
export function mapFromLua<T>(value: T): T {
  if (value instanceof MockLuaTable) {
    return [...(value as unknown as Map<any, any>).entries()].reduce((acc: Record<any, any>, [key, value]) => {
      acc[key] = mapFromLua(value);

      return acc;
    }, {});
  } else if (value?.constructor === Object) {
    return Object.entries(value).reduce((acc: Record<any, any>, [key, value]) => {
      acc[key] = mapFromLua(value);

      return acc;
    }, {});
  } else {
    return value;
  }
}

declare global {
  /**
   * Utility to get current filename, similar to __filename in nodejs.
   *
   * @group xrf_plugin
   */
  const $filename: string;

  /**
   * Utility to transform TS provided array to a lua one.
   * Just wrapper that is stripped compile time, but simplifies unit testing with TS.
   *
   * @group xrf_plugin
   */
  function $fromArray<T>(array: Array<T>): LuaTable<number, T>;

  /**
   * Utility to transform LUA array to JS array.
   * Just wrapper that is stripped compile time, but simplifies unit testing with TS.
   *
   * @group xrf_plugin
   */
  function $fromLuaArray<T>(array: LuaTable<number, T>): Array<T>;

  /**
   * Utility to transform TS provided object to a lua table.
   * Just wrapper that is stripped compile time, but simplifies unit testing with TS.
   *
   * @group xrf_plugin
   */
  function $fromObject<K extends string | number, T>(object: Record<K, T>): LuaTable<K, T>;
  function $fromObject<D>(object: D): LuaTable<keyof D, D[keyof D]>;

  /**
   * Utility to transform LUA provided table to a TS one.
   * Just wrapper that is stripped compile time, but simplifies unit testing with TS.
   *
   * @group xrf_plugin
   */
  function $fromLuaTable<K extends string | number, T>(object: LuaTable<K, T>): Record<K, T>;
  function $fromLuaTable<D>(object: LuaTable<keyof D, D[keyof D]>): D;
}

export {};

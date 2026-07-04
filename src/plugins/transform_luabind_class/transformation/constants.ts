export const LUABIND_NAME_FIELD: string = "__name";
export const LUABIND_DECORATOR: string = "LuabindClass";
export const LUABIND_CONSTRUCTOR_METHOD: string = "__init";
export const LUABIND_SUPER_IDENTIFIER: string = "super";
export const LUABIND_SYMBOL: symbol = Symbol("IS_LUABIND_CLASS");

/**
 * Strategy used to transform parent constructor `super(...)` calls of luabind classes.
 *
 * - `reference` - call the parent constructor directly, e.g. `Base.__init(self, ...)`.
 * - `luabind` - delegate to the luabind global `super(...)` helper, e.g. `super(...)`.
 */
export type TLuabindSuperCall = "reference" | "luabind";

/**
 * Default super call strategy, preserving the historic direct `__init` reference behavior.
 */
export const LUABIND_DEFAULT_SUPER_CALL: TLuabindSuperCall = "reference";

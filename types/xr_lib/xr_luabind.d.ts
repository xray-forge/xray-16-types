declare module "xray16" {
  /**
   * Base class for LuaBind-backed engine objects.
   *
   * Engine classes expose `__name` through the TypeScriptToLua LuaBind plugin so subclasses can be emitted as LuaBind
   * classes instead of regular Lua tables.
   *
   * @source luabind
   * @group xr_luabind
   */
  export class EngineBinding {
    /**
     * LuaBind class constructor name.
     */
    public static readonly __name: string;

    /**
     * LuaBind instance constructor name.
     */
    public readonly __name: string;
  }

  /**
   * Static members owned by `EngineBinding` and excluded from exported engine enum values.
   *
   * @group xr_luabind
   */
  type TEngineBindingStaticMethods = keyof typeof EngineBinding;

  /**
   * Mark a TypeScript class for LuaBind class transformation.
   *
   * Use this on classes that extend engine bindings and need LuaBind-compatible constructors, inheritance, or virtual
   * methods in emitted Lua.
   *
   * @group xr_luabind
   *
   * @returns Class decorator.
   */
  export function LuabindClass(): ClassDecorator;

  /**
   * Runtime metadata for a LuaBind class.
   *
   * @source C++ class class_info_data
   * @customConstructor class_info_data
   * @group xr_luabind
   */
  export class class_info_data extends EngineBinding {
    /**
     * Methods exposed by the LuaBind class.
     */
    public readonly methods: LuaTable<string, (...args: Array<unknown>) => unknown>;

    /**
     * Attribute names exposed by the LuaBind class.
     */
    public readonly attributes: LuaTable<number, string>;

    /**
     * LuaBind class name.
     */
    public readonly name: string;

    /**
     * Engine-created LuaBind metadata.
     */
    private constructor();
  }

  /**
   * Get names of LuaBind classes registered in a Lua state.
   *
   * @group xr_luabind
   *
   * @param lua_state - Lua state to inspect.
   * @returns Registered class names.
   */
  export function class_names(this: void, lua_state: unknown /* Lua_State*/): LuaTable<number, string>;

  /**
   * Get LuaBind metadata for an object or class.
   *
   * @group xr_luabind
   *
   * @param target - Object or class to inspect.
   * @returns LuaBind class metadata.
   */
  export function class_info(this: void, target: unknown): class_info_data;
}

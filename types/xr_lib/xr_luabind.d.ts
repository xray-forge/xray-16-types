declare module "xray16" {
  /**
   * Base for bindings brought from LuaBind library.
   * Includes base methods implemented with @LuabindClass decorator and overriding of operators.
   *
   * @source luabind
   * @group xr_luabind
   */
  export class EngineBinding {
    /**
     * Name of luabind class constructor.
     */
    public static readonly __name: string;

    /**
     * Name of luabind class instance constructor.
     */
    public readonly __name: string;
  }

  /**
   * @group xr_luabind
   */
  type TEngineBindingStaticMethods = keyof typeof EngineBinding;

  /**
   * Decorator to mark classes as luabind transformed.
   * Marked classes will be declared using luabind tools instead of default typescript-to-lua approach.
   * Luabind variant is less flexible and has many limitations,
   * but allows extension of engine exported classes and virtual methods.
   *
   * @group xr_luabind
   * @returns class decorator to mark class as luabind implementation
   */
  export function LuabindClass(): ClassDecorator;

  /**
   * @source C++ class class_info_data
   * @customConstructor class_info_data
   * @group xr_luabind
   */
  export class class_info_data extends EngineBinding {
    public readonly methods: LuaTable<string, (...args: Array<unknown>) => unknown>;
    public readonly attributes: LuaTable<number, string>;
    public readonly name: string;

    private constructor();
  }

  /**
   * @group xr_luabind
   */
  export function class_names(this: void, lua_state: unknown /* lua_State*/): LuaTable<number, string>;

  /**
   * @group xr_luabind
   */
  export function class_info(this: void, target: unknown): class_info_data;
}

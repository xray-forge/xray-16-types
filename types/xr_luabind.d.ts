declare module "xray16" {
  /**
   * Base for bindings brought from LuaBind library.
   * Includes base methods implemented with @LuabindClass decorator and overriding of operators.
   *
   * @source luabind
   * @group xr_luabind
   */
  export class EngineBinding {
    public static readonly __name: string;
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
}

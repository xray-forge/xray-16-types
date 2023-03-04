declare module "xray16" {
  /**
   * Base for bindings brought from LuaBind library.
   * todo: Correct signatures.
   *
   * @source luabind
   * @group xr_luabind
   */
  export class XR_EngineBinding {
    public static readonly __name: string;
    public readonly __name: string;

    public __init(...args: Array<any>): void;
    public __finalize(): void;
    public __call(args: Array<any>): void;
    public __tostring(): string;
  }

  /**
   * @group xr_types
   */
  type XR_EngineBindingStaticMethods = keyof typeof XR_EngineBinding;
}

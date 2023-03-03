declare module "xray16" {
  /**
   * Base for bindings brought from LuaBind library.
   * todo: Correct signatures.
   *
   * @source luabind
   * @group xr_luabind
   */
  export class XR_EngineBinding {
    public static __init(this: void, ...args: Array<any>): void;
    public __init(...args: Array<any>): void;

    public static __finalize(this: void): void;
    public __finalize(): void;

    public static __call(this: void): void;
    public __call(args: Array<any>): void;

    public static __tostring(this: void): string;
    public __tostring(): string;

    public static __len(this: void): void;
    public __len(): void;

    public static __unm(this: void): void;
    public __unm(): void;

    public static __eq(this: void): void;
    public __eq(): void;

    public static __le(this: void): void;
    public __le(): void;

    public static __lt(this: void): void;
    public __lt(): void;

    public static __pow(this: void): void;
    public __pow(): void;

    public static __div(this: void): void;
    public __div(): void;

    public static __mul(this: void): void;
    public __mul(): void;

    public static __sub(this: void): void;
    public __sub(): void;

    public static __add(this: void): void;
    public __add(): void;

    public readonly __name: string;
  }
}

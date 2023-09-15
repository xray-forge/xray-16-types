declare module "xray16" {
  /**
   * @source C++ class profile_timer
   * @customConstructor profile_timer
   * @group xr_debug
   */
  export class profile_timer extends EngineBinding {
    public constructor();
    public constructor(timer: profile_timer);

    public stop(): void;

    public start(): void;

    public time(): f32;

    /**
     * Overridden string cast is implemented for profiling timer.
     *
     * @returns serialized profile time.
     */
    public toString(): string;
  }

  /**
   * @source C++ class CConsole
   * @customConstructor CConsole
   * @group xr_debug
   */
  export class CConsole extends EngineBinding {
    private constructor();

    public execute(command: string): void;

    public execute_deferred(command: string): void;

    public execute_script(script: string): void;

    public show(): void;

    public hide(): void;

    public get_bool(key: string): boolean;

    public get_float(key: string): f32;

    public get_integer(key: string): i32;

    public get_string(key: string): string;

    public get_token(key: string): string;
  }
}

declare module "xray16" {
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

  /**
   * Log formatted message in game console and log file.
   * Resulting message looks like "[LUA]  %s", where message is provided text parameter.
   *
   * Note: text length is limited and supplying too long value will crash the game. todo: check exact limit.
   *
   * @group xr_debug
   * @param text - string to print
   */
  export function log(this: void, text: string): void;

  /**
   * @group xr_debug
   */
  export function error_log(this: void, text: string): void;

  /**
   * @group xr_debug
   */
  export function print_stack(this: void): void;

  /**
   * @group xr_debug
   */
  export function flush(this: void): void;

  /**
   * Get console object reference.
   * Allows flushing logs / executing commands / getting global engine variables.
   *
   * @group xr_debug
   * @returns console object reference
   */
  export function get_console(this: void): CConsole;

  /**
   * @group xr_debug
   */
  export function command_line(this: void): string;

  /**
   * Prefetch provided script before executing next lines.
   *
   * @group xr_global_declaration
   */
  export function prefetch(this: void, path: string): void;
}

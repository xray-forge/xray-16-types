import type { Nullable } from "../internal";

declare module "xray16" {
  /**
   * Engine console interface.
   *
   * @source C++ class CConsole
   * @customConstructor CConsole
   * @group xr_debug
   *
   * @remarks
   * Use `get_console()` to access the engine-owned console. Scripts do not create console instances.
   */
  export class CConsole extends EngineBinding {
    /**
     * Engine-owned console singleton.
     */
    private constructor();

    /**
     * Execute console command immediately.
     *
     * @remarks
     * Executes without adding the command to console history.
     *
     * @param command - Console command.
     */
    public execute(command: string): void;

    /**
     * Queue console command for deferred execution.
     *
     * @remarks
     * Schedules a `KERNEL:console` event, so the command runs later on the engine event queue.
     *
     * @param command - Console command.
     */
    public execute_deferred(command: string): void;

    /**
     * Execute a config file through the console.
     *
     * @remarks
     * The binding prepends `cfg_load` to the provided path.
     *
     * @param script - Config file path.
     */
    public execute_script(script: string): void;

    /**
     * Show the console window.
     */
    public show(): void;

    /**
     * Hide the console window.
     */
    public hide(): void;

    /**
     * Read console variable as boolean.
     *
     * @remarks
     * Returns `false` when the command is missing or is not a boolean-compatible mask/integer command.
     *
     * @param key - Console variable name.
     * @returns Boolean value.
     */
    public get_bool(key: string): boolean;

    /**
     * Read console variable as float.
     *
     * @remarks
     * Returns `0` when the command is missing or is not a float command.
     *
     * @param key - Console variable name.
     * @returns Float value.
     */
    public get_float(key: string): f32;

    /**
     * Read console variable as integer.
     *
     * @remarks
     * Mask commands are returned as `0` or `1`. Missing or incompatible commands return `0`.
     *
     * @param key - Console variable name.
     * @returns Integer value.
     */
    public get_integer(key: string): i32;

    /**
     * Read console variable as string.
     *
     * @remarks
     * Returns `null` when the command does not exist.
     *
     * @param key - Console variable name.
     * @returns String value.
     */
    public get_string(key: string): Nullable<string>;

    /**
     * Read console variable token text.
     *
     * @remarks
     * Uses the same engine path as `get_string`, so missing commands return `null`.
     *
     * @param key - Console variable name.
     * @returns Token text.
     */
    public get_token(key: string): Nullable<string>;
  }

  /**
   * Log a message through the script log channel.
   *
   * @group xr_debug
   *
   * @remarks
   * In non-master builds the message is sent to `CScriptEngine::script_log`.
   *
   * @param text - Message to print.
   */
  export function log(this: void, text: string): void;

  /**
   * Log an error message and print the current script stack.
   *
   * @group xr_debug
   *
   * @remarks
   * The C++ binding asserts after logging the message.
   *
   * @param text - Error message.
   */
  export function error_log(this: void, text: string): void;

  /**
   * Print the current script stack to the log.
   *
   * @group xr_debug
   */
  export function print_stack(this: void): void;

  /**
   * Flush pending script log output in debug builds.
   *
   * @group xr_debug
   */
  export function flush(this: void): void;

  /**
   * Get console object reference.
   *
   * @group xr_debug
   *
   * @remarks
   * Returns the global engine console pointer.
   *
   * @returns Console object reference.
   */
  export function get_console(this: void): CConsole;

  /**
   * Get process command-line parameters.
   *
   * @group xr_debug
   *
   * @returns Engine command-line string.
   */
  export function command_line(this: void): string;

  /**
   * Load and compile a script before continuing execution.
   *
   * @group xr_global_declaration
   *
   * @param path - Script file path.
   */
  export function prefetch(this: void, path: string): void;
}

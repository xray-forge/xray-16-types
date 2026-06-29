declare module "xray16" {
  /**
   * Engine console interface.
   *
   * @source C++ class CConsole
   * @customConstructor CConsole
   * @group xr_debug
   */
  export class CConsole extends EngineBinding {
    /**
     * Engine-owned console singleton.
     */
    private constructor();

    /**
     * Execute console command immediately.
     *
     * @param command - Console command.
     */
    public execute(command: string): void;

    /**
     * Queue console command for deferred execution.
     *
     * @param command - Console command.
     */
    public execute_deferred(command: string): void;

    /**
     * Execute script text as a console script.
     *
     * @param script - Script text.
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
     * @param key - Console variable name.
     * @returns Boolean value.
     */
    public get_bool(key: string): boolean;

    /**
     * Read console variable as float.
     *
     * @param key - Console variable name.
     * @returns Float value.
     */
    public get_float(key: string): f32;

    /**
     * Read console variable as integer.
     *
     * @param key - Console variable name.
     * @returns Integer value.
     */
    public get_integer(key: string): i32;

    /**
     * Read console variable as string.
     *
     * @param key - Console variable name.
     * @returns String value.
     */
    public get_string(key: string): string;

    /**
     * Read console variable token text.
     *
     * @param key - Console variable name.
     * @returns Token text.
     */
    public get_token(key: string): string;
  }

  /**
   * Log a message through the script log channel.
   *
   * @group xr_debug
   * @remarks In non-master builds the message is sent to `CScriptEngine::script_log`.
   *
   * @param text - Message to print.
   */
  export function log(this: void, text: string): void;

  /**
   * Log an error message and print the current script stack.
   *
   * @group xr_debug
   * @remarks The C++ binding asserts after logging the message.
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

declare module "xray16" {
  /**
   * @group xr_script_trade
   *
   * @param a
   * @param b
   */
  export function buy_condition(this: void, a: f32, b: f32): void;

  /**
   * @group xr_script_trade
   *
   * @param a
   * @param b
   */
  export function buy_condition(this: void, a: unknown, b: string): void;

  /**
   * @group xr_script_trade
   *
   * @param a
   * @param b
   */
  export function sell_condition(this: void, a: number, b: number): void;

  /**
   * @group xr_script_trade
   *
   * @param a
   * @param b
   */
  export function sell_condition(this: void, a: unknown, b: string): void;

  /**
   * @group xr_script_trade
   *
   * @param file
   * @param str
   */
  export function show_condition(this: void, file: ini_file, str: string): void;
}

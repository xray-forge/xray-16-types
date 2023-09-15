declare module "xray16" {
  /**
   * @group xr_script_trade
   */
  export function buy_condition(this: void, a: f32, b: f32): void;

  /**
   * @group xr_script_trade
   */
  export function buy_condition(this: void, a: unknown, b: string): void;

  /**
   * @group xr_script_trade
   */
  export function sell_condition(this: void, a: number, b: number): void;

  /**
   * @group xr_script_trade
   */
  export function sell_condition(this: void, a: unknown, b: string): void;

  /**
   * @group xr_script_trade
   */
  export function show_condition(this: void, file: ini_file, str: string): void;
}

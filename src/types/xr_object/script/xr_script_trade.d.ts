declare module "xray16" {
  /**
   * Set default buy trade factors.
   *
   * @group xr_script_trade
   *
   * @param friend_factor - Price factor for friendly relations.
   * @param enemy_factor - Price factor for hostile relations.
   */
  export function buy_condition(this: void, friend_factor: f32, enemy_factor: f32): void;

  /**
   * Load default buy trade condition from config.
   *
   * @group xr_script_trade
   *
   * @param ini_file - Trade config.
   * @param section - Trade section name.
   */
  export function buy_condition(this: void, ini_file: ini_file, section: string): void;

  /**
   * Set default sell trade factors.
   *
   * @group xr_script_trade
   *
   * @param friend_factor - Price factor for friendly relations.
   * @param enemy_factor - Price factor for hostile relations.
   */
  export function sell_condition(this: void, friend_factor: f32, enemy_factor: f32): void;

  /**
   * Load default sell trade condition from config.
   *
   * @group xr_script_trade
   *
   * @param ini_file - Trade config.
   * @param section - Trade section name.
   */
  export function sell_condition(this: void, ini_file: ini_file, section: string): void;

  /**
   * Load default item visibility trade condition from config.
   *
   * @group xr_script_trade
   *
   * @param ini_file - Trade config.
   * @param section - Trade section name.
   */
  export function show_condition(this: void, ini_file: ini_file, section: string): void;
}

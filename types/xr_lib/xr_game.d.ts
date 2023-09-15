declare module "xray16" {
  /**
   * @source namespace game
   * @group xr_game
   */
  export interface IXR_game {
    CTime: (this: void) => CTime;

    translate_string(this: void, translation_key: string): string;

    time(this: void): u32;

    reload_language(this: void): void;

    get_game_time(this: void): CTime;

    log_stack_trace(this: void): void;

    jump_to_level(this: void, level_name: string): void;

    jump_to_level(this: void, position: vector, lvi: u32, gvi: u16): void;

    jump_to_level(this: void, position: vector, lvi: u32, gvi: u16, direction: vector): void;

    start_tutorial(this: void, tutorial_id: string): void;

    has_active_tutorial(this: void): boolean;

    active_tutorial_name(this: void): string;

    stop_tutorial(this: void): void;
  }

  /**
   * @group xr_game
   */
  export const game: IXR_game;

  /**
   * Check whether dynamic music setting is enabled.
   * Dynamic music starts playing different kind of ambient sounds in actor combat.
   *
   * @group xr_game
   * @returns is dynamic music allowed in game settings.
   */
  export function IsDynamicMusic(this: void): boolean;

  /**
   * Whether auto-save on important checkpoints option is turned on.
   *
   * @group xr_game
   */
  export function IsImportantSave(this: void): boolean;

  /**
   * @group xr_game
   * @returns is dev editor tool enabled currently used.
   */
  export function editor(this: void): boolean;

  /**
   * @group xr_game
   */
  export function set_start_position(position: vector): void;

  /**
   * @group xr_game
   */
  export function set_start_game_vertex_id(gvid: i32): void;

  /**
   * @group xr_game
   */
  export function IsGameTypeSingle(this: void): boolean;

  /**
   * @group xr_game
   */
  export function is_enough_address_space_available(this: void): boolean;

  /**
   * @group xr_game
   */
  export function verify_if_thread_is_running(this: void): void;

  /**
   * @group xr_game
   */
  export function script_server_object_version(this: void): u16;
}

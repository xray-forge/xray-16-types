declare module "xray16" {
  /**
   * Enumeration with possible game types:
   * - eGameIDNoGame = u32(0),
   * - eGameIDSingle = u32(1) << 0,
   * - eGameIDDeathmatch = u32(1) << 1,
   * - eGameIDTeamDeathmatch = u32(1) << 2,
   * - eGameIDArtefactHunt = u32(1) << 3,
   * - eGameIDCaptureTheArtefact = u32(1) << 4,
   * - eGameIDDominationZone = u32(1) << 5,
   * - eGameIDTeamDominationZone = u32(1) << 6,
   *
   * @source C++ enum EGameIDs
   * @group xr_game
   */
  export type TXR_EGameID = 0 | 1 | 2 | 8 | 16 | 32 | 64;

  /**
   * @source C++ class GAME_TYPE
   * @customConstructor GAME_TYPE
   * @group xr_game
   */
  export class GAME_TYPE {
    public static readonly eGameIDArtefactHunt: 8;
    public static readonly eGameIDCaptureTheArtefact: 16;
    public static readonly eGameIDDeathmatch: 2;
    public static readonly eGameIDTeamDeathmatch: 4;

    public static readonly GAME_UNKNOWN: -1;
    public static readonly GAME_ANY: 0;
    public static readonly GAME_SINGLE: 1;
    public static readonly GAME_DEATHMATCH: 2;
    //	GAME_CTF							= 3,
    //	GAME_ASSAULT						= 4,	// Team1 - assaulting, Team0 - Defending
    public static readonly GAME_CS: 5;
    public static readonly GAME_TEAMDEATHMATCH: 6;
    public static readonly GAME_ARTEFACTHUNT: 7;
    public static readonly GAME_CAPTURETHEARTEFACT: 8;
    // identifiers in range [100...254] are registered for script game type
    public static readonly GAME_DUMMY: 255; // temporary g
  }

  /**
   * @group xr_game
   */
  type TXR_GAME_TYPE = EnumeratedStaticsValues<typeof GAME_TYPE>;

  /**
   * @source C++ class game_difficulty
   * @customConstructor game_difficulty
   * @group xr_game
   */
  export class game_difficulty {
    public static readonly novice: 0;
    public static readonly stalker: 1;
    public static readonly veteran: 2;
    public static readonly master: 3;
  }

  /**
   * @group xr_game
   */
  export type TXR_game_difficulty_name = EnumeratedStaticsKeys<typeof game_difficulty>;

  /**
   * @group xr_game
   */
  export type TXR_game_difficulty = EnumeratedStaticsValues<typeof game_difficulty>;

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
   */
  export function IsGameTypeSingle(this: void): boolean;

  /**
   * @group xr_game
   * @returns is dev editor tool enabled currently used.
   */
  export function editor(this: void): boolean;

  /**
   * @group xr_game
   */
  export function set_start_position(this: void, position: vector): void;

  /**
   * @group xr_game
   */
  export function set_start_game_vertex_id(this: void, gvid: i32): void;

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

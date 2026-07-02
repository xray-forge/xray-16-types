declare module "xray16" {
  /**
   * Bitmask values returned by `level.game_id()`.
   *
   * Enumeration with possible game types:
   * - eGameIDNoGame = u32(0),
   * - eGameIDSingle = u32(1) << 0,
   * - eGameIDDeathmatch = u32(1) << 1,
   * - eGameIDTeamDeathmatch = u32(1) << 2,
   * - eGameIDArtefactHunt = u32(1) << 3,
   * - eGameIDCaptureTheArtefact = u32(1) << 4,
   * - eGameIDDominationZone = u32(1) << 5,
   * - eGameIDTeamDominationZone = u32(1) << 6,.
   *
   * @source C++ enum EGameIDs
   * @group xr_game
   */
  export type TXR_EGameID = 0 | 1 | 2 | 4 | 8 | 16 | 32 | 64;

  /**
   * Game type constants used by menu and multiplayer scripts.
   *
   * @source C++ class GAME_TYPE
   * @customConstructor GAME_TYPE
   * @group xr_game
   */
  export class GAME_TYPE {
    /**
     * Engine enum value for `GAME_TYPE.eGameIDArtefactHunt`.
     */
    public static readonly eGameIDArtefactHunt: 8;
    /**
     * Engine enum value for `GAME_TYPE.eGameIDCaptureTheArtefact`.
     */
    public static readonly eGameIDCaptureTheArtefact: 16;
    /**
     * Engine enum value for `GAME_TYPE.eGameIDDeathmatch`.
     */
    public static readonly eGameIDDeathmatch: 2;
    /**
     * Engine enum value for `GAME_TYPE.eGameIDTeamDeathmatch`.
     */
    public static readonly eGameIDTeamDeathmatch: 4;

    /**
     * Engine enum value for `GAME_TYPE.GAME_UNKNOWN`.
     */
    public static readonly GAME_UNKNOWN: -1;
    /**
     * Engine enum value for `GAME_TYPE.GAME_ANY`.
     */
    public static readonly GAME_ANY: 0;
    /**
     * Engine enum value for `GAME_TYPE.GAME_SINGLE`.
     */
    public static readonly GAME_SINGLE: 1;
    /**
     * Engine enum value for `GAME_TYPE.GAME_DEATHMATCH`.
     */
    public static readonly GAME_DEATHMATCH: 2;

    /**
     * Engine enum value for `GAME_TYPE.GAME_CS`.
     */
    public static readonly GAME_CS: 5;

    /**
     * Engine enum value for `GAME_TYPE.GAME_TEAMDEATHMATCH`.
     */
    public static readonly GAME_TEAMDEATHMATCH: 6;

    /**
     * Engine enum value for `GAME_TYPE.GAME_ARTEFACTHUNT`.
     */
    public static readonly GAME_ARTEFACTHUNT: 7;

    /**
     * Engine enum value for `GAME_TYPE.GAME_CAPTURETHEARTEFACT`.
     */
    public static readonly GAME_CAPTURETHEARTEFACT: 8;

    /**
     * Engine enum value for `GAME_TYPE.GAME_DUMMY`.
     */
    public static readonly GAME_DUMMY: 255;
  }

  /**
   * @group xr_game
   */
  type TXR_GAME_TYPE = EnumeratedStaticsValues<typeof GAME_TYPE>;

  /**
   * Single-player difficulty constants.
   *
   * @source `src/xrGame/game_cl_single.h`, `ESingleGameDifficulty`; `src/xrGame/level_script.cpp`, `game_difficulty` binding
   * @customConstructor game_difficulty
   * @group xr_game
   */
  export class game_difficulty {
    /**
     * Engine enum value for `game_difficulty.novice`.
     */
    public static readonly novice: 0;
    /**
     * Engine enum value for `game_difficulty.stalker`.
     */
    public static readonly stalker: 1;
    /**
     * Engine enum value for `game_difficulty.veteran`.
     */
    public static readonly veteran: 2;
    /**
     * Engine enum value for `game_difficulty.master`.
     */
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
   * Global helpers exposed by the engine `game` namespace.
   *
   * @source namespace game
   * @group xr_game
   */
  export interface IXR_game {
    /**
     * Create a new game time value.
     *
     * @remarks
     * This is the same constructor exported as `CTime`.
     *
     * @returns Empty `CTime` instance.
     */
    CTime: (this: void) => CTime;

    /**
     * Resolve a string table key for the current language.
     *
     * @since OpenXRay 2022-08-09, a2d264fc, PR #1032
     *
     * @param translation_key - String table key to translate.
     * @returns Localized text or the fallback string from the string table.
     */
    translate_string(this: void, translation_key: string): string;

    /**
     * Get current in-game time as seconds.
     *
     * @remarks
     * Returns the low 32 bits of the current game time counter.
     *
     * @returns Game time counter.
     */
    time(this: void): u32;

    /**
     * Reload string table data for the active language.
     *
     * @since OpenXRay 2022-08-09, a2d264fc, PR #1032
     */
    reload_language(this: void): void;

    /**
     * Get current in-game calendar time.
     *
     * @remarks
     * Uses ALife game time when ALife is available, otherwise falls back to the current level game time.
     *
     * @returns Current game time value.
     */
    get_game_time(this: void): CTime;

    /**
     * Write the current native stack trace to the engine log.
     *
     * @since OpenXRay 2022-08-09, a2d264fc, PR #1032
     */
    log_stack_trace(this: void): void;

    /**
     * Move the actor to another level by level name.
     *
     * @since OpenXRay 2014-12-27, c82669625
     *
     * @remarks
     * If the level name is not present in the game graph, the engine logs a script error and leaves the actor in the
     * current level.
     *
     * @param level_name - Target level name from the game graph.
     */
    jump_to_level(this: void, level_name: string): void;

    /**
     * Move the actor to another level graph point.
     *
     * @since OpenXRay 2014-12-27, c82669625
     *
     * @param position - Target position.
     * @param level_vertex_id - Target level vertex.
     * @param game_vertex_id - Target game graph vertex.
     */
    jump_to_level(this: void, position: vector, level_vertex_id: u32, game_vertex_id: u16): void;

    /**
     * Move the actor to another level graph point and face a direction.
     *
     * @since OpenXRay 2014-12-27, c82669625
     *
     * @param position - Target position.
     * @param level_vertex_id - Target level vertex.
     * @param game_vertex_id - Target game graph vertex.
     * @param direction - Actor direction after the jump.
     */
    jump_to_level(this: void, position: vector, level_vertex_id: u32, game_vertex_id: u16, direction: vector): void;

    /**
     * Start an in-game tutorial sequence.
     *
     * @remarks
     * Does nothing while the load screen is active. Starting a second tutorial stores the previous one as the fallback
     * input receiver.
     *
     * @param tutorial_id - Tutorial identifier.
     */
    start_tutorial(this: void, tutorial_id: string): void;

    /**
     * Check whether a tutorial is currently active.
     *
     * @returns Whether any tutorial is active.
     */
    has_active_tutorial(this: void): boolean;

    /**
     * Get the active tutorial identifier.
     *
     * @since OpenXRay 2022-08-09, a2d264fc, PR #1032
     *
     * @remarks
     * Call only after `has_active_tutorial()` returns `true`; the binding dereferences the active tutorial directly.
     *
     * @returns Active tutorial name.
     */
    active_tutorial_name(this: void): string;

    /**
     * Stop the active tutorial sequence.
     */
    stop_tutorial(this: void): void;
  }

  /**
   * Global engine `game` namespace.
   *
   * @group xr_game
   */
  export const game: IXR_game;

  /**
   * Check whether dynamic music setting is enabled.
   * Dynamic music starts playing different kind of ambient sounds in actor combat.
   *
   * @group xr_game
   *
   * @returns Is dynamic music allowed in game settings.
   */
  export function IsDynamicMusic(this: void): boolean;

  /**
   * Whether auto-save on important checkpoints option is turned on.
   *
   * @group xr_game
   *
   * @returns Whether important saves are enabled.
   */
  export function IsImportantSave(this: void): boolean;

  /**
   * Check whether the active game mode is single-player.
   *
   * @group xr_game
   *
   * @returns Whether the current game type is single-player.
   */
  export function IsGameTypeSingle(this: void): boolean;

  /**
   * Check whether the in-game editor is active.
   *
   * @group xr_game
   *
   * @returns Whether the editor is currently enabled.
   */
  export function editor(this: void): boolean;

  /**
   * Set the actor start position used by level transition logic.
   *
   * @since OpenXRay 2022-08-22, 33f6da05, PR #1006
   *
   * @group xr_game
   * @remarks
   * Updates the global start position consumed by ALife level-transition code.
   *
   * @param position - Target start position.
   */
  export function set_start_position(this: void, position: vector): void;

  /**
   * Set the actor start game graph vertex.
   *
   * @since OpenXRay 2022-08-22, 33f6da05, PR #1006
   *
   * @group xr_game
   *
   * @remarks
   * Updates the global start game vertex consumed by ALife level-transition code.
   *
   * @param game_vertex_id - Target game graph vertex.
   */
  export function set_start_game_vertex_id(this: void, game_vertex_id: i32): void;

  /**
   * Check whether the process has enough address space for the current game.
   *
   * @group xr_game
   *
   * @remarks
   * On non-Windows builds this always returns `true`.
   *
   * @returns Whether available address space is sufficient.
   */
  export function is_enough_address_space_available(this: void): boolean;

  /**
   * Ask the engine to verify that its watched thread is still running.
   *
   * @group xr_game
   *
   * @throws If called outside the active Lua thread.
   */
  export function verify_if_thread_is_running(this: void): void;

  /**
   * Get server object serialization version used by scripts.
   *
   * @group xr_game
   *
   * @returns Script server object version.
   */
  export function script_server_object_version(this: void): u16;
}

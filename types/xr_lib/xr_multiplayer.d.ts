declare module "xray16" {
  /**
   * Metadata stored inside a recorded multiplayer demo.
   *
   * @source C++ class demo_info
   * @customConstructor demo_info
   * @group xr_multiplayer
   */
  export class demo_info {
    /**
     * Engine-created demo metadata.
     */
    protected constructor();

    /**
     * @returns Demo author name.
     */
    public get_author_name(): string;

    /**
     * @returns Saved game score string.
     */
    public get_game_score(): string;

    /**
     * @returns Multiplayer game type name.
     */
    public get_game_type(): string;

    /**
     * @returns Map name used by the demo.
     */
    public get_map_name(): string;

    /**
     * @returns Map version string.
     */
    public get_map_version(): string;

    /**
     * Get saved player stats by index.
     *
     * @param value - Zero-based player index.
     * @returns Demo player info.
     */
    public get_player(value: u32): demo_player_info;

    /**
     * @returns Number of saved players.
     */
    public get_players_count(): u32;
  }

  /**
   * Player stats saved inside a recorded multiplayer demo.
   *
   * @source C++ class demo_player_info
   * @customConstructor demo_player_info
   * @group xr_multiplayer
   */
  export class demo_player_info {
    /**
     * @returns Captured artefact count.
     */
    public get_artefacts(): u16;

    /**
     * @returns Death count.
     */
    public get_deaths(): i16;

    /**
     * @returns Frag count.
     */
    public get_frags(): i16;

    /**
     * @returns Player name.
     */
    public get_name(): string;

    /**
     * @returns Player rank.
     */
    public get_rank(): u8;

    /**
     * @returns Score points.
     */
    public get_spots(): i16;

    /**
     * @returns Multiplayer team id.
     */
    public get_team(): u8;
  }

  /**
   * Server browser filters used by the multiplayer UI.
   *
   * @source C++ class SServerFilters
   * @customConstructor SServerFilters
   * @group xr_multiplayer
   */
  export class SServerFilters {
    /**
     * Include empty servers.
     */
    public empty: boolean;

    /**
     * Include full servers.
     */
    public full: boolean;

    /**
     * Include listen servers.
     */
    public listen_servers: boolean;

    /**
     * Include password-protected servers.
     */
    public with_pass: boolean;

    /**
     * Include servers without friendly fire.
     */
    public without_ff: boolean;

    /**
     * Include servers without a password.
     */
    public without_pass: boolean;

    /**
     * Create default server browser filters.
     */
    public constructor();
  }

  /**
   * GameSpy profile returned by login operations.
   *
   * @source C++ class profile
   * @customConstructor XR_profile
   * @group xr_multiplayer
   */
  export class profile {
    /**
     * @returns Unique GameSpy nick.
     */
    public unique_nick(): string;

    /**
     * @returns Whether the profile is online.
     */
    public online(): boolean;
  }

  /**
   * GameSpy account operations used by multiplayer menus.
   *
   * @source C++ class account_manager
   * @customConstructor account_manager
   * @group xr_multiplayer
   */
  export class account_manager {
    /**
     * Engine-owned account manager singleton.
     */
    private constructor();

    /**
     * Create a GameSpy profile.
     *
     * @param acc - Account name.
     * @param nick - Public nickname.
     * @param mail - Account email.
     * @param password - Account password.
     * @param cb - Completion callback.
     */
    public create_profile(acc: string, nick: string, mail: string, password: string, cb: account_profiles_cb): void;

    /**
     * Delete the currently logged-in profile.
     *
     * @param operation - Completion callback.
     */
    public delete_profile(operation: account_operation_cb): void;

    /**
     * Fetch profiles registered for an account.
     *
     * @param email - Account email.
     * @param password - Account password.
     * @param cb - Completion callback.
     */
    public get_account_profiles(email: string, password: string, cb: account_profiles_cb): unknown;

    /**
     * @returns Profiles found by the last email search.
     */
    public get_found_profiles(): LuaIterable<string>;

    /**
     * @returns Unique nick suggestions from the last request.
     */
    public get_suggested_unicks(): LuaIterable<string>;

    /**
     * @returns Description of the last validation failure.
     */
    public get_verify_error_descr(): string;

    /**
     * Search for an account email.
     *
     * @param email - Email to search.
     * @param cb - Completion callback.
     */
    public search_for_email(email: string, cb: found_email_cb): void;

    /**
     * Stop the active profile fetch request.
     */
    public stop_fetching_account_profiles(): void;

    /**
     * Stop the active email search request.
     */
    public stop_searching_email(): void;

    /**
     * Stop the active nick suggestion request.
     */
    public stop_suggest_unique_nicks(): void;

    /**
     * Request unique nick suggestions.
     *
     * @param nick - Desired nick.
     * @param b - Completion callback.
     */
    public suggest_unique_nicks(nick: string, b: suggest_nicks_cb): void;

    /**
     * Validate email syntax.
     *
     * @param email - Email to validate.
     * @returns Whether the email is accepted.
     */
    public verify_email(email: string): boolean;

    /**
     * Validate password syntax.
     *
     * @param password - Password to validate.
     * @returns Whether the password is accepted.
     */
    public verify_password(password: string): boolean;

    /**
     * Validate unique nick syntax.
     *
     * @param nick - Nick to validate.
     * @returns Whether the nick is accepted.
     */
    public verify_unique_nick(nick: string): boolean;

    /**
     * @returns Whether profile fetching is active.
     */
    public is_get_account_profiles_active(): boolean;

    /**
     * @returns Whether email search is active.
     */
    public is_email_searching_active(): boolean;
  }

  /**
   * Multiplayer login and saved credential operations.
   *
   * @source C++ class login_manager
   * @customConstructor login_manager
   * @group xr_multiplayer
   */
  export class login_manager {
    /**
     * Engine-owned login manager singleton.
     */
    private constructor();

    /**
     * Open the password recovery URL through the engine.
     *
     * @param url - Recovery page URL.
     */
    public forgot_password(url: string): void;

    /**
     * @returns Current logged-in profile, or null when offline.
     */
    public get_current_profile(): profile | null;

    /**
     * @returns Saved email from registry.
     */
    public get_email_from_registry(): string;

    /**
     * @returns Saved nick from registry.
     */
    public get_nick_from_registry(): string;

    /**
     * @returns Saved password from registry.
     */
    public get_password_from_registry(): string;

    /**
     * @returns Saved remember-me flag.
     */
    public get_remember_me_from_registry(): boolean;

    /**
     * Log in to a GameSpy account.
     *
     * @param mail - Account email.
     * @param profile - Profile nick.
     * @param password - Account password.
     * @param cb - Completion callback.
     */
    public login(mail: string, profile: string, password: string, cb: login_operation_cb): void;

    /**
     * Create an offline login profile.
     *
     * @param nick - Offline nick.
     * @param cb - Completion callback.
     */
    public login_offline(nick: string, cb: login_operation_cb): void;

    /**
     * Log out and clear current profile state.
     */
    public logout(): void;

    /**
     * Save account email to registry.
     */
    public save_email_to_registry(email: string): void;

    /**
     * Save nick to registry.
     */
    public save_nick_to_registry(nick: string): void;

    /**
     * Save password to registry.
     */
    public save_password_to_registry(password: string): void;

    /**
     * Save remember-me flag to registry.
     */
    public save_remember_me_to_registry(remember_me: boolean): void;

    /**
     * Change the unique nick for the current profile.
     *
     * @param nick - New unique nick.
     * @param cb - Completion callback.
     */
    public set_unique_nick(nick: string, cb: login_operation_cb): void;

    /**
     * Stop the active login request.
     */
    public stop_login(): void;

    /**
     * Stop the active unique-nick change request.
     */
    public stop_setting_unique_nick(): void;
  }

  /**
   * @source C++ class award_pair_t
   * @customConstructor award_pair_t
   * @group xr_multiplayer
   */
  export class award_pair_t {
    public readonly first: award_data;
    public readonly second: award_data;
  }

  /**
   * @source C++ class best_scores_pair_t
   * @customConstructor best_scores_pair_t
   * @group xr_multiplayer
   */
  export class best_scores_pair_t {
    public first: award_data;
    public second: award_data;
  }

  /**
   * @source C++ class account_profiles_cb
   * @customConstructor account_profiles_cb
   * @group xr_multiplayer
   */
  export class account_profiles_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with profile count and status description.
     */
    public constructor(object: object, cb: (this: object, code: number, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with profile count and status description.
     */
    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * @source C++ class login_operation_cb
   * @customConstructor login_operation_cb
   * @group xr_multiplayer
   */
  export class login_operation_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with login profile and status description.
     */
    public constructor(object: object, cb: (this: object, profile: profile | null, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with login profile and status description.
     */
    public bind(object: object, cb: (this: object, profile: profile | null, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * @source C++ class connect_error_cb
   * @customConstructor connect_error_cb
   * @group xr_multiplayer
   */
  export class connect_error_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with error code and status description.
     */
    public constructor(object: object, cb: (this: object, code: number, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with error code and status description.
     */
    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * @source C++ class account_operation_cb
   * @customConstructor account_operation_cb
   * @group xr_multiplayer
   */
  export class account_operation_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with result code and status description.
     */
    public constructor(object: object, cb: (this: object, code: number, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with result code and status description.
     */
    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * @source C++ class found_email_cb
   * @customConstructor found_email_cb
   * @group xr_multiplayer
   */
  export class found_email_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with search result and user name or description.
     */
    public constructor(object: object, cb: (this: object, found: boolean, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with search result and user name or description.
     */
    public bind(object: object, cb: (this: object, found: boolean, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * @source C++ class store_operation_cb
   * @customConstructor store_operation_cb
   * @group xr_multiplayer
   */
  export class store_operation_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with progress/result code and status description.
     */
    public constructor(object: object, cb: (this: object, code: number | boolean, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with progress/result code and status description.
     */
    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * @source C++ class suggest_nicks_cb
   * @customConstructor suggest_nicks_cb
   * @group xr_multiplayer
   */
  export class suggest_nicks_cb {
    /**
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with suggestion count and status description.
     */
    public constructor(object: object, cb: (this: object, result: number, description: string) => void);

    /**
     * Replace the bound callback.
     *
     * @param object - Lua object used as callback `this`.
     * @param cb - Called with suggestion count and status description.
     */
    public bind(object: object, cb: (this: object, result: number, description: string) => void): void;

    /**
     * Clear the bound callback.
     */
    public clear(): void;
  }

  /**
   * Multiplayer patch download progress.
   *
   * @source C++ class Patch_Dawnload_Progress
   * @customConstructor Patch_Dawnload_Progress
   * @group xr_multiplayer
   */
  export class Patch_Dawnload_Progress {
    /**
     * @returns Download progress in range used by the patcher.
     */
    public GetProgress(): f32;

    /**
     * @returns Whether a patch download is active.
     */
    public GetInProgress(): boolean;

    /**
     * @returns Current download status text.
     */
    public GetStatus(): string;

    /**
     * @returns Current file name.
     */
    public GetFlieName(): string;
  }

  /**
   * GameSpy profile storage for awards and best scores.
   *
   * @source C++ class profile_store
   * @customConstructor profile_store
   * @group xr_multiplayer
   */
  export class profile_store {
    public static readonly at_award_massacre: 0;
    public static readonly at_awards_count: 30;
    public static readonly bst_backstabs_in_row: 2;
    public static readonly bst_bleed_kills_in_row: 2;
    public static readonly bst_explosive_kills_in_row: 3;
    public static readonly bst_eye_kills_in_row: 4;
    public static readonly bst_head_shots_in_row: 3;
    public static readonly bst_kills_in_row: 0;
    public static readonly bst_kinife_kills_in_row: 1;
    public static readonly bst_score_types_count: 7;

    /**
     * Engine-created profile store.
     */
    protected constructor();

    /**
     * @returns Award counters for the current profile.
     */
    public get_awards(): LuaIterable<award_pair_t>;

    /**
     * @returns Best score counters for the current profile.
     */
    public get_best_scores(): LuaIterable<best_scores_pair_t>;

    /**
     * Load awards and best scores for the current profile.
     *
     * @param onProgress - Progress callback.
     * @param onComlete - Completion callback.
     */
    public load_current_profile(onProgress: store_operation_cb, onComlete: store_operation_cb): void;

    /**
     * Stop the active profile-store load request.
     */
    public stop_loading(): void;
  }

  /**
   * Award or best-score value with the last reward date.
   *
   * @source C++ class award_data
   * @customConstructor award_data
   * @group xr_multiplayer
   */
  export class award_data {
    /**
     * Award count or best-score value.
     */
    public m_count: u16;

    /**
     * Last reward date as stored by GameSpy.
     */
    public m_last_reward_date: u32;
  }

  /**
   * Multiplayer game event ids sent through game state messaging.
   *
   * @source C++ class game_messages
   * @customConstructor game_messages
   * @group xr_multiplayer
   */
  export class game_messages {
    public static GAME_EVENT_ARTEFACT_DESTROYED: 17;
    public static GAME_EVENT_ARTEFACT_DROPPED: 19;
    public static GAME_EVENT_ARTEFACT_ONBASE: 20;
    public static GAME_EVENT_ARTEFACT_SPAWNED: 16;
    public static GAME_EVENT_ARTEFACT_TAKEN: 18;
    public static GAME_EVENT_BUY_MENU_CLOSED: 23;
    public static GAME_EVENT_PLAYER_BUY_FINISHED: 2;
    public static GAME_EVENT_PLAYER_CHANGE_SKIN: 6;
    public static GAME_EVENT_PLAYER_CHANGE_TEAM: 6;
    public static GAME_EVENT_PLAYER_CONNECTED: 8;
    public static GAME_EVENT_PLAYER_DISCONNECTED: 9;
    public static GAME_EVENT_PLAYER_ENTER_TEAM_BASE: 21;
    public static GAME_EVENT_PLAYER_JOIN_TEAM: 13;
    public static GAME_EVENT_PLAYER_KILL: 1;
    public static GAME_EVENT_PLAYER_KILLED: 11;
    public static GAME_EVENT_PLAYER_LEAVE_TEAM_BASE: 22;
    public static GAME_EVENT_PLAYER_READY: 0;
    public static GAME_EVENT_ROUND_END: 15;
    public static GAME_EVENT_ROUND_STARTED: 14;
    public static GAME_EVENT_SCRIPT_BEGINS_FROM: 46;
    public static GAME_EVENT_SKIN_MENU_CLOSED: 25;
    public static GAME_EVENT_TEAM_MENU_CLOSED: 24;

    /**
     * Engine-owned multiplayer event constants.
     */
    protected constructor();
  }

  /**
   * @group xr_multiplayer
   */
  export type TXR_game_message = EnumeratedStaticsValues<game_messages>;

  /**
   * Current multiplayer game state.
   *
   * @source C++ class game_GameState : DLL_Pure
   * @customConstructor game_GameState
   * @group xr_multiplayer
   */
  export class game_GameState extends DLL_Pure {
    /**
     * Current round number.
     */
    public round: i32;

    /**
     * Round or match start time.
     */
    public start_time: u32;

    /**
     * Multiplayer game type id.
     */
    public type: number; /* EGameIDs */

    /**
     * Create an empty multiplayer game state.
     */
    public constructor();

    /**
     * @returns Round or match start time.
     */
    public StartTime(): u32;

    /**
     * @returns Current round number.
     */
    public Round(): i32;

    /**
     * @returns Current game phase.
     */
    public Phase(): u16;

    /**
     * @returns Multiplayer game type id.
     */
    public Type(): number; /* EGameIDs */
  }

  /**
   * Todo:
   *
   *    class_<game_PlayerState, no_bases, default_holder, WrapType>("game_PlayerState")
   *         .def(constructor<>())
   *         .def_readwrite("team", &BaseType::team)
   *         .def_readwrite("kills", &BaseType::m_iRivalKills)
   *         .def_readwrite("deaths", &BaseType::m_iDeaths)
   *         .def_readwrite("money_for_round", &BaseType::money_for_round)
   *         .def_readwrite("flags", &BaseType::flags__)
   *         .def_readwrite("ping", &BaseType::ping)
   *         .def_readwrite("GameID", &BaseType::GameID)
   *         //.def_readwrite("Skip", &BaseType::Skip)
   *         .def_readwrite("lasthitter", &BaseType::lasthitter)
   *         .def_readwrite("lasthitweapon", &BaseType::lasthitweapon)
   *         .def_readwrite("skin", &BaseType::skin)
   *         .def_readwrite("RespawnTime", &BaseType::RespawnTime)
   *         .def_readwrite("money_delta", &BaseType::money_delta).
   *
   *         .def_readwrite("pItemList", &BaseType::pItemList)
   *         .def_readwrite("LastBuyAcount", &BaseType::LastBuyAcount)
   *         .def("testFlag", &BaseType::testFlag)
   *         .def("setFlag", &BaseType::setFlag)
   *         .def("resetFlag", &BaseType::resetFlag)
   *         .def("getName", &BaseType::getName)
   *         .def("setName", &BaseType::setName)
   *         .def("clear", &BaseType::clear, &WrapType::clear_static)
   *         .def("net_Export", &BaseType::net_Export, &WrapType::net_Export_static)
   *         .def("net_Import", &BaseType::net_Import, &WrapType::net_Import_static).
   */
}

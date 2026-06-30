declare module "xray16" {
  /**
   * Metadata stored inside a recorded multiplayer demo.
   *
   * @source C++ class demo_info
   * @customConstructor demo_info
   * @group xr_multiplayer
   *
   * @remarks
   * Read-only metadata from a recorded multiplayer demo file.
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
     * @remarks
     * Index must be lower than {@link demo_info.get_players_count}.
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
   *
   * @remarks
   * Main-menu GameSpy account service. Requests are asynchronous, but validation errors may call the callback
   * immediately before any network work starts.
   */
  export class account_manager {
    /**
     * Engine-owned account manager singleton.
     */
    private constructor();

    /**
     * Create a GameSpy profile.
     *
     * @remarks
     * Validates nickname, unique nick, email, and password before sending the request. On validation failure the
     * callback receives a translated status key and no profile is created.
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
     * @remarks
     * Requires an online current profile. Without one, the callback reports a not-logged-in status.
     *
     * @param operation - Completion callback.
     */
    public delete_profile(operation: account_operation_cb): void;

    /**
     * Fetch profiles registered for an account.
     *
     * @remarks
     * Clears previous profile-search results before starting the request. Use
     * {@link account_manager.get_found_profiles} after the completion callback.
     *
     * @param email - Account email.
     * @param password - Account password.
     * @param cb - Completion callback.
     */
    public get_account_profiles(email: string, password: string, cb: account_profiles_cb): unknown;

    /**
     * Get profiles found by the last email search.
     *
     * @remarks
     * Result list is replaced by each account-profile fetch.
     *
     * @returns Profiles found by the last email search.
     */
    public get_found_profiles(): LuaIterable<string>;

    /**
     * Get unique nick suggestions from the last request.
     *
     * @remarks
     * Result list is replaced by each suggestion request.
     *
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
     * @remarks
     * Empty emails are rejected immediately through the callback.
     *
     * @param email - Email to search.
     * @param cb - Completion callback.
     */
    public search_for_email(email: string, cb: found_email_cb): void;

    /**
     * Stop the active profile fetch request.
     *
     * @remarks
     * Safe to call when no fetch is active.
     */
    public stop_fetching_account_profiles(): void;

    /**
     * Stop the active email search request.
     *
     * @remarks
     * Safe to call when no search is active.
     */
    public stop_searching_email(): void;

    /**
     * Stop the active nick suggestion request.
     *
     * @remarks
     * Safe to call when no suggestion request is active.
     */
    public stop_suggest_unique_nicks(): void;

    /**
     * Request unique nick suggestions.
     *
     * @remarks
     * Starts an asynchronous request and replaces the previous suggestion list when it completes.
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
   *
   * @remarks
   * Main-menu login service with one current profile. Log out before starting another online login.
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
     * Get the current logged-in profile.
     *
     * @remarks
     * Offline login also creates a profile object, but it is not an online GameSpy session.
     *
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
     * @remarks
     * Starts an asynchronous login. If another profile is already active, native code reports that logout is needed
     * first.
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
     * @remarks
     * Rejects empty or whitespace-only nicknames. Does not contact GameSpy.
     *
     * @param nick - Offline nick.
     * @param cb - Completion callback.
     */
    public login_offline(nick: string, cb: login_operation_cb): void;

    /**
     * Log out and clear current profile state.
     *
     * @remarks
     * Online profiles disconnect from GameSpy. Any account-manager requests tied to the session may need to be
     * restarted afterward.
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
     * @remarks
     * Requires a current profile and a non-empty unique nick. Offline profiles update locally; online profiles send a
     * GameSpy request.
     *
     * @param nick - New unique nick.
     * @param cb - Completion callback.
     */
    public set_unique_nick(nick: string, cb: login_operation_cb): void;

    /**
     * Stop the active login request.
     *
     * @remarks
     * Safe to call when no login is active.
     */
    public stop_login(): void;

    /**
     * Stop the active unique-nick change request.
     *
     * @remarks
     * Safe to call when no unique-nick request is active.
     */
    public stop_setting_unique_nick(): void;
  }

  /**
   * Multiplayer data binding for `award_pair_t`.
   *
   * @source C++ class award_pair_t
   * @customConstructor award_pair_t
   * @group xr_multiplayer
   */
  export class award_pair_t {
    /**
     * Award id and value for the pair key.
     */
    public readonly first: award_data;

    /**
     * Award id and value for the pair payload.
     */
    public readonly second: award_data;
  }

  /**
   * Multiplayer data binding for `best_scores_pair_t`.
   *
   * @source C++ class best_scores_pair_t
   * @customConstructor best_scores_pair_t
   * @group xr_multiplayer
   */
  export class best_scores_pair_t {
    /**
     * Best-score id and value for the pair key.
     */
    public first: award_data;

    /**
     * Best-score id and value for the pair payload.
     */
    public second: award_data;
  }

  /**
   * Multiplayer callback binding for `account_profiles_cb`.
   *
   * @source C++ class account_profiles_cb
   * @customConstructor account_profiles_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Keeps the Lua callback target and function together for asynchronous account requests.
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
     *
     * @remarks
     * After clearing, native completion has no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer callback binding for `login_operation_cb`.
   *
   * @source C++ class login_operation_cb
   * @customConstructor login_operation_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Keeps the Lua callback target and function together for asynchronous login requests.
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
     *
     * @remarks
     * After clearing, native completion has no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer callback binding for `connect_error_cb`.
   *
   * @source C++ class connect_error_cb
   * @customConstructor connect_error_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Used by multiplayer server-list connection attempts.
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
     *
     * @remarks
     * After clearing, native connection errors have no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer callback binding for `account_operation_cb`.
   *
   * @source C++ class account_operation_cb
   * @customConstructor account_operation_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Keeps the Lua callback target and function together for account operations with a status code.
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
     *
     * @remarks
     * After clearing, native completion has no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer callback binding for `found_email_cb`.
   *
   * @source C++ class found_email_cb
   * @customConstructor found_email_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Used by account email lookup requests.
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
     *
     * @remarks
     * After clearing, native completion has no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer callback binding for `store_operation_cb`.
   *
   * @source C++ class store_operation_cb
   * @customConstructor store_operation_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Used by profile-store operations. Completion can report either numeric progress/status or boolean success.
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
     *
     * @remarks
     * After clearing, native profile-store completion has no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer callback binding for `suggest_nicks_cb`.
   *
   * @source C++ class suggest_nicks_cb
   * @customConstructor suggest_nicks_cb
   * @group xr_multiplayer
   *
   * @remarks
   * Used by unique-nick suggestion requests.
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
     *
     * @remarks
     * After clearing, native completion has no Lua function to call.
     */
    public clear(): void;
  }

  /**
   * Multiplayer patch download progress.
   *
   * @source C++ class Patch_Dawnload_Progress
   * @customConstructor Patch_Dawnload_Progress
   * @group xr_multiplayer
   *
   * @remarks
   * Name and `GetFlieName` spelling are preserved from the engine binding.
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
   *
   * @remarks
   * Reads award and best-score data for the current online GameSpy profile.
   */
  export class profile_store {
    /**
     * Engine enum value for `profile_store.at_award_massacre`.
     */
    public static readonly at_award_massacre: 0;
    /**
     * Engine enum value for `profile_store.at_awards_count`.
     */
    public static readonly at_awards_count: 30;
    /**
     * Engine enum value for `profile_store.bst_backstabs_in_row`.
     */
    public static readonly bst_backstabs_in_row: 2;
    /**
     * Engine enum value for `profile_store.bst_bleed_kills_in_row`.
     */
    public static readonly bst_bleed_kills_in_row: 2;
    /**
     * Engine enum value for `profile_store.bst_explosive_kills_in_row`.
     */
    public static readonly bst_explosive_kills_in_row: 3;
    /**
     * Engine enum value for `profile_store.bst_eye_kills_in_row`.
     */
    public static readonly bst_eye_kills_in_row: 4;
    /**
     * Engine enum value for `profile_store.bst_head_shots_in_row`.
     */
    public static readonly bst_head_shots_in_row: 3;
    /**
     * Engine enum value for `profile_store.bst_kills_in_row`.
     */
    public static readonly bst_kills_in_row: 0;
    /**
     * Engine enum value for `profile_store.bst_kinife_kills_in_row`.
     */
    public static readonly bst_kinife_kills_in_row: 1;
    /**
     * Engine enum value for `profile_store.bst_score_types_count`.
     */
    public static readonly bst_score_types_count: 7;

    /**
     * Engine-created profile store.
     */
    protected constructor();

    /**
     * Get award counters for the current profile.
     *
     * @remarks
     * Values are meaningful after {@link profile_store.load_current_profile} completes successfully.
     *
     * @returns Award counters for the current profile.
     */
    public get_awards(): LuaIterable<award_pair_t>;

    /**
     * Get best score counters for the current profile.
     *
     * @remarks
     * Values are meaningful after {@link profile_store.load_current_profile} completes successfully.
     *
     * @returns Best score counters for the current profile.
     */
    public get_best_scores(): LuaIterable<best_scores_pair_t>;

    /**
     * Load awards and best scores for the current profile.
     *
     * @remarks
     * Requires a current online profile. The completion callback reports the final result; the progress callback is
     * accepted by the binding for profile-store operations.
     *
     * @param onProgress - Progress callback.
     * @param onComplete - Completion callback.
     */
    public load_current_profile(onProgress: store_operation_cb, onComplete: store_operation_cb): void;

    /**
     * Stop the active profile-store load request.
     *
     * @remarks
     * Safe to call when no profile-store load is active.
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
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ARTEFACT_DESTROYED`.
     */
    public static GAME_EVENT_ARTEFACT_DESTROYED: 17;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ARTEFACT_DROPPED`.
     */
    public static GAME_EVENT_ARTEFACT_DROPPED: 19;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ARTEFACT_ONBASE`.
     */
    public static GAME_EVENT_ARTEFACT_ONBASE: 20;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ARTEFACT_SPAWNED`.
     */
    public static GAME_EVENT_ARTEFACT_SPAWNED: 16;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ARTEFACT_TAKEN`.
     */
    public static GAME_EVENT_ARTEFACT_TAKEN: 18;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_BUY_MENU_CLOSED`.
     */
    public static GAME_EVENT_BUY_MENU_CLOSED: 23;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_BUY_FINISHED`.
     */
    public static GAME_EVENT_PLAYER_BUY_FINISHED: 2;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_CHANGE_SKIN`.
     */
    public static GAME_EVENT_PLAYER_CHANGE_SKIN: 6;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_CHANGE_TEAM`.
     */
    public static GAME_EVENT_PLAYER_CHANGE_TEAM: 6;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_CONNECTED`.
     */
    public static GAME_EVENT_PLAYER_CONNECTED: 8;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_DISCONNECTED`.
     */
    public static GAME_EVENT_PLAYER_DISCONNECTED: 9;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_ENTER_TEAM_BASE`.
     */
    public static GAME_EVENT_PLAYER_ENTER_TEAM_BASE: 21;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_JOIN_TEAM`.
     */
    public static GAME_EVENT_PLAYER_JOIN_TEAM: 13;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_KILL`.
     */
    public static GAME_EVENT_PLAYER_KILL: 1;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_KILLED`.
     */
    public static GAME_EVENT_PLAYER_KILLED: 11;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_LEAVE_TEAM_BASE`.
     */
    public static GAME_EVENT_PLAYER_LEAVE_TEAM_BASE: 22;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_PLAYER_READY`.
     */
    public static GAME_EVENT_PLAYER_READY: 0;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ROUND_END`.
     */
    public static GAME_EVENT_ROUND_END: 15;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_ROUND_STARTED`.
     */
    public static GAME_EVENT_ROUND_STARTED: 14;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_SCRIPT_BEGINS_FROM`.
     */
    public static GAME_EVENT_SCRIPT_BEGINS_FROM: 46;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_SKIN_MENU_CLOSED`.
     */
    public static GAME_EVENT_SKIN_MENU_CLOSED: 25;
    /**
     * Engine enum value for `game_messages.GAME_EVENT_TEAM_MENU_CLOSED`.
     */
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
   *
   * @remarks
   * Multiplayer match state, not single-player task or story state. `type` uses raw engine `EGameIDs` values.
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

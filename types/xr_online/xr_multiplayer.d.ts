declare module "xray16" {
  /**
   * @source C++ class demo_info
   * @customConstructor demo_info
   * @group xr_multiplayer
   */
  export class demo_info {
    protected constructor();

    public get_author_name(): string;
    public get_game_score(): string;
    public get_game_type(): string;
    public get_map_name(): string;
    public get_map_version(): string;
    public get_player(value: u32): demo_player_info;
    public get_players_count(): u32;
  }

  /**
   * @source C++ class demo_player_info
   * @customConstructor demo_player_info
   * @group xr_multiplayer
   */
  export class demo_player_info {
    public get_artefacts(): u16;
    public get_deaths(): i16;
    public get_frags(): i16;
    public get_name(): string;
    public get_rank(): u8;
    public get_spots(): i16;
    public get_team(): u8;
  }

  /**
   * @source C++ class SServerFilters
   * @customConstructor SServerFilters
   * @group xr_multiplayer
   */
  export class SServerFilters {
    public empty: boolean;
    public full: boolean;
    public listen_servers: boolean;
    public with_pass: boolean;
    public without_ff: boolean;
    public without_pass: boolean;

    public constructor();
  }

  /**
   * @source C++ class profile
   * @customConstructor XR_profile
   * @group xr_multiplayer
   */
  export class profile {
    public unique_nick(): string;
    public online(): boolean;
  }

  /**
   * @source C++ class account_manager
   * @customConstructor account_manager
   * @group xr_multiplayer
   */
  export class account_manager {
    private constructor();

    public create_profile(acc: string, nick: string, mail: string, password: string, cb: account_profiles_cb): void;
    public delete_profile(operation: account_operation_cb): void;
    public get_account_profiles(email: string, password: string, cb: account_profiles_cb): unknown;
    public get_found_profiles(): LuaIterable<string>;
    public get_suggested_unicks(): LuaIterable<string>;
    public get_verify_error_descr(): string;
    public search_for_email(email: string, cb: found_email_cb): void;
    public stop_fetching_account_profiles(): void;
    public stop_searching_email(): void;
    public stop_suggest_unique_nicks(): void;
    public suggest_unique_nicks(nick: string, b: suggest_nicks_cb): void;
    public verify_email(email: string): boolean;
    public verify_password(password: string): boolean;
    public verify_unique_nick(nick: string): boolean;
    public is_get_account_profiles_active(): boolean;
    public is_email_searching_active(): boolean;
  }

  /**
   * @source C++ class login_manager
   * @customConstructor login_manager
   * @group xr_multiplayer
   */
  export class login_manager {
    private constructor();

    public forgot_password(url: string): void;
    public get_current_profile(): profile | null;
    public get_email_from_registry(): string;
    public get_nick_from_registry(): string;
    public get_password_from_registry(): string;
    public get_remember_me_from_registry(): boolean;
    public login(mail: string, profile: string, password: string, cb: login_operation_cb): void;
    public login_offline(nick: string, cb: login_operation_cb): void;
    public logout(): void;
    public save_email_to_registry(email: string): void;
    public save_nick_to_registry(nick: string): void;
    public save_password_to_registry(password: string): void;
    public save_remember_me_to_registry(remember_me: boolean): void;
    public set_unique_nick(nick: string, cb: login_operation_cb): void;
    public stop_login(): void;
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
    public constructor(object: object, cb: (this: object, code: number, description: string) => void);

    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class login_operation_cb
   * @customConstructor login_operation_cb
   * @group xr_multiplayer
   */
  export class login_operation_cb {
    public constructor(object: object, cb: (this: object, profile: profile | null, description: string) => void);

    public bind(object: object, cb: (this: object, profile: profile | null, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class connect_error_cb
   * @customConstructor connect_error_cb
   * @group xr_multiplayer
   */
  export class connect_error_cb {
    public constructor(object: object, cb: (this: object, code: number, description: string) => void);

    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class account_operation_cb
   * @customConstructor account_operation_cb
   * @group xr_multiplayer
   */
  export class account_operation_cb {
    public constructor(object: object, cb: (this: object, code: number, description: string) => void);

    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class found_email_cb
   * @customConstructor found_email_cb
   * @group xr_multiplayer
   */
  export class found_email_cb {
    public constructor(object: object, cb: (this: object, found: boolean, description: string) => void);

    public bind(object: object, cb: (this: object, found: boolean, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class store_operation_cb
   * @customConstructor store_operation_cb
   * @group xr_multiplayer
   */
  export class store_operation_cb {
    public constructor(object: object, cb: (this: object, code: number | boolean, description: string) => void);

    public bind(object: object, cb: (this: object, code: number, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class suggest_nicks_cb
   * @customConstructor suggest_nicks_cb
   * @group xr_multiplayer
   */
  export class suggest_nicks_cb {
    public constructor(object: object, cb: (this: object, result: number, description: string) => void);

    public bind(object: object, cb: (this: object, result: number, description: string) => void): void;
    public clear(): void;
  }

  /**
   * @source C++ class Patch_Dawnload_Progress
   * @customConstructor Patch_Dawnload_Progress
   * @group xr_multiplayer
   */
  export class Patch_Dawnload_Progress {
    public GetProgress(): f32;
    public GetInProgress(): boolean;
    public GetStatus(): string;
    public GetFlieName(): string;
  }

  /**
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

    protected constructor();

    public get_awards(): LuaIterable<award_pair_t>;
    public get_best_scores(): LuaIterable<best_scores_pair_t>;
    public load_current_profile(onProgress: store_operation_cb, onComlete: store_operation_cb): void;
    public stop_loading(): void;
  }

  /**
   * @source C++ class award_data
   * @customConstructor award_data
   * @group xr_multiplayer
   */
  export class award_data {
    public m_count: u16;
    public m_last_reward_date: u32;
  }

  /**
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

    protected constructor();
  }

  /**
   * @group xr_multiplayer
   */
  export type TXR_game_message = EnumeratedStaticsValues<game_messages>;
}

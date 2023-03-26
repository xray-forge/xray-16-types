declare module "xray16" {
  /**
   * @source C++ class DLL_Pure
   * @group xr_core
   */
  export class XR_DLL_Pure extends XR_EngineBinding {
    protected constructor();
  }

  /**
   * @source C++ class GameGraph__CVertex
   * @group xr_core
   */
  export class XR_GameGraph__CVertex extends XR_EngineBinding {
    protected constructor();

    public level_vertex_id(): u32;
    public level_id(): u8;
    public game_point(): XR_vector;
    public level_point(): XR_vector;
  }

  /**
   * @source C++ class ce_script_zone : DLL_Pure
   * @group xr_core
   */
  export class XR_ce_script_zone extends XR_DLL_Pure {
    protected constructor();
  }

  /**
   * @source C++ class ce_smart_zone : DLL_Pure
   * @group xr_core
   */
  export class XR_ce_smart_zone extends XR_DLL_Pure {
    protected constructor();
  }

  /**
   * @source C++ class explosive
   * @customConstructor explosive
   * @group xr_core
   */
  export class XR_explosive extends XR_EngineBinding {
    protected constructor();

    public explode(): void;
  }

  /**
   * @source C++ class ClientID
   * @customConstructor ClientID
   * @group xr_core
   */
  export class XR_ClientID extends XR_EngineBinding {
    protected constructor();

    public value(): u32;
    public set(value: u32): void;
  }

  /**
   * @source C++ class memory_object
   * @customConstructor memory_object
   * @group xr_core
   */
  export class XR_memory_object extends XR_EngineBinding {
    public readonly last_level_time: u32;
    public readonly level_time: u32;

    protected constructor();
  }

  /**
   * @source C++ class object
   * @customConstructor object
   * @group xr_core
   */
  export class XR_object extends XR_EngineBinding {
    public static readonly activate: 16;
    public static readonly aim1: 4;
    public static readonly aim2: 5;
    public static readonly deactivate: 17;
    public static readonly drop: 11;
    public static readonly dummy: -1;
    public static readonly fire1: 6;
    public static readonly fire2: 8;
    public static readonly hide: 22;
    public static readonly idle: 9;
    public static readonly reload: 2;
    public static readonly reload1: 2;
    public static readonly reload2: 3;
    public static readonly show: 21;
    public static readonly strap: 10;
    public static readonly switch1: 0;
    public static readonly switch2: 1;
    public static readonly take: 23;
    public static readonly turn_off: 20;
    public static readonly turn_on: 19;
    public static readonly use: 18;

    public constructor(value: string);
    public constructor(value: string, type: number /* MonsterSpace::EObjectAction */);
    public constructor(game_object: XR_game_object);

    public action(space: unknown /** enum MonsterSpace::EObjectAction */): void;
    public completed(): boolean;
  }

  /**
   * @group xr_core
   */
  export type TXR_object_state = EnumeratedStaticsValues<typeof XR_object>;

  /**
   * @source C++ class entity_memory_object : memory_object
   * @customConstructor entity_memory_object
   * @group xr_core
   */
  export class XR_entity_memory_object extends XR_memory_object {
    public readonly object_info: object;
    public readonly self_info: object;

    protected constructor();

    public object(): XR_game_object;
  }

  /**
   * @source C++ class hit_memory_object : entity_memory_object
   * @customConstructor hit_memory_object
   * @group xr_core
   */
  export class XR_hit_memory_object extends XR_entity_memory_object {
    public readonly amount: f32;
    public readonly bone_index: u16;
    public readonly direction: XR_vector;

    protected constructor();
  }

  /**
   * @source C++ class game_memory_object : memory_object
   * @customConstructor game_memory_object
   * @group xr_core
   */
  export class XR_game_memory_object extends XR_memory_object {
    public object_info: unknown; /* MemorySpace::CObjectParams<class CGameObject>& */
    public self_info: unknown; /* MemorySpace::CObjectParams<class CGameObject>& */
    public object(): XR_game_object;

    protected constructor();
  }

  /**
   * @source C++ class not_yet_visible_object
   * @customConstructor not_yet_visible_object
   * @group xr_core
   */
  export class XR_not_yet_visible_object extends XR_EngineBinding {
    protected constructor();

    public value: f32;
    public object(): XR_game_object;
  }

  /**
   * @source C++ class visible_memory_object
   * @customConstructor visible_memory_object
   * @group xr_core
   */
  export class XR_visible_memory_object extends XR_game_memory_object {
    protected constructor();
  }

  /**
   * @source C++ class memory_info : visible_memory_object
   * @customConstructor visible_memory_object
   * @group xr_core
   */
  export class XR_memory_info extends XR_visible_memory_object {
    public readonly hit_info: boolean;
    public readonly sound_info: boolean;
    public readonly visual_info: boolean;

    protected constructor();
  }

  /**
   * @source C++ class CTime
   * @customConstructor CTime
   * @group xr_core
   */
  export class XR_CTime extends XR_EngineBinding {
    public static DateToDay: 0;
    public static DateToMonth: 1;
    public static DateToYear: 2;
    public static TimeToHours: 0;
    public static TimeToMilisecs: 3;
    public static TimeToMinutes: 1;
    public static TimeToSeconds: 2;

    public constructor();
    public constructor(time: XR_CTime);

    public add(time: XR_CTime): void;
    public dateToString(time: i32): string;
    public diffSec(time: XR_CTime): f32;
    public get(
      y: u32,
      m: u32,
      d: u32,
      h: u32,
      min: u32,
      sec: u32,
      ms: u32
    ): LuaMultiReturn<[u32, u32, u32, u32, u32, u32, u32]>;
    public set(y: i32, m: i32, d: i32, h: i32, min: i32, sec: i32, ms: i32): void;
    public setHMS(a: i32, b: i32, c: i32): void;
    public setHMSms(a: i32, b: i32, c: i32, d: i32): void;
    public sub(time: XR_CTime): void;
    public timeToString(time: i32): string;
  }

  /**
   * @source C++ class CConsole
   * @customConstructor CConsole
   * @group xr_core
   */
  export class XR_CConsole extends XR_EngineBinding {
    private constructor();

    public execute(command: string): void;
    public execute_deferred(command: string): void;
    public execute_script(script: string): void;

    public show(): void;
    public hide(): void;

    public get_bool(key: string): boolean;
    public get_float(key: string): f32;
    public get_integer(key: string): i32;
    public get_string(key: string): string;
    public get_token(key: string): string;
  }

  /**
   * @source C++ class game_GameState : DLL_Pure
   * @customConstructor game_GameState
   * @group xr_core
   */
  export class XR_game_GameState extends XR_DLL_Pure {
    public round: i32;
    public start_time: u32;
    public type: number; /* EGameIDs */

    public constructor();

    public StartTime(): u32;
    public Round(): i32;
    public Phase(): u16;
    public Type(): number; /* EGameIDs */
  }

  /**
   * @source C++ class class_info_data
   * @customConstructor class_info_data
   * @group xr_core
   */
  export class XR_class_info_data extends XR_EngineBinding {
    public readonly methods: object;
    public readonly attributes: object;
    public readonly name: string;

    private constructor();
  }

  /**
   * @source C++ class render_device
   * @customConstructor render_device
   * @group xr_core
   */
  export class XR_render_device {
    private constructor();

    public readonly cam_dir: XR_vector;
    public readonly cam_pos: XR_vector;
    public readonly cam_right: XR_vector;
    public readonly cam_top: XR_vector;
    public readonly aspect_ratio: f32;
    public readonly fov: f32;
    public readonly precache_frame: u32;
    public readonly frame: u32;
    public readonly height: u32;
    public readonly time_delta: u32;
    public readonly f_time_delta: f32;
    public readonly width: u32;

    public time_global(): u32;
    public is_paused(): boolean;
    public pause(paused: boolean): void;
  }

  /**
   * @source C++ class cef_storage
   * @customConstructor cef_storage
   * @group xr_core
   */
  export class XR_cef_storage extends XR_EngineBinding {
    private constructor();

    public evaluate(str: string, game_object: XR_game_object): f32;
    public evaluate(str: string, game_object1: XR_game_object, game_object2: XR_game_object): f32;
    public evaluate(
      str: string,
      game_object1: XR_game_object,
      game_object2: XR_game_object,
      game_object3: XR_game_object
    ): f32;
    public evaluate(
      str: string,
      game_object1: XR_game_object,
      game_object2: XR_game_object,
      game_object3: XR_game_object,
      game_object4: XR_game_object
    ): f32;
    public evaluate(str: string, cse_alife_object: XR_cse_alife_object): f32;
    public evaluate(str: string, cse_alife_object1: XR_cse_alife_object, cse_alife_object2: XR_cse_alife_object): f32;
    public evaluate(
      str: string,
      cse_alife_object1: XR_cse_alife_object,
      cse_alife_object2: XR_cse_alife_object,
      cse_alife_object3: XR_cse_alife_object
    ): f32;
    public evaluate(
      str: string,
      cse_alife_object1: XR_cse_alife_object,
      cse_alife_object2: XR_cse_alife_object,
      cse_alife_object3: XR_cse_alife_object,
      cse_alife_object4: XR_cse_alife_object
    ): f32;
  }
}

declare module "xray16" {
  /**
   * @source C++ class memory_object
   * @customConstructor memory_object
   * @group xr_memory
   */
  export class memory_object extends EngineBinding {
    public readonly last_level_time: u32;
    public readonly level_time: u32;

    protected constructor();
  }

  /**
   * @source C++ class entity_memory_object : memory_object
   * @customConstructor entity_memory_object
   * @group xr_memory
   */
  export class entity_memory_object extends memory_object {
    public readonly object_info: object;
    public readonly self_info: object;

    protected constructor();

    public object(): game_object;
  }

  /**
   * @source C++ class object_params
   * @customConstructor object_params
   * @group xr_memory
   */
  export class object_params {
    public level_vertex: u32;
    public position: vector;

    private constructor();
  }

  /**
   * @source C++ class hit_memory_object : entity_memory_object
   * @customConstructor hit_memory_object
   * @group xr_memory
   */
  export class hit_memory_object extends entity_memory_object {
    public readonly amount: f32;
    public readonly bone_index: u16;
    public readonly direction: vector;

    protected constructor();
  }

  /**
   * @source C++ class game_memory_object : memory_object
   * @customConstructor game_memory_object
   * @group xr_memory
   */
  export class game_memory_object extends memory_object {
    public object_info: unknown; /* MemorySpace::CObjectParams<class CGameObject>& */
    public self_info: unknown; /* MemorySpace::CObjectParams<class CGameObject>& */
    public object(): game_object;

    protected constructor();
  }

  /**
   * @source C++ class not_yet_visible_object
   * @customConstructor not_yet_visible_object
   * @group xr_memory
   */
  export class not_yet_visible_object extends EngineBinding {
    protected constructor();

    public value: f32;
    public object(): game_object;
  }

  /**
   * @source C++ class visible_memory_object
   * @customConstructor visible_memory_object
   * @group xr_memory
   */
  export class visible_memory_object extends game_memory_object {
    protected constructor();
  }

  /**
   * @source C++ class memory_info : visible_memory_object
   * @customConstructor visible_memory_object
   * @group xr_memory
   */
  export class memory_info extends visible_memory_object {
    public readonly hit_info: boolean;
    public readonly sound_info: boolean;
    public readonly visual_info: boolean;

    protected constructor();
  }

  /**
   * @source C++ class sound_memory_object : game_memory_object
   * @customConstructor sound_memory_object
   * @group xr_memory
   */
  export class sound_memory_object extends game_memory_object {
    public readonly power: f32;

    protected constructor();

    public type(): i32;
  }

  /**
   * @source C++ class danger_object
   * @customConstructor danger_object
   * @group xr_memory
   */
  export class danger_object {
    public static attack_sound: 1;
    public static attacked: 5;
    public static bullet_ricochet: 0;
    public static enemy_sound: 7;
    public static entity_attacked: 2;
    public static entity_corpse: 4;
    public static entity_death: 3;
    public static grenade: 6;
    public static hit: 2;
    public static sound: 1;
    public static visual: 0;

    public type(): TXR_danger_object;
    public time(): u32;
    public position(): vector;
    public object(): game_object;
    public perceive_type(): number; /* CDangerObject::EDangerPerceiveType */
    public dependent_object(): game_object;
  }

  /**
   * @group xr_memory
   */
  export type TXR_danger_objects = typeof danger_object;

  /**
   * @group xr_memory
   */
  export type TXR_danger_object = EnumeratedStaticsValues<TXR_danger_objects>;
}

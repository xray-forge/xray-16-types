declare module "xray16" {
  /**
   * Base memory record with timing information.
   *
   * @source C++ class memory_object
   * @customConstructor memory_object
   * @group xr_memory
   */
  export class memory_object extends EngineBinding {
    public readonly last_level_time: u32;
    public readonly level_time: u32;

    /**
     * Engine-created memory record.
     */
    protected constructor();
  }

  /**
   * Memory record that points to a living entity.
   *
   * @source C++ class entity_memory_object : memory_object
   * @customConstructor entity_memory_object
   * @group xr_memory
   */
  export class entity_memory_object extends memory_object {
    public readonly object_info: object_params;
    public readonly self_info: object_params;

    /**
     * Engine-created entity memory record.
     */
    protected constructor();

    /**
     * @returns Remembered game object.
     */
    public object(): game_object;
  }

  /**
   * Position and level-vertex snapshot for a remembered object.
   *
   * @source C++ class object_params
   * @customConstructor object_params
   * @group xr_memory
   */
  export class object_params {
    public level_vertex: u32;
    public position: vector;

    /**
     * Engine-created object memory snapshot.
     */
    private constructor();
  }

  /**
   * Memory record for a hit received by an entity.
   *
   * @source C++ class hit_memory_object : entity_memory_object
   * @customConstructor hit_memory_object
   * @group xr_memory
   */
  export class hit_memory_object extends entity_memory_object {
    public readonly amount: f32;
    public readonly bone_index: u16;
    public readonly direction: vector;

    /**
     * Engine-created hit memory record.
     */
    protected constructor();
  }

  /**
   * Memory record that points to a game object.
   *
   * @source C++ class game_memory_object : memory_object
   * @customConstructor game_memory_object
   * @group xr_memory
   */
  export class game_memory_object extends memory_object {
    public readonly object_info: object_params;
    public readonly self_info: object_params;

    /**
     * @returns Remembered game object.
     */
    public object(): game_object;

    /**
     * Engine-created game object memory record.
     */
    protected constructor();
  }

  /**
   * Visual memory candidate that has not become fully visible yet.
   *
   * @source C++ class not_yet_visible_object
   * @customConstructor not_yet_visible_object
   * @group xr_memory
   */
  export class not_yet_visible_object extends EngineBinding {
    /**
     * Engine-created pending visibility record.
     */
    protected constructor();

    public value: f32;

    /**
     * @returns Candidate game object.
     */
    public object(): game_object;
  }

  /**
   * Memory record for a visible object.
   *
   * @source C++ class visible_memory_object
   * @customConstructor visible_memory_object
   * @group xr_memory
   */
  export class visible_memory_object extends game_memory_object {
    /**
     * Engine-created visible object record.
     */
    protected constructor();
  }

  /**
   * Combined visible, sound, and hit memory flags for one object.
   *
   * @source C++ class memory_info : visible_memory_object
   * @customConstructor visible_memory_object
   * @group xr_memory
   */
  export class memory_info extends visible_memory_object {
    public readonly hit_info: boolean;
    public readonly sound_info: boolean;
    public readonly visual_info: boolean;

    /**
     * Engine-created combined memory record.
     */
    protected constructor();
  }

  /**
   * Memory record for a heard object or sound event.
   *
   * @source C++ class sound_memory_object : game_memory_object
   * @customConstructor sound_memory_object
   * @group xr_memory
   */
  export class sound_memory_object extends game_memory_object {
    public readonly power: f32;

    /**
     * Engine-created sound memory record.
     */
    protected constructor();

    /**
     * @returns Sound type id.
     */
    public type(): i32;
  }

  /**
   * AI danger event remembered by an object.
   *
   * @source C++ class danger_object
   * @customConstructor danger_object
   * @group xr_memory
   */
  export class danger_object {
    /**
     * Engine enum value for `danger_object.attack_sound`.
     */
    public static attack_sound: 1;
    /**
     * Engine enum value for `danger_object.attacked`.
     */
    public static attacked: 5;
    /**
     * Engine enum value for `danger_object.bullet_ricochet`.
     */
    public static bullet_ricochet: 0;
    /**
     * Engine enum value for `danger_object.enemy_sound`.
     */
    public static enemy_sound: 7;
    /**
     * Engine enum value for `danger_object.entity_attacked`.
     */
    public static entity_attacked: 2;
    /**
     * Engine enum value for `danger_object.entity_corpse`.
     */
    public static entity_corpse: 4;
    /**
     * Engine enum value for `danger_object.entity_death`.
     */
    public static entity_death: 3;
    /**
     * Engine enum value for `danger_object.grenade`.
     */
    public static grenade: 6;
    /**
     * Engine enum value for `danger_object.hit`.
     */
    public static hit: 2;
    /**
     * Engine enum value for `danger_object.sound`.
     */
    public static sound: 1;
    /**
     * Engine enum value for `danger_object.visual`.
     */
    public static visual: 0;

    /**
     * @returns Danger type.
     */
    public type(): TXR_danger_object;

    /**
     * @returns Game time when the danger was registered.
     */
    public time(): u32;

    /**
     * @returns Danger position.
     */
    public position(): vector;

    /**
     * @returns Source object, or `null` when the source is not a game object.
     */
    public object(): game_object | null;

    /**
     * @returns How the danger was perceived.
     */
    public perceive_type(): number; /* CDangerObject::EDangerPerceiveType */

    /**
     * @returns Dependent object, or `null` when there is none.
     */
    public dependent_object(): game_object | null;
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

import type { Nullable } from "../internal";

declare module "xray16" {
  /**
   * Base memory record with timing information.
   *
   * @source C++ class memory_object
   * @customConstructor memory_object
   * @group xr_memory
   *
   * @remarks
   * Memory records are snapshots owned by the AI memory managers. Treat them as short-lived views of current memory
   * state.
   */
  export class memory_object extends EngineBinding {
    /**
     * Previous level time recorded for this memory entry.
     */
    public readonly last_level_time: u32;

    /**
     * Level time when this memory entry was last updated.
     */
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
   *
   * @remarks
   * Used for entity-alive memories such as hit records.
   */
  export class entity_memory_object extends memory_object {
    /**
     * Snapshot of the remembered entity.
     */
    public readonly object_info: object_params;

    /**
     * Snapshot of the object that owns this memory.
     */
    public readonly self_info: object_params;

    /**
     * Engine-created entity memory record.
     */
    protected constructor();

    /**
     * Get the remembered entity.
     *
     * @remarks
     * The binding expects the native memory record to still point to a live object.
     *
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
   *
   * @remarks
   * Filled from the object's AI location and center position at the moment the memory record was updated.
   */
  export class object_params {
    /**
     * Level graph vertex recorded for the object.
     */
    public level_vertex: u32;

    /**
     * World position recorded for the object.
     */
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
   *
   * @remarks
   * Exposed through stalker/monster hit memory. The direction and amount describe the remembered hit, not the current
   * object state.
   */
  export class hit_memory_object extends entity_memory_object {
    /**
     * Hit power remembered by AI.
     */
    public readonly amount: f32;

    /**
     * Bone that received the hit.
     */
    public readonly bone_index: u16;

    /**
     * Hit direction.
     */
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
   *
   * @remarks
   * Used for visual and sound memories of game objects.
   */
  export class game_memory_object extends memory_object {
    /**
     * Snapshot of the remembered object.
     */
    public readonly object_info: object_params;

    /**
     * Snapshot of the object that owns this memory.
     */
    public readonly self_info: object_params;

    /**
     * Get the remembered object.
     *
     * @remarks
     * The binding expects the native memory record to still point to a live object.
     *
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
   *
   * @remarks
   * Created by the visual memory manager while an object is accumulating visibility but has not entered full visual
   * memory.
   */
  export class not_yet_visible_object extends EngineBinding {
    /**
     * Engine-created pending visibility record.
     */
    protected constructor();

    /**
     * Visibility score accumulated for this candidate.
     */
    public value: f32;

    /**
     * Get the visibility candidate object.
     *
     * @remarks
     * The binding expects the candidate to still point to a live object.
     *
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
   *
   * @remarks
   * Describes an object currently tracked by visual memory.
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
   *
   * @remarks
   * Returned by memory lookups to tell which memory channels currently have data for the object.
   */
  export class memory_info extends visible_memory_object {
    /**
     * Whether hit memory is available for this object.
     */
    public readonly hit_info: boolean;

    /**
     * Whether sound memory is available for this object.
     */
    public readonly sound_info: boolean;

    /**
     * Whether visual memory is available for this object.
     */
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
   *
   * @remarks
   * Sound memory stores the object that produced or is associated with the sound plus the perceived sound type.
   */
  export class sound_memory_object extends game_memory_object {
    /**
     * Remembered sound power.
     */
    public readonly power: f32;

    /**
     * Engine-created sound memory record.
     */
    protected constructor();

    /**
     * Get the engine sound type id.
     *
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
   *
   * @remarks
   * Danger memory can represent visual, sound, or hit perception. Unlike other memory records, its source object can
   * be absent.
   */
  export class danger_object {
    /**
     * Engine enum value for `danger_object.attack_sound`.
     */
    public static readonly attack_sound: 1;
    /**
     * Engine enum value for `danger_object.attacked`.
     */
    public static readonly attacked: 5;
    /**
     * Engine enum value for `danger_object.bullet_ricochet`.
     */
    public static readonly bullet_ricochet: 0;
    /**
     * Engine enum value for `danger_object.enemy_sound`.
     */
    public static readonly enemy_sound: 7;
    /**
     * Engine enum value for `danger_object.entity_attacked`.
     */
    public static readonly entity_attacked: 2;
    /**
     * Engine enum value for `danger_object.entity_corpse`.
     */
    public static readonly entity_corpse: 4;
    /**
     * Engine enum value for `danger_object.entity_death`.
     */
    public static readonly entity_death: 3;
    /**
     * Engine enum value for `danger_object.grenade`.
     */
    public static readonly grenade: 6;
    /**
     * Engine enum value for `danger_object.hit`.
     */
    public static readonly hit: 2;
    /**
     * Engine enum value for `danger_object.sound`.
     */
    public static readonly sound: 1;
    /**
     * Engine enum value for `danger_object.visual`.
     */
    public static readonly visual: 0;

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
     * Get the danger source object.
     *
     * @remarks
     * Returns `null` when the danger was stored without a living entity source.
     *
     * @returns Source object, or `null` when the source is not a game object.
     */
    public object(): Nullable<game_object>;

    /**
     * @returns How the danger was perceived.
     */
    public perceive_type(): TXR_danger_perceive_type;

    /**
     * Get the object attached to this danger event.
     *
     * @remarks
     * Returns `null` when there is no dependent object, or when the dependent native object is not a game object.
     *
     * @returns Dependent object, or `null` when there is none.
     */
    public dependent_object(): Nullable<game_object>;
  }

  /**
   * How a danger event was perceived by AI memory.
   *
   * @source C++ enum CDangerObject::EDangerPerceiveType
   * @group xr_memory
   */
  export type TXR_danger_perceive_type =
    typeof danger_object.visual | typeof danger_object.sound | typeof danger_object.hit;
  /**
   * @group xr_memory
   */
  export type TXR_danger_objects = typeof danger_object;

  /**
   * @group xr_memory
   */
  export type TXR_danger_object = EnumeratedStaticsValues<TXR_danger_objects>;
}

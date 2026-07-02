import type { Nullable } from "../internal";

declare module "xray16" {
  /**
   * Hit packet that can be sent to game objects.
   *
   * @source C++ class hit
   * @customConstructor hit
   * @group xr_hit
   *
   * @remarks
   * A new hit defaults to wound damage with power `100`, impulse `100`, direction `(1, 0, 0)`, and no draftsman.
   */
  export class hit {
    /**
     * Engine enum value for `hit.burn`.
     */
    public static readonly burn: 0;
    /**
     * Engine enum value for `hit.chemical_burn`.
     */
    public static readonly chemical_burn: 2;
    /**
     * Engine enum value for `hit.dummy`.
     */
    public static readonly dummy: 12;
    /**
     * Engine enum value for `hit.explosion`.
     */
    public static readonly explosion: 7;
    /**
     * Engine enum value for `hit.fire_wound`.
     */
    public static readonly fire_wound: 8;
    /**
     * Engine enum value for `hit.light_burn`.
     */
    public static readonly light_burn: 11;
    /**
     * Engine enum value for `hit.physic_strike`.
     */
    public static readonly physic_strike: 10;
    /**
     * Engine enum value for `hit.radiation`.
     */
    public static readonly radiation: 3;
    /**
     * Engine enum value for `hit.shock`.
     */
    public static readonly shock: 1;
    /**
     * Engine enum value for `hit.strike`.
     */
    public static readonly strike: 5;
    /**
     * Engine enum value for `hit.telepatic`.
     */
    public static readonly telepatic: 4;
    /**
     * Engine enum value for `hit.wound`.
     */
    public static readonly wound: 6;

    /**
     * Hit direction.
     */
    public direction: vector;

    /**
     * Object that caused the hit.
     *
     * @remarks
     * Leave `null` for world or scripted damage that should not be attributed to a game object.
     */
    public draftsman: Nullable<game_object>;

    /**
     * Physics impulse applied with the hit.
     */
    public impulse: f32;

    /**
     * Hit damage power.
     */
    public power: f32;

    /**
     * Hit damage type.
     */
    public type: TXR_hit_type;

    /**
     * Create an empty hit packet.
     *
     * @remarks
     * Uses the engine default values described on `hit`.
     */
    public constructor();

    /**
     * Copy an existing hit packet.
     *
     * @param hit - Source hit.
     */
    public constructor(hit: hit);

    /**
     * Target a model bone by name.
     *
     * @remarks
     * Stores the bone name on the hit. The receiving object resolves it against its own model.
     *
     * @param bone - Bone name used by the receiver model.
     */
    public bone(bone: string): void;
  }

  /**
   * @group xr_hit
   */
  export type TXR_hit_types = typeof hit;

  /**
   * @group xr_hit
   */
  export type TXR_hit_type = EnumeratedStaticsValues<TXR_hit_types>;
}

declare module "xray16" {
  /**
   * Hit packet that can be sent to game objects.
   *
   * @source C++ class hit
   * @customConstructor hit
   * @group xr_hit
   */
  export class hit {
    public static readonly burn = 0;
    public static readonly chemical_burn = 2;
    public static readonly dummy = 12;
    public static readonly explosion = 7;
    public static readonly fire_wound = 8;
    public static readonly light_burn = 11;
    public static readonly radiation = 3;
    public static readonly shock = 1;
    public static readonly strike = 5;
    public static readonly telepatic = 4;
    public static readonly wound = 6;

    /**
     * Hit direction.
     */
    public direction: vector;

    /**
     * Object that caused the hit.
     */
    public draftsman: game_object | null;

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

declare module "xray16" {
  /**
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

    public direction: vector;
    public draftsman: game_object | null;
    public impulse: f32;
    public power: f32;
    public type: TXR_hit_type;

    public constructor();
    public constructor(hit: hit);

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

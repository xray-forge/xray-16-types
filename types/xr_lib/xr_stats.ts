declare module "xray16" {
  /**
   * @source namespace actor_stats
   * @group xr_stats
   */
  export interface IXR_actor_stats {
    add_points_str(this: void, value1: string, value2: string, value3: string): void;

    get_points(this: void, value: string): i32;

    add_points(this: void, value1: string, value2: string, value3: i32, value4: i32): void;

    remove_from_ranking(this: void, object_id: number): void | null;
  }

  /**
   * @group xr_stats
   */
  export const actor_stats: IXR_actor_stats;
}

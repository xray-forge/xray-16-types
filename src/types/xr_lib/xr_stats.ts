import type { Nullable } from "../internal";

declare module "xray16" {
  /**
   * Actor statistics helpers exposed through the `actor_stats` namespace.
   *
   * @group xr_stats
   */
  export interface IXR_actor_stats {
    /**
     * Add actor statistic points with a string value.
     *
     * @param section - Statistic section id.
     * @param detail_key - Detail key inside the section.
     * @param value - String value to add.
     */
    add_points_str(this: void, section: string, detail_key: string, value: string): void;

    /**
     * Get total actor points for a statistic section.
     *
     * @param section - Statistic section id.
     * @returns Section points.
     */
    get_points(this: void, section: string): i32;

    /**
     * Add actor statistic points with count and score.
     *
     * @param section - Statistic section id.
     * @param detail_key - Detail key inside the section.
     * @param count - Count to add.
     * @param points - Points to add.
     */
    add_points(this: void, section: string, detail_key: string, count: i32, points: i32): void;

    /**
     * Remove an object from actor ranking when this optional binding exists.
     *
     * @param object_id - Object id to remove.
     */
    remove_from_ranking(this: void, object_id: number): Nullable<void>;
  }

  /**
   * Actor statistics namespace.
   *
   * @group xr_stats
   */
  export const actor_stats: IXR_actor_stats;
}

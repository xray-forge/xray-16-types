declare module "xray16" {
  /**
   * @source namespace relation_registry
   * @group xr_global_relation
   */
  export interface IXR_relation_registry {
    /**
     * Change relation from community to object by `delta_goodwill`.
     */
    change_community_goodwill(this: void, from_community: string, to_object_id: i32, delta_goodwill: i32): void;

    community_goodwill(this: void, from_community: string, to_object_id: i32): i32;

    /**
     * @returns relation points between communities, usually between `-5000` and `5000`
     */
    community_relation(this: void, from_community: string, to_community: string): i32;

    /**
     * Get relation from object to actor.
     * Return formula looks like `personal_goodwill + community_to_obj_goodwill + community_to_community_goodwill`.
     *
     * @param from_object_id - object from
     * @param to_object_id - object to
     * @returns general goodwill from object to another object based on personal and community goodwill
     */
    get_general_goodwill_between(this: void, from_object_id: u16, to_object_id: u16): i32;

    set_community_goodwill(this: void, from_community: string, to_object_id: i32, goodwill: i32): void;

    set_community_relation(this: void, from_community: string, to_community: string, goodwill: i32): void;
  }

  /**
   * @group xr_global_relation
   */
  export const relation_registry: IXR_relation_registry;
}

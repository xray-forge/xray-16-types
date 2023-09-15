declare module "xray16" {
  /**
   * @source C++ class FactionState
   * @customConstructor FactionState
   * @group xr_relation
   */
  export class FactionState {
    public actor_goodwill: i32;
    public bonus: i32;
    public faction_id: string;
    public icon: string;
    public icon_big: string;
    public location: string;
    public member_count: i32;
    public name: string;
    public power: f32;
    public resource: f32;
    public target: string;
    public target_desc: string;
    public war_state1: string;
    public war_state2: string;
    public war_state3: string;
    public war_state4: string;
    public war_state5: string;
    public war_state_hint1: string;
    public war_state_hint2: string;
    public war_state_hint3: string;
    public war_state_hint4: string;
    public war_state_hint5: string;

    protected constructor();
  }

  /**
   * @source namespace relation_registry
   * @group xr_relation
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
   * @group xr_relation
   */
  export const relation_registry: IXR_relation_registry;

  /**
   * Enumeration of relations.
   *
   * eRelationTypeFriend - 0
   * eRelationTypeNeutral - 1
   * eRelationTypeEnemy - 2
   * eRelationTypeWorstEnemy - 3
   * eRelationTypeLast - 4
   * eRelationTypeDummy - -1
   *
   * @group xr_relation
   */
  export type TXR_relation = 0 | 1 | 2 | 3;
}

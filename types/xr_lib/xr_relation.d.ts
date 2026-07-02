declare module "xray16" {
  /**
   * Faction state shown by faction-war UI scripts.
   *
   * @source C++ class FactionState
   * @customConstructor FactionState
   * @group xr_relation
   *
   * @remarks
   * This is a mutable data object filled by faction-war UI scripts. War state slots are fixed to five entries.
   */
  export class FactionState {
    /**
     * Current goodwill from this faction to the actor.
     */
    public actor_goodwill: i32;

    /**
     * Faction bonus level or id.
     */
    public bonus: i32;

    /**
     * Faction community id.
     */
    public faction_id: string;

    /**
     * Small faction icon texture.
     */
    public icon: string;

    /**
     * Large faction icon texture.
     */
    public icon_big: string;

    /**
     * Current faction map location.
     */
    public location: string;

    /**
     * Number of faction members.
     */
    public member_count: i32;

    /**
     * Localized faction name or string table id.
     */
    public name: string;

    /**
     * Faction combat power.
     */
    public power: f32;

    /**
     * Faction resource amount.
     */
    public resource: f32;

    /**
     * Current faction target.
     */
    public target: string;

    /**
     * Description of the current faction target.
     */
    public target_desc: string;

    /**
     * First faction war state line.
     */
    public war_state1: string;

    /**
     * Second faction war state line.
     */
    public war_state2: string;

    /**
     * Third faction war state line.
     */
    public war_state3: string;

    /**
     * Fourth faction war state line.
     */
    public war_state4: string;

    /**
     * Fifth faction war state line.
     */
    public war_state5: string;

    /**
     * Hint for the first faction war state line.
     */
    public war_state_hint1: string;

    /**
     * Hint for the second faction war state line.
     */
    public war_state_hint2: string;

    /**
     * Hint for the third faction war state line.
     */
    public war_state_hint3: string;

    /**
     * Hint for the fourth faction war state line.
     */
    public war_state_hint4: string;

    /**
     * Hint for the fifth faction war state line.
     */
    public war_state_hint5: string;

    /**
     * Engine-created faction state.
     */
    protected constructor();
  }

  /**
   * @source namespace relation_registry
   * @group xr_relation
   *
   * @remarks
   * Community ids are resolved through the engine community registry. Invalid names follow the native registry rules.
   */
  export interface IXR_relation_registry {
    /**
     * Change relation from community to object by `delta_goodwill`.
     *
     * @remarks
     * Applies the delta to the current goodwill, then clamps the result to `community_goodwill_limits`.
     *
     * @param from_community - Source community id.
     * @param to_object_id - Target object id.
     * @param delta_goodwill - Goodwill delta to apply.
     */
    change_community_goodwill(this: void, from_community: string, to_object_id: i32, delta_goodwill: i32): void;

    /**
     * Get goodwill from a community to an object.
     *
     * @remarks
     * Returns neutral goodwill when no explicit community-to-object value is stored.
     *
     * @param from_community - Source community id.
     * @param to_object_id - Target object id.
     * @returns Stored community goodwill.
     */
    community_goodwill(this: void, from_community: string, to_object_id: i32): i32;

    /**
     * Get relation between two communities.
     *
     * @remarks
     * Reads the global community relation matrix, not per-object goodwill.
     *
     * @param from_community - Source community id.
     * @param to_community - Target community id.
     * @returns Relation points between communities, usually between `-5000` and `5000`.
     */
    community_relation(this: void, from_community: string, to_community: string): i32;

    /**
     * Get relation from object to actor.
     * Return formula looks like `personal_goodwill + community_to_obj_goodwill + community_to_community_goodwill`.
     *
     * @remarks
     * Both object ids must resolve to ALife trader objects. Non-trader objects log a script error and return `0`.
     *
     * @param from_object_id - Object from.
     * @param to_object_id - Object to.
     * @returns General goodwill from object to another object based on personal and community goodwill.
     */
    get_general_goodwill_between(this: void, from_object_id: u16, to_object_id: u16): i32;

    /**
     * Set goodwill from a community to an object.
     *
     * @remarks
     * The engine clamps the stored value to `community_goodwill_limits`.
     *
     * @param from_community - Source community id.
     * @param to_object_id - Target object id.
     * @param goodwill - New goodwill value.
     */
    set_community_goodwill(this: void, from_community: string, to_object_id: i32, goodwill: i32): void;

    /**
     * Set relation between two communities.
     *
     * @remarks
     * Updates the global community relation matrix.
     *
     * @param from_community - Source community id.
     * @param to_community - Target community id.
     * @param goodwill - New community relation value.
     */
    set_community_relation(this: void, from_community: string, to_community: string, goodwill: i32): void;
  }

  /**
   * Global relation registry helpers.
   *
   * @group xr_relation
   */
  export const relation_registry: IXR_relation_registry;

  /**
   * Relation type names exposed through the `game_object.relation` Lua enum.
   *
   * @source `src/xrGame/script_game_object_script2.cpp`, `game_object.relation` enum.
   * @group xr_relation
   */
  export type TXR_relation_name = "friend" | "neutral" | "enemy" | "dummy";

  /**
   * Relation type returned by `game_object.relation()` and accepted by `game_object.set_relation()`.
   *
   * @source C++ enum ALife::ERelationType
   * @group xr_relation
   *
   * @remarks
   * `game_object.relation()` returns `game_object.dummy` when either object cannot be treated as a living entity.
   * `3` is the native `eRelationTypeWorstEnemy` value; it is not exported as a named Lua enum member.
   */
  export type TXR_relation =
    | typeof game_object.dummy
    | typeof game_object.friend
    | typeof game_object.neutral
    | typeof game_object.enemy
    | 3;}

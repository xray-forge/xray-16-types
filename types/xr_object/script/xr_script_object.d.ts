declare module "xray16" {
  /**
   * Client object base presentation as script object.
   * Generic in-game entities from items to mutants and stalkers wrapped with luabind export.
   *
   * @source C++ class game_object
   * @customConstructor game_object
   * @group xr_script_object
   */
  export class game_object extends game_object_callbacks_implementation_base {
    public static readonly dummy: -1;

    public static readonly game_path: 0;
    public static readonly level_path: 1;
    public static readonly patrol_path: 2;
    public static readonly no_path: 3;

    public static readonly friend: 0;
    public static readonly neutral: 1;
    public static readonly enemy: 2;

    public static readonly alifeMovementTypeMask: 0;
    public static readonly alifeMovementTypeRandom: 1;

    public static readonly dialog_pda_msg: 0;
    public static readonly info_pda_msg: 1;
    public static readonly no_pda_msg: 2;

    public static readonly relation_kill: 0;
    public static readonly relation_attack: 1;
    public static readonly relation_fight_help_human: 2;
    public static readonly relation_fight_help_monster: 4;

    public static readonly movement: 0;
    public static readonly watch: 1;
    public static readonly animation: 2;
    public static readonly sound: 3;
    public static readonly particle: 4;
    public static readonly object: 5;
    public static readonly action_type_count: 6;

    /**
     * Actor satiety value.
     *
     * @remarks
     * Assignment applies a delta through `CScriptGameObject::ChangeSatiety`, not an absolute value.
     */
    public satiety: f32;

    /**
     * Intensity of actor bleeding.
     * 0 - no bleeding.
     *
     * @remarks
     * Assignment applies a delta through `CScriptGameObject::SetBleeding`, not an absolute value.
     */
    public bleeding: f32;

    /**
     * Object health value from 0 to 1.
     *
     * @remarks
     * Assignment applies a delta through `CScriptGameObject::SetHealth`, not an absolute value.
     * Use `set_health_ex` when the script must set exact health.
     */
    public health: f32;

    /**
     * Creature morale value.
     */
    public morale: f32;

    /**
     * Actor stamina/power value.
     *
     * @remarks
     * Assignment applies a delta through `CScriptGameObject::SetPower`, not an absolute value.
     */
    public power: f32;

    /**
     * Psy health value.
     */
    public psy_health: f32;

    /**
     * Actor radiation value.
     *
     * @remarks
     * Assignment applies a delta through `CScriptGameObject::SetRadiation`, not an absolute value.
     */
    public radiation: f32;

    protected constructor();

    /**
     * Get engine object id.
     *
     * @returns Runtime object id.
     */
    public id(): u16;

    /**
     * Get story id assigned to this object.
     *
     * @returns Story id, or engine default when no story id is assigned.
     */
    public story_id(): u32;

    /**
     * Get inventory object by index or name.
     *
     * @param value - Inventory index or item name.
     * @returns Matching item, or `null` when it does not exist.
     */
    public object(value: i32 | string): game_object | null;

    /**
     * Get engine class id.
     *
     * @returns Class id constant.
     */
    public clsid(): TXR_class_id;

    /**
     * Queue animation by name.
     *
     * @param animation - Animation name.
     * @param hand_usage - Whether the animation uses hands.
     * @param use_movement_controller - Whether movement controller should drive the animation.
     */
    public add_animation(animation: string, hand_usage: boolean, use_movement_controller: boolean): void;

    /**
     * Queue animation with local transform data.
     *
     * @param animation - Animation name.
     * @param hand_usage - Whether the animation uses hands.
     * @param position - Animation position.
     * @param rotation - Animation rotation.
     * @param local_animation - Whether transform is local to the object.
     */
    public add_animation(
      animation: string,
      hand_usage: boolean,
      position: vector,
      rotation: vector,
      local_animation: boolean
    ): void;

    /**
     * Get current entity action.
     *
     * @returns Current action, or `null` when no action is active.
     */
    public action(): entity_action | null;

    /**
     * Get queued action count.
     *
     * @returns Number of queued actions.
     */
    public action_count(): u32;

    /**
     * Get active detector item.
     *
     * @returns Active detector, or `null`.
     */
    public active_detector(): game_object | null;

    /**
     * Get active inventory item.
     *
     * @returns Active item, or `null`.
     */
    public active_item(): game_object | null;

    /**
     * @returns Active item slot of game object.
     */
    public active_slot<T extends u32>(): T;

    /**
     * Check whether the object contacts an active zone.
     *
     * @param zone_id - Zone object id.
     * @returns Whether contact is active.
     */
    public active_zone_contact(zone_id: u16): boolean;

    /**
     * Add movement restrictions.
     *
     * @param out_restriction - Restrictor name used as outside boundary.
     * @param in_restriction - Restrictor name used as inside boundary.
     */
    public add_restrictions(out_restriction: string, in_restriction: string): void;

    /**
     * Get current animation slot.
     *
     * @returns Animation slot id.
     */
    public animation_slot(): i32;

    /**
     * Get base outside restrictions.
     *
     * @returns Restriction list.
     */
    public base_out_restrictions(): string;

    /**
     * Get best known item for this object.
     *
     * @returns Best item, or `null`.
     */
    public best_item(): game_object | null;

    /**
     * Get best available weapon for this object.
     *
     * @returns Best weapon, or `null`.
     */
    public best_weapon(): game_object | null;

    /**
     * Attach a Lua binder to this object.
     *
     * @param binder - Binder instance adopted by the engine.
     */
    public bind_object(binder: object_binder): void;

    /**
     * Get attached Lua binder.
     *
     * @returns Bound object binder.
     */
    public binded_object(): object_binder;

    /**
     * Toggle burer gravity attack override.
     *
     * @param value - Whether forced gravity attack is enabled.
     */
    public burer_set_force_gravi_attack(value: boolean): void;

    /**
     * Buy supplies described by a config section.
     *
     * @param ini - Trade config.
     * @param section - Supply section.
     */
    public buy_supplies(ini: ini_file, section: string): void;

    /**
     * Check whether this object can select a weapon.
     *
     * @returns Whether weapon selection is enabled.
     */
    public can_select_weapon(): boolean;

    /**
     * Enable or disable weapon selection.
     *
     * @param is_enabled - Whether weapon selection is enabled.
     */
    public can_select_weapon(is_enabled: boolean): void;

    /**
     * Check whether this object can throw grenades.
     *
     * @returns Whether grenade throwing is enabled.
     */
    public can_throw_grenades(): boolean;

    /**
     * Enable or disable grenade throwing.
     *
     * @param is_enabled - Whether grenade throwing is enabled.
     */
    public can_throw_grenades(is_enabled: boolean): void;

    /**
     * Remove queued animations.
     */
    public clear_animations(): void;

    /**
     * Clear override animation.
     */
    public clear_override_animation(): void;

    /**
     * Sets provided planner as `debugged` for stalker object.
     * As result, when console command `ai_dbg_stalker on` is toggled, GOAP state of planner is displayed.
     * Requires `mixed` build engine.
     *
     * @param planner - Action planner to show in stalker stats when debugging is enabled.
     */
    public debug_planner(planner: action_planner): void;

    /**
     * Remove an info portion from this object.
     *
     * @param info_portion - Info portion id.
     * @returns Whether the info portion was removed.
     */
    public disable_info_portion(info_portion: string): boolean;

    /**
     * Disable actor dialog with this object.
     */
    public disable_talk(): void;

    /**
     * Disable trade with this object.
     */
    public disable_trade(): void;

    /**
     * Check that this object does not have an info portion.
     *
     * @param info_portion - Info portion id.
     * @returns Whether the info portion is absent.
     */
    public dont_has_info(info_portion: string): boolean;

    /**
     * Drop item from inventory.
     *
     * @param item - Game object to drop.
     */
    public drop_item(item: game_object): void;

    /**
     * Enable or disable night vision on actor equipment.
     *
     * @param is_enabled - Whether night vision is enabled.
     */
    public enable_night_vision(is_enabled: boolean): void;

    /**
     * Start an external object sound.
     *
     * @param sound - Sound name.
     */
    public external_sound_start(sound: string): void;

    /**
     * Get model bone id by name.
     *
     * @param bone - Bone name.
     * @returns Bone id.
     */
    public get_bone_id(bone: string): u16;

    /**
     * Get current movement direction.
     *
     * @returns Direction vector.
     */
    public get_current_direction(): vector;

    /**
     * Get protection value from the currently equipped outfit.
     *
     * @param hit_type - Hit type id.
     * @returns Protection value.
     */
    public get_current_outfit_protection(hit_type: i32): f32;

    /**
     * Get destination smart cover.
     *
     * @returns Cover point.
     */
    public get_dest_smart_cover(): cover_point;

    /**
     * Get destination smart cover name.
     *
     * @returns Cover name, or `null`.
     */
    public get_dest_smart_cover_name(): string | null;

    /**
     * Get latest monster hit information.
     *
     * @returns Monster hit info.
     */
    public get_monster_hit_info(): MonsterHitInfo;

    /**
     * Get physics object wrapper.
     *
     * @returns Physics object.
     */
    public get_physics_object(): CPhysicObject;

    /**
     * @returns Whether object is controlled by lua script.
     */
    public get_script(): boolean;

    /**
     * Get current smart cover description.
     *
     * @returns Smart cover description.
     */
    public get_smart_cover_description(): string;

    /**
     * Show a talk message.
     *
     * @param title - Message title.
     * @param text - Message text.
     * @param icon - Message icon.
     */
    public give_talk_message(title: string, text: string, icon: string): void;

    /**
     * Get maximum idle time.
     *
     * @returns Idle time in milliseconds.
     */
    public idle_max_time(): f32;

    /**
     * Set maximum idle time.
     *
     * @param time - Idle time in milliseconds.
     */
    public idle_max_time(time: f32): void;

    /**
     * Check whether a position is inside the current loophole field of view.
     *
     * @param position - Position to test.
     * @returns Whether position is inside field of view.
     */
    public in_current_loophole_fov(position: vector): boolean;

    /**
     * Iterate inventory items.
     *
     * @param cb - Callback called for each item.
     */
    public inventory_for_each(cb: (this: void) => void): void;

    /**
     * Check whether a door is blocked by an NPC.
     *
     * @returns Whether a door is blocked.
     */
    public is_door_blocked_by_npc(): boolean;

    /**
     * Check whether actor dialog is enabled.
     *
     * @returns Whether talking is enabled.
     */
    public is_talk_enabled(): boolean;

    /**
     * Check whether a weapon is being strapped.
     *
     * @param weapon - Weapon to check.
     * @returns Whether weapon is being strapped.
     */
    public is_weapon_going_to_be_strapped(weapon: game_object | null): boolean;

    /**
     * Iterate items inside an inventory box.
     *
     * @param cb - Callback called for each box item.
     * @param object - Inventory box object.
     */
    public iterate_inventory_box(
      cb: (this: void, box: game_object, item: game_object) => void,
      object: game_object
    ): void;

    /**
     * Get maximum lookout time.
     *
     * @returns Lookout time in milliseconds.
     */
    public lookout_max_time(): f32;

    /**
     * Set maximum lookout time.
     *
     * @param value - Lookout time in milliseconds.
     */
    public lookout_max_time(value: f32): void;

    /**
     * Get maximum distance at which monsters can be ignored.
     *
     * @returns Distance.
     */
    public max_ignore_monster_distance(): f32;

    /**
     * Set maximum distance at which monsters can be ignored.
     *
     * @param value - Distance.
     */
    public max_ignore_monster_distance(value: f32): void;

    public memory_hit_objects(): unknown; // :vector<MemorySpace::CHitObject, xalloc<struct MemorySpace::CHitObject>

    /**
     * Get time since this object remembered another object.
     *
     * @param another - Object to query.
     * @returns Memory time.
     */
    public memory_time(another: game_object): u32;

    /**
     * Get visible objects from memory.
     *
     * @returns Iterable visible memory objects.
     */
    public memory_visible_objects(): LuaIterable<visible_memory_object>;

    public mental_state<T extends number>(): T; // Todo: unknown enum

    public not_yet_visible_objects(): unknown;

    /**
     * Get inventory object count.
     *
     * @returns Inventory item count.
     */
    public object_count(): u32;

    /**
     * Check whether current path is complete.
     *
     * @returns Whether path was completed.
     */
    public path_completed(): boolean;

    /**
     * Get relation to another object.
     *
     * @param object - Target object.
     * @returns Relation id.
     */
    public relation(object: game_object): TXR_relation;

    /**
     * Release forced standing sleep animation.
     */
    public release_stand_sleep_animation(): void;

    /**
     * Clear queued entity actions.
     */
    public reset_action_queue(): void;

    /**
     * Restore default sound threshold.
     */
    public restore_sound_threshold(): void;

    /**
     * Set carried object weight.
     *
     * @param weight - New weight.
     */
    public set_weight(weight: f32): void;

    /**
     * Set actor yaw direction.
     *
     * @param direction - Direction angle.
     */
    public set_actor_direction(direction: f32): void;

    /**
     * Set ammo count in current magazine.
     *
     * @param count - Ammo count.
     */
    public set_ammo_elapsed(count: i32): void;

    /**
     * Set goodwill toward a community.
     *
     * @param community - Community id.
     * @param goodwill - Goodwill value.
     */
    public set_community_goodwill(community: string, goodwill: i32): void;

    /**
     * Apply constant force for a time interval.
     *
     * @param direction - Force direction.
     * @param power - Force power.
     * @param time_interval - Duration in milliseconds.
     */
    public set_const_force(direction: vector, power: f32, time_interval: u32): void;

    /**
     * Clear destination smart cover.
     */
    public set_dest_smart_cover(): void;

    /**
     * Set destination smart cover by name.
     *
     * @param smart_cover - Smart cover name.
     */
    public set_dest_smart_cover(smart_cover: string): void;

    /**
     * Set current enemy object.
     *
     * @param object - Enemy object.
     */
    public set_enemy(object: game_object): void;

    /**
     * Set field of view.
     *
     * @param fov - Field of view angle.
     */
    public set_fov(fov: f32): void;

    /**
     * Set item used by an action.
     *
     * @param action_id - Action id.
     * @param object - Item object, or `null`.
     * @param min_queue_size - Optional minimum queue size.
     * @param max_queue_size - Optional maximum queue size.
     */
    public set_item(action_id: number, object: game_object | null, min_queue_size?: u32, max_queue_size?: u32): void;

    /**
     * Set mental animation state.
     *
     * @param state - Target mental state.
     */
    public set_mental_state(state: TXR_animation): void;

    /**
     * Force an override animation.
     *
     * @param animation - Animation name.
     */
    public set_override_animation(animation: string): void;

    /**
     * Set path planning type.
     *
     * @param type - Path type.
     */
    public set_path_type(type: TXR_game_object_path): void;

    /**
     * Set previous patrol point index.
     *
     * @param point - Point index.
     */
    public set_previous_point(point: i32): void;

    /**
     * Clear smart cover target.
     */
    public set_smart_cover_target(): void;

    /**
     * Set smart cover target object.
     *
     * @param game_object - Target object.
     */
    public set_smart_cover_target(game_object: game_object): void;

    /**
     * Set smart cover target position.
     *
     * @param vector - Target position.
     */
    public set_smart_cover_target(vector: vector): void;

    /**
     * Enable or disable default smart cover target.
     *
     * @param is_enabled - Whether default target is enabled.
     */
    public set_smart_cover_target_default(is_enabled: boolean): void;

    /**
     * Use smart cover fire target.
     */
    public set_smart_cover_target_fire(): void;

    /**
     * Use smart cover lookout target.
     */
    public set_smart_cover_target_lookout(): void;

    /**
     * Set start patrol point index.
     *
     * @param point - Point index.
     */
    public set_start_point(point: i32): void;

    /**
     * Get voice sound prefix.
     *
     * @returns Voice sound prefix.
     */
    public sound_voice_prefix(): string;

    /**
     * @returns Game object squad id.
     */
    public squad(): i32;

    public switch_to_talk(): void;

    public team(): i32;

    public use_smart_covers_only(): boolean;

    public use_smart_covers_only(value: boolean): void;

    public weapon_addon_attach(object: game_object): void;

    public weapon_addon_detach(addon: string): void;

    public weapon_is_scope(): boolean;

    public weapon_silencer_status(): i32;

    public weapon_strapped(): boolean;

    public weapon_unstrapped(): boolean;

    public who_hit_name(): string;

    public who_hit_section_name(): string;

    /**
     * Activate an inventory slot.
     *
     * @param index - Slot id.
     */
    public activate_slot(index: u32): void;

    /**
     * Force actor look direction toward a point.
     *
     * @param position - Point to look at.
     */
    public actor_look_at_point(position: vector): void;

    /**
     * Get aimed bone id.
     *
     * @returns Bone name.
     */
    public aim_bone_id(): string;

    /**
     * Set aimed bone id.
     *
     * @param bone - Bone name.
     */
    public aim_bone_id(bone: string): void;

    /**
     * Get aim time for a target.
     *
     * @param object - Target object.
     * @returns Aim time.
     */
    public aim_time(object: game_object): u32;

    /**
     * Set aim time for a target.
     *
     * @param object - Target object.
     * @param time - Aim time.
     */
    public aim_time(object: game_object, time: u32): void;

    /**
     * Enable or disable actor sprint.
     *
     * @param is_allowed - Whether sprint is allowed.
     */
    public allow_sprint(is_allowed: boolean): void;

    /**
     * Get animation count.
     *
     * @returns Animation count.
     */
    public animation_count(): i32;

    /**
     * Get most relevant danger object.
     *
     * @returns Danger object, or `null`.
     */
    public best_danger(): danger_object | null;

    public body_state(): void;

    /**
     * Get model bone world position.
     *
     * @param bone - Bone name.
     * @returns Bone position.
     */
    public bone_position(bone: string): vector;

    /**
     * Set item condition factor used by buying logic.
     *
     * @param factor - Condition factor.
     */
    public buy_item_condition_factor(factor: f32): void;

    /**
     * Change team, squad, and group ids.
     *
     * @param team_id - Team id.
     * @param squad_id - Squad id.
     * @param group_id - Group id.
     */
    public change_team(team_id: u8, squad_id: u8, group_id: u8): void;

    /**
     * Get character icon id.
     *
     * @returns Icon id.
     */
    public character_icon<T extends string = string>(): T;

    /**
     * Get localized character name.
     *
     * @returns Character display name.
     */
    public character_name<T extends string = string>(): T;

    /**
     * Get character rank value.
     *
     * @returns Rank value.
     */
    public character_rank(): i32;

    /**
     * Get item condition.
     *
     * @returns Condition value.
     */
    public condition(): f32;

    /**
     * Get object cost.
     *
     * @returns Cost.
     */
    public cost(): u32;

    /**
     * Check whether NPC is critically wounded.
     *
     * @returns Whether object is critically wounded.
     */
    public critically_wounded(): boolean;

    public deadbody_closed(value: boolean): void;

    public death_sound_enabled(): boolean;

    public death_sound_enabled(value: boolean): void;

    /**
     * Get object facing direction.
     *
     * @returns Direction vector.
     */
    public direction(): vector;

    public disable_anomaly(): void;

    public disable_hit_marks(): boolean;

    public disable_hit_marks(value: boolean): void;

    public disable_inv_upgrade(): void;

    /**
     * Drop an item and teleport it to a position.
     *
     * @param item - Item to drop.
     * @param position - Target position.
     */
    public drop_item_and_teleport(item: game_object, position: vector): void;

    /**
     * Consume an inventory item.
     *
     * @param item - Item to eat or use.
     */
    public eat(item: game_object): void;

    public enable_inv_upgrade(): void;

    /**
     * Switch client level changed enabled state.
     *
     * @param is_enabled - Whether level changer should be enabled.
     */
    public enable_level_changer(is_enabled: boolean): void;

    /**
     * Enable or disable memory tracking for an object.
     *
     * @param object - Object to update.
     * @param is_enabled - Whether memory object is enabled.
     */
    public enable_memory_object(object: game_object, is_enabled: boolean): void;

    /**
     * Trigger object explosion.
     *
     * @param id - Explosion id or initiator id.
     */
    public explode(id: u32): void;

    public extrapolate_length(): f32;

    public extrapolate_length(value: f32): void;

    public fake_death_stand_up(): void;

    public fov(): f32;

    /**
     * Get total suitable ammo count.
     *
     * @returns Ammo count.
     */
    public get_ammo_total(): u32;

    /**
     * Get active ammo type.
     *
     * @returns Ammo type id.
     */
    public get_ammo_type(): u8;

    public get_artefact(): CArtefact;

    public get_campfire(): CZoneCampfire;

    public get_current_outfit(): game_object | null;

    public get_current_point_index(): u32;

    public get_force_anti_aim(): boolean;

    public get_hanging_lamp(): hanging_lamp;

    public get_holder_class(): holder;

    public get_movement_speed(): vector;

    /**
     * @returns Name of lua script controlling monster object.
     */
    public get_script_name(): string;

    public get_visual_name<T extends string = string>(): T;

    /**
     * Check whether this object has an info portion.
     *
     * @param info_portion - Info portion id.
     * @returns Whether the info portion is present.
     */
    public has_info(info_portion: string): boolean;

    public hide_weapon(): void;

    public idle_min_time(): f32;

    public idle_min_time(value: f32): void;

    /**
     * Check whether a position is inside a named loophole field of view.
     *
     * @param cover_name - Smart cover name.
     * @param loophole_name - Loophole name.
     * @param position - Position to test.
     * @returns Whether position is inside field of view.
     */
    public in_loophole_fov(cover_name: string, loophole_name: string, position: vector): boolean;

    public in_restrictions(): string;

    public in_smart_cover(): boolean;

    /**
     * Available only in debug mode.
     * Sets information for game object for debug.
     */
    public info_add(text: string): void;

    public inv_box_can_take(value: boolean): boolean;

    public invulnerable(): boolean;

    public invulnerable(value: boolean): void;

    public is_body_turning(): boolean;

    public is_level_changer_enabled(): boolean;

    public is_there_items_to_pickup(): boolean;

    /**
     * Kill a target object.
     *
     * @param object - Target object.
     */
    public kill(object: game_object): void;

    public location_on_path(value: f32, vector: vector): u32;

    public lock_door_for_npc(): void;

    public lookout_min_time(): f32;

    public lookout_min_time(time: f32): void;

    /**
     * Make an inventory item active.
     *
     * @param item - Item to activate.
     */
    public make_item_active(item: game_object): void;

    public marked_dropped(game_object: game_object): boolean;

    public memory_sound_objects(): unknown;

    public money(): u32;

    public motivation_action_manager(): action_planner;

    public movement_type(): number; // Todo: unknown enum

    public patrol(): string | null;

    public patrol_path_make_inactual(): void;

    public play_cycle(value1: string, value2: boolean): void;

    public play_cycle(value: string): void;

    public play_sound(value1: u32, value2?: u32, value3?: u32, value4?: u32, value5?: u32, value6?: u32): void;

    public register_door_for_npc(): void;

    public remove_home(): void;

    public remove_restrictions(value1: string, value2: string): void;

    public remove_sound(value: u32): void;

    public restore_default_start_dialog(): void;

    public restore_max_ignore_monster_distance(): void;

    public section<T extends string = string>(): T;

    public see(game_object: game_object): boolean;

    public see(value: string): boolean;

    public sell_condition(ini_file: ini_file, section: string): void;

    public sell_condition(value1: f32, value2: f32): void;

    public set__force(vector: vector, value1: number, value2: number): void;

    public set_actor_relation_flags(value: flags32): void;

    public set_alien_control(is_enabled: boolean): void;

    public set_body_state(state: TXR_MonsterBodyState): void;

    public set_capture_anim(game_object: game_object, value1: string, vector: vector, value2: f32): void;

    /**
     * Set character community.
     *
     * @param community - Community id.
     * @param rank - Rank value used by relation logic.
     * @param goodwill - Goodwill value.
     */
    public set_character_community(community: string, rank: u32, goodwill: i32): void;

    /**
     * Set character rank.
     *
     * @param rank - Rank value.
     */
    public set_character_rank(rank: i32): void;

    /**
     * Set character reputation.
     *
     * @param reputation - Reputation value.
     */
    public set_character_reputation(reputation: i32): void;

    public set_collision_off(value: boolean): void;

    public set_default_panic_threshold(): void;

    public set_dest_game_vertex_id(value: u16): void;

    /**
     * Set destination level vertex.
     *
     * @param vertex_id - Target level vertex id.
     */
    public set_dest_level_vertex_id(vertex_id: u32): void;

    public set_detail_path_type(EDetailPathType: unknown /* Enum DetailPathManager::EDetailPathType */): void;

    public set_invisible(is_invisible: boolean): void;

    public set_movement_selection_type(type: unknown /* Enum ESelectionType */): void;

    /**
     * Set movement patrol path.
     *
     * @param path_name - Patrol path name.
     * @param start_type - Patrol start type.
     * @param route_type - Patrol route type.
     * @param random - Whether path point selection is random.
     */
    public set_patrol_path(path_name: string, start_type: number, route_type: number, random: boolean): void;

    public set_smart_cover_target_idle(): void;

    public set_sympathy(value: f32): void;

    public set_trader_sound(value1: string, value2: string): void;

    public sight_params(): CSightParams;

    public skip_transfer_enemy(value: boolean): void;

    public sniper_update_rate(): boolean;

    public sniper_update_rate(value: boolean): void;

    public spawn_ini(): ini_file | null;

    public special_danger_move(): boolean;

    public special_danger_move(value: boolean): void;

    public stop_particles(name: string, bone: string): void;

    public switch_to_trade(): void;

    public sympathy(): f32;

    public take_items_enabled(): boolean;

    public take_items_enabled(value: boolean): void;

    public torch_enabled(): boolean;

    public unload_magazine(): void;

    public unlock_door_for_npc(): void;

    public visibility_threshold(): f32;

    public weapon_is_grenadelauncher(): boolean;

    public set_sight(type: TXR_SightType, torso_look: boolean, path: boolean): void;

    public set_sight(type: TXR_SightType, vector: vector | null, lookOverDelay: u32): void;

    public set_sight(type: TXR_SightType, vector: vector, torso_look: boolean, fire_object: boolean): void;

    public set_sight(type: TXR_SightType, vector: vector, torso_look: boolean): void;

    public set_sight(type: TXR_SightType, vector: vector): void;

    public set_sight(game_object: game_object, torso_look?: boolean, fire_object?: boolean, no_pitch?: boolean): void;

    public set_task_state(state: TXR_TaskState, value: string): void;

    public set_visual_memory_enabled(enabled: boolean): void;

    /**
     * Set trade show condition.
     *
     * @param ini_file - Trade config.
     * @param section - Condition section.
     */
    public show_condition(ini_file: unknown, section: string): void;

    public sound_prefix(): string;

    public sound_prefix(value: string): void;

    public wounded(): boolean;

    public wounded(wounded: boolean): void;

    /**
     * Register an NPC sound.
     *
     * @param prefix - Sound prefix.
     * @param priority - Sound priority.
     * @param type - Sound type.
     * @param mask - Sound mask.
     * @param internal_type - Internal sound type.
     * @param max_count - Maximum active sounds.
     * @returns Registered sound id.
     */
    public add_sound(prefix: string, priority: u32, type: unknown, mask: u32, internal_type: u32, max_count: u32): u32;

    /**
     * Register an NPC sound with a bone name.
     *
     * @param prefix - Sound prefix.
     * @param priority - Sound priority.
     * @param type - Sound type.
     * @param mask - Sound mask.
     * @param internal_type - Internal sound type.
     * @param max_count - Maximum active sounds.
     * @param bone - Bone name.
     * @returns Registered sound id.
     */
    public add_sound(
      prefix: string,
      priority: u32,
      type: unknown,
      mask: u32,
      internal_type: u32,
      max_count: u32,
      bone: string
    ): u32;

    public active_sound_count(): i32;

    public active_sound_count(value: boolean): void;

    public allow_break_talk_dialog(value: boolean): void;

    public apply_loophole_direction_distance(): f32;

    public apply_loophole_direction_distance(value: f32): void;

    public attachable_item_enabled(): boolean;

    public burer_get_force_gravi_attack(): boolean;

    public burer_get_force_anti_aim(): boolean;

    public buy_condition(ini_file: ini_file, section: string): void;

    public buy_condition(value1: f32, value2: f32): void;

    /**
     * Add a delta to character reputation.
     *
     * @param delta - Reputation delta.
     */
    public change_character_reputation(delta: i32): void;

    /**
     * Add a delta to goodwill toward another object.
     *
     * @param delta_goodwill - Goodwill delta.
     * @param to_object - Target object.
     */
    public change_goodwill(delta_goodwill: i32, to_object: game_object): void;

    /**
     * Add a delta to character rank.
     *
     * @param delta - Rank delta.
     */
    public change_character_rank(delta: i32): void;

    /**
     * Get character reputation.
     *
     * @returns Reputation value.
     */
    public character_reputation(): i32;

    /**
     * Get goodwill toward a community.
     *
     * @param from_community - Community id.
     * @returns Goodwill value.
     */
    public community_goodwill(from_community: string): i32;

    public deadbody_can_take(value: boolean): void;

    public deadbody_can_take_status(): boolean;

    public detail_path_type(): unknown;

    public disable_show_hide_sounds(value: boolean): void;

    public enable_anomaly(): void;

    /**
     * Method for inventory items to set them enabled / disabled for stalkers.
     * As result, medkit or detector can be activated by stalker.
     *
     * @param is_enabled - Whether item should be enabled for usage by owning object.
     */
    public enable_attachable_item(is_enabled: boolean): void;

    public enable_talk(): void;

    public enable_trade(): void;

    public enable_vision(value: boolean): void;

    public fake_death_fall_down(): boolean;

    /**
     * Set goodwill toward another object without applying a delta.
     *
     * @param goodwill - Goodwill value.
     * @param to_object - Target object.
     */
    public force_set_goodwill(goodwill: i32, to_object: game_object): void;

    /**
     * For bloodsuckers specifically set current visibility state.
     */
    public force_visibility_state(state: TXR_bloodsucker_visibility_state): void;

    /**
     * Return formula: `personal_goodwill + reputation_goodwill + rank_goodwill +
     *  community_goodwill + community_to_community`.
     *
     * @param target - Target client object.
     * @returns Goodwill level from object to target.
     */
    public general_goodwill(target: game_object): i32;

    public get_actor_relation_flags(): flags32;

    public get_ammo_in_magazine(): u32;

    public get_car(): CCar;

    public get_corpse(): game_object | null;

    public get_current_holder(): holder;

    public get_enemy(): game_object | null;

    public get_enemy_strength(): i32;

    public get_physics_shell(): physics_shell | null;

    public get_start_dialog(): void;

    /**
     * Get task by id.
     *
     * @param task_id - Task id.
     * @param only_in_process - Whether to return only active tasks.
     * @returns Task object, or `null`.
     */
    public get_task(task_id: string, only_in_process: boolean): CGameTask | null;

    /**
     * Get task state by id.
     *
     * @param task_id - Task id.
     * @returns Task state id.
     */
    public get_task_state(task_id: string): unknown;

    /**
     * Add an info portion to this object.
     *
     * @param info_portion - Info portion id.
     * @returns Whether the info portion was added.
     */
    public give_info_portion(info_portion: string): boolean;

    /**
     * Add money to this object.
     *
     * @param amount - Money amount.
     */
    public give_money(amount: i32): void;

    /**
     * Show talk dialog message with icon.
     *
     * @param title - Title of the message.
     * @param text - Text of the message.
     * @param icon_texture_name - Icon to display in message image.
     * @param selector - Path in form XML to message template.
     */
    public give_talk_message2(title: string, text: string, icon_texture_name: string, selector: string): void;

    /**
     * Give game task for an object, usually it is actor object.
     *
     * @param task - Task object to give.
     * @param time_to_complete - Time allowed to complete the task.
     * @param check_existing - Whether an existing task should be reused.
     * @param timer_ttl - Timer lifetime.
     */
    public give_task(task: CGameTask, time_to_complete: u32, check_existing: boolean, timer_ttl: u32): void;

    /**
     * Returns level of goodwill stored for an object.
     * No strict formulas, just get actual value.
     *
     * @param target - Target client object.
     * @returns Goodwill level to target object.
     */
    public goodwill(target: game_object): i32;

    public group_throw_time_interval(): u32;

    public group_throw_time_interval(value: u32): void;

    public head_orientation(): vector;

    public ignore_monster_threshold(): f32;

    public ignore_monster_threshold(value: f32): void;

    public in_current_loophole_range(vector: vector): boolean;

    /**
     * Reset debugging information about object.
     * Available only for debug builds.
     */
    public info_clear(): void;

    public inside(position: vector): boolean;

    public inside(position: vector, epsilon: f32): boolean;

    public inv_box_can_take_status(): boolean;

    public inv_box_closed(value1: boolean, value2: string): boolean;

    public is_active_task(task: CGameTask): boolean;

    public is_door_locked_for_npc(): boolean;

    public is_inv_box_empty(): boolean;

    public is_inv_upgrade_enabled(): boolean;

    /**
     * @returns Whether object is currently talking with actor and talk dialog is active.
     */
    public is_talking(): boolean;

    public is_trade_enabled(): boolean;

    /**
     * Get item in inventory slot.
     *
     * @param slot - Slot id.
     * @returns Item in slot, or `null`.
     */
    public item_in_slot(slot: u32): game_object | null;

    /**
     * Get item on belt by slot.
     *
     * @param slot - Belt slot id.
     * @returns Item on belt, or `null`.
     */
    public item_on_belt(slot: u32): game_object | null;

    public jump(vector: vector, value: f32): void;

    public make_object_visible_somewhen(game_object: game_object): void;

    public mark_item_dropped(game_object: game_object): void;

    public mass(): f32;

    public max_health(): f32;

    public night_vision_enabled(): boolean;

    public on_door_is_closed(): void;

    public on_door_is_open(): void;

    public out_restrictions(): string;

    public path_type(): unknown;

    public poltergeist_get_actor_ignore(): boolean;

    public profile_name(): string;

    public range(): f32;

    public rank(): i32;

    public remove_all_restrictions(): void;

    public restore_ignore_monster_threshold(): void;

    public restore_weapon(): void;

    public run_talk_dialog(game_object: game_object, value: boolean): void;

    public set_active_task(task: CGameTask): void;

    public set_actor_position(vector: vector): void;

    public set_anomaly_power(value: f32): void;

    public set_custom_panic_threshold(value: f32): void;

    public set_dest_loophole(): void;

    public set_dest_loophole(value: string): void;

    /**
     * Set goodwill toward another object.
     *
     * @param goodwill - Goodwill value.
     * @param object - Target object.
     */
    public set_goodwill(goodwill: i32, object: game_object): void;

    public set_home(
      name: string | null,
      min_radius: f32,
      max_radius?: f32,
      is_agressive?: boolean,
      mid_radius?: f32
    ): void;

    public set_home(
      lvid: u32 | null,
      min_radius: f32,
      max_radius?: f32,
      is_agressive?: boolean,
      mid_radius?: f32
    ): void;

    /**
     * Set level changer invitation hint text.
     *
     * @param hint - Text to show when trying to change level.
     */
    public set_level_changer_invitation(hint: string): void;

    public set_nonscript_usable(is_usable: boolean): void;

    public set_queue_size(value: u32): void;

    /**
     * Set relation to another object.
     *
     * @param relation - Relation id.
     * @param object - Target object.
     */
    public set_relation(relation: number, object: game_object): void;

    public set_smart_cover_target_fire_no_lookout(): unknown;

    public set_sound_mask(value: u32): void;

    public set_start_dialog(value: string): void;

    /**
     * Set tip text when actor is near and hovering aim over target.
     * As example, `talk`, `loot` and other kind of labels is possible when using this method.
     *
     * @param text - Text to set as tip.
     */
    public set_tip_text(text: string): void;

    public set_tip_text_default(): void;

    public set_trader_global_anim(value: string): void;

    public set_vis_state(value: f32): void;

    public sniper_fire_mode(): boolean;

    public sniper_fire_mode(value: boolean): void;

    public start_particles(value1: string, value2: string): void;

    public stop_talk(): void;

    public switch_to_upgrade(): void;

    // For weapons / outfits:

    /**
     * @param upgrade_section - Section of upgrade to check.
     * @returns Whether upgrade can be added.
     */
    public can_add_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - Section of upgrade to check.
     * @returns Whether upgrade can be installed.
     */
    public can_install_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - Section of upgrade to check.
     * @returns Whether upgrade is installed.
     */
    public has_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_group_section - Section of upgrade group to check.
     * @returns Whether upgrade group is installed.
     */
    public has_upgrade_group(upgrade_group_section: string): boolean;

    /**
     * @param upgrade_section - Section of upgrade to check parent group.
     * @returns Whether upgrade parent group is installed.
     */
    public has_upgrade_group_by_upgrade_id(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - Section of upgrade to add.
     * @returns Whether upgrade is installed successfully or not.
     */
    public add_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - Section of upgrade to install.
     * @returns Whether upgrade is installed successfully or not.
     */
    public install_upgrade(upgrade_section: string): boolean;

    /**
     * Iterate over all item upgrades.
     *
     * @param callback - Callback to call on each iteration to check installed upgrades.
     */
    public iterate_installed_upgrades(callback: (upgrade_section: string, object: game_object) => void): void;

    public target_body_state(): TXR_move;

    public target_movement_type(): number; /* EMovementType */

    /**
     * Transfer an item to another inventory owner.
     *
     * @param item - Item to transfer.
     * @param to - Recipient object.
     */
    public transfer_item(item: game_object, to: game_object): void;

    /**
     * Transfer money from another object to this object.
     *
     * @param amount - Money amount.
     * @param from - Source object.
     */
    public transfer_money(amount: i32, from: game_object): void;

    public unregister_in_combat(): void;

    public vertex_in_direction(value1: u32, vector: vector, value2: f32): u32;

    public vision_enabled(): boolean;

    public weapon_grenadelauncher_status(): i32;

    public weapon_is_silencer(): boolean;

    public weapon_scope_status(): i32;

    public weight(): f32;

    /**
     * Display in-game UI notification.
     *
     * @param title - Notification title.
     * @param text - Notification text.
     * @param icon_texture - Notification icon texture.
     * @param delay - Delay before show notification.
     * @param show_time - Time to show notification before hiding it.
     * @param type - Type of the notification (eNews = 0, eTalk = 1).
     */
    public give_game_news(
      title: string,
      text: string,
      icon_texture: string,
      delay: i32,
      show_time: i32,
      type?: Maybe<i32>
    ): void;

    /**
     * @param position - Target position to check.
     * @returns If target position is accessible by the object.
     */
    public accessible(position: vector): boolean;

    /**
     * @param vertex_id - Target vertex ID to check.
     * @returns If target vertex is accessible by the object.
     */
    public accessible(vertex_id: u32): boolean;

    public accuracy(): f32;

    public attachable_item_load_attach(value: string): void;

    /**
     * Find the best cover from one position against another.
     *
     * @param position - Search origin.
     * @param enemy_position - Threat position.
     * @param min_distance - Minimum distance.
     * @param max_distance - Maximum distance.
     * @param deviation - Allowed direction deviation.
     * @returns Cover point.
     */
    public best_cover(
      position: vector,
      enemy_position: vector,
      min_distance: f32,
      max_distance: f32,
      deviation: f32
    ): cover_point;

    /**
     * Get best known enemy.
     *
     * @returns Enemy object, or `null`.
     */
    public best_enemy(): game_object | null;

    /**
     * Get object center position.
     *
     * @returns Center position.
     */
    public center(): vector;

    /**
     * Check whether dead body inventory is closed.
     *
     * @returns Whether looting is closed.
     */
    public deadbody_closed_status(): boolean;

    /**
     * Get object death time.
     *
     * @returns Death time.
     */
    public death_time(): u32;

    /**
     * Enable or disable torch.
     *
     * @param is_enabled - Whether torch is enabled.
     */
    public enable_torch(is_enabled: boolean): void;

    public force_stand_sleep_animation(value: u32): void;

    public get_visibility_state(): i32;

    public in_loophole_range(value1: string, value2: string, vector: vector): boolean;

    public poltergeist_set_actor_ignore(value: boolean): void;

    public set_desired_position(): void;

    public set_desired_position(vector: vector): void;

    public set_force_anti_aim(value: boolean): void;

    public set_range(value: f32): void;

    public suitable_smart_cover(game_object: game_object): boolean;

    /**
     * Register a combat sound.
     *
     * @param prefix - Sound prefix.
     * @param priority - Sound priority.
     * @param type - Sound type.
     * @param mask - Sound mask.
     * @param internal_type - Internal sound type.
     * @param max_count - Maximum active sounds.
     * @param bone - Bone name.
     * @returns Registered sound id.
     */
    public add_combat_sound(
      prefix: string,
      priority: number,
      type: i32 /* Enum ESoundTypes */,
      mask: u32,
      internal_type: u32,
      max_count: u32,
      bone: string
    ): u32;

    /**
     * Switch monster into berserk state.
     */
    public berserk(): void;

    /**
     * Add action for game object entity.
     * Depending on priority pushes it to back or front of actions list.
     *
     * @param entity_action - Action to perform.
     * @param is_high_priority - Whether it is high priority action.
     */

    public command(entity_action: entity_action, is_high_priority: boolean): void;

    /**
     * Apply a hit descriptor to this object.
     *
     * @param hit - Hit descriptor.
     */
    public hit(hit: hit): void;

    /**
     * Mark patrol path cache as outdated.
     */
    public inactualize_patrol_path(): void;

    /**
     * Mark level path cache as outdated.
     */
    public inactualize_level_path(): void;

    /**
     * Mark game path cache as outdated.
     */
    public inactualize_game_path(): void;

    /**
     * Iterate over game object inventory.
     * Runs supplied callback for each item in inventory of the object.
     * If callback returns `true`, the cycle breaks.
     *
     * @param cb - Callback to run for each item.
     * @param object - Target object to run callback for (actually unused by the engine).
     */
    public iterate_inventory(
      cb: (this: void, owner: game_object, item: game_object) => void | boolean,
      object: game_object
    ): void;

    public movement_enabled(): boolean;

    public movement_enabled(value: boolean): void;

    public set_condition(condition: f32): void;

    /**
     * @param vertex_position - Position to test from.
     * @param target_position - Desired target position.
     * @returns Level vertex id and accessible position.
     */
    public accessible_nearest(vertex_position: vector, target_position: vector): LuaMultiReturn<[u32, vector]>;

    /**
     * Get queued action by index.
     *
     * @param index - Action index.
     * @returns Action object, or `null`.
     */
    public action_by_index(index: u32): entity_action | null;

    /**
     * @returns Whether game object is alive.
     */
    public alive(): boolean;

    public base_in_restrictions(): string;

    /**
     * Check whether scripts can capture this object.
     *
     * @returns Whether script capture is allowed.
     */
    public can_script_capture(): boolean;

    /**
     * @returns Object community like `monolith`, `stalker` or `zombied`.
     */
    public character_community<T extends string = string>(): T;

    public external_sound_stop(): void;

    public find_best_cover(vector: vector): cover_point;

    /**
     * Get current game graph vertex id.
     *
     * @returns Game vertex id.
     */
    public game_vertex_id(): u32;

    public get_helicopter(): CHelicopter;

    public get_sound_info(): SoundInfo;

    /**
     * Get object group id.
     *
     * @returns Group id.
     */
    public group(): i32;

    public inv_box_closed_status(): boolean;

    /**
     * Get current level vertex id.
     *
     * @returns Level vertex id.
     */
    public level_vertex_id(): u32;

    /**
     * Get remembered position of another object.
     *
     * @param object - Remembered object.
     * @returns Last remembered position.
     */
    public memory_position(object: game_object): vector;

    /**
     * Check whether current movement target is reached.
     *
     * @returns Whether movement target is reached.
     */
    public movement_target_reached(): boolean;

    /**
     * Get runtime object name.
     *
     * @returns Object name.
     */
    public name(): string;

    /**
     * Get parent object.
     *
     * @returns Parent object.
     */
    public parent(): game_object;

    /**
     * Get current world position.
     *
     * @returns Position vector.
     */
    public position(): vector;

    public register_in_combat(): void;

    public safe_cover(vector: vector, value1: f32, value2: f32): cover_point;

    /**
     * Enable or disable script control.
     *
     * @param script_control - Whether script control is enabled.
     * @param script_name - Script control name.
     */
    public script(script_control: boolean, script_name: string): void;

    public set_desired_direction(): void;

    public set_desired_direction(vector: vector): void;

    public set_manual_invisibility(value: boolean): void;

    public set_movement_type(EMovementType: number /* MonsterSpace::EMovementType */): void;

    public set_npc_position(vector: vector): void;

    public set_sound_threshold(value: f32): void;

    public set_trader_head_anim(value: string): void;

    public set_visual_name(name: string): void;

    public target_mental_state(): TXR_animation;

    public unregister_door_for_npc(): void;

    public ammo_get_count(): u16;

    public ammo_set_count(count: u16): void;

    public ammo_box_size(): u16;

    /**
     * Cast this object to a stalker wrapper.
     *
     * @returns Stalker wrapper.
     */
    public cast_Stalker(): CAI_Stalker;

    /**
     * Cast this object to an artefact wrapper.
     *
     * @returns Artefact wrapper.
     */
    public cast_Artefact(): CArtefact;

    /**
     * Cast this object to a car wrapper.
     *
     * @returns Car wrapper.
     */
    public cast_Car(): CCar;

    /**
     * Cast this object to a base game object wrapper.
     *
     * @returns Game object wrapper.
     */
    public cast_GameObject(): CGameObject;

    /**
     * Cast this object to a helicopter wrapper.
     *
     * @returns Helicopter wrapper.
     */
    public cast_Heli(): CHelicopter;

    /**
     * Cast this object to a space restrictor wrapper.
     *
     * @returns Space restrictor wrapper.
     */
    public cast_SpaceRestrictor(): CSpaceRestrictor;

    /**
     * Cast this object to a holder wrapper.
     *
     * @returns Holder wrapper.
     */
    public cast_HolderCustom(): holder;

    /**
     * Cast this object to a weapon wrapper.
     *
     * @returns Weapon wrapper.
     */
    public cast_Weapon(): CWeapon;

    /**
     * Cast this object to an ammo wrapper.
     *
     * @returns Ammo wrapper.
     */
    public cast_Ammo(): CWeaponAmmo;

    /**
     * Cast this object to a magazined weapon wrapper.
     *
     * @returns Magazined weapon wrapper.
     */
    public cast_WeaponMagazined(): CWeaponMagazined;

    /**
     * Cast this object to a script zone wrapper.
     *
     * @returns Script zone wrapper.
     */
    public cast_ScriptZone(): ce_script_zone;

    /**
     * Cast this object to a custom zone wrapper.
     *
     * @returns Custom zone wrapper.
     */
    public cast_CustomZone(): CCustomZone;

    /**
     * Cast this object to an alive entity wrapper.
     *
     * @returns Alive entity wrapper.
     */
    public cast_EntityAlive(): CEntityAlive;

    /**
     * Cast this object to an explosive wrapper.
     *
     * @returns Explosive wrapper.
     */
    public cast_Explosive(): explosive;

    /**
     * Cast this object to a physics shell holder wrapper.
     *
     * @returns Physics shell holder wrapper.
     */
    public cast_PhysicsShellHolder(): CPhysicsShellHolder;

    /**
     * Get time when an info portion was received.
     *
     * @param info - Info portion id.
     * @returns Game time.
     */
    public get_info_time(info: string): CTime;

    /**
     * Check whether a bone is visible.
     *
     * @param bone - Bone name.
     * @returns Whether bone is visible.
     */
    public bone_visible(bone: string): boolean;

    /**
     * Check whether weapon supports an ammo type.
     *
     * @param type - Ammo section.
     * @returns Whether ammo type is supported.
     */
    public has_ammo_type(type: string): boolean;

    /**
     * Check whether an item is on belt.
     *
     * @param object - Item object.
     * @returns Whether item is on belt.
     */
    public is_on_belt(object: game_object): boolean;

    /**
     * Use an object.
     *
     * @param object - Object to use.
     */
    public use(object: game_object): void;

    /**
     * Set remaining item uses count.
     *
     * @param remaining - Count of remaining uses for item before destroy.
     */
    public set_remaining_uses(remaining: u8): void;

    /**
     * Get maximum item uses.
     *
     * @returns Maximum uses.
     */
    public get_max_uses(): u8;

    /**
     * Get remaining item uses.
     *
     * @returns Remaining uses.
     */
    public get_remaining_uses(): u8;

    public set_restrictor_type(type: u8): void;

    public get_restrictor_type(): u8;

    public set_spatial_type(type: u8): void;

    public set_weapon_type(type: u8): void;

    public get_weapon_substate(): u8;

    public start_trade(object: game_object): void;

    public start_upgrade(object: game_object): void;

    public switch_state(state: u32): void;

    public phantom_set_enemy(object: game_object): void;

    public set_actor_jump_speed(speed: f32): void;

    public set_actor_max_walk_weight(weight: f32): void;

    public set_actor_max_weight(weight: f32): void;

    public set_actor_run_coef(coef: f32): void;

    public set_actor_runback_coef(coef: f32): void;

    public set_actor_sprint_koef(coef: f32): void;

    public set_additional_max_walk_weight(weight: f32): void;

    public set_additional_max_weight(weight: f32): void;

    public set_ammo_type(type: u8): void;

    public set_artefact_bleeding(rate: f32): void;

    public set_artefact_health(rate: f32): void;

    public set_artefact_power(rate: f32): void;

    public set_artefact_radiation(rate: f32): void;

    public set_artefact_satiety(rate: f32): void;

    public set_bone_visible(name: string, a: boolean, b: boolean): void;

    public set_character_icon(icon: string): void;

    /**
     * Directly set entity health instead of applying a health property delta.
     *
     * @remarks
     * This binding exists because the normal health property setter routes through conditions().ChangeHealth.
     */
    public set_health_ex(value: f32): void;

    public set_main_weapon_type(type: u32): void;

    public get_actor_jump_speed(): f32;

    public get_actor_max_walk_weight(): f32;

    public get_actor_max_weight(): f32;

    public get_actor_run_coef(): f32;

    public get_actor_runback_coef(): f32;

    public get_actor_sprint_koef(): f32;

    public get_additional_max_walk_weight(): f32;

    public get_additional_max_weight(): f32;

    public get_anomaly_power(): f32;

    public get_artefact_bleeding(): f32;

    public get_artefact_health(): f32;

    public get_artefact_power(): f32;

    public get_artefact_radiation(): f32;

    public get_artefact_satiety(): f32;

    public get_luminocity(): f32;

    public get_luminocity_hemi(): f32;

    public get_total_weight(): f32;

    public get_attached_vehicle(): game_object;

    public belt_count(): u32;

    public get_main_weapon_type(): u32;

    public get_spatial_type(): u32;

    public get_state(): u32;

    public get_weapon_type(): u32;

    public play_hud_motion(chat: string, bool: boolean, int: u32): u32;

    public attach_vehicle(vehicle: game_object): void;

    public clear_game_news(): void;

    public detach_vehicle(): void;

    /**
     * Move object to a position immediately.
     *
     * @param position - Target position.
     * @param update_ai_location - Whether AI location should be updated.
     */
    public force_set_position(position: vector, update_ai_location: boolean): void;

    public get_ammo_count_for_type(type: u8): i32;

    public weapon_in_grenade_mode(): boolean;

    public is_entity_alive(): boolean;

    public is_inventory_item(): boolean;

    public is_inventory_owner(): boolean;

    public is_actor(): boolean;

    public is_custom_monster(): boolean;

    public is_weapon(): boolean;

    public is_outfit(): boolean;

    public is_scope(): boolean;

    public is_silencer(): boolean;

    public is_grenade_launcher(): boolean;

    public is_weapon_magazined(): boolean;

    public is_space_restrictor(): boolean;

    public is_stalker(): boolean;

    public is_anomaly(): boolean;

    public is_monster(): boolean;

    public is_artefact(): boolean;

    public is_ammo(): boolean;

    public is_trader(): boolean;

    public is_hud_item(): boolean;

    public is_weapon_gl(): boolean;

    public is_inventory_box(): boolean;
  }

  /*
   * Vector<MemorySpace::CNotYetVisibleObject,xalloc<MemorySpace::CNotYetVisibleObject> > not_yet_visible_objects();
   * vector<MemorySpace::CSoundObject,xalloc<MemorySpace::CSoundObject>> memory_sound_objects();
   * enum DetailPathManager::EDetailPathType detail_path_type();
   * enum ETaskState get_task_state(char const*);
   * enum MonsterSpace::EBodyState body_state();
   * enum MonsterSpace::EBodyState target_body_state();
   * enum MonsterSpace::EMentalState mental_state();
   * enum MonsterSpace::EMentalState target_mental_state();
   * enum MonsterSpace::EMovementType movement_type();
   * enum MovementManager::EPathType path_type();
   * remove_danger();
   * remove_memory_sound_object();
   * remove_memory_visible_object();
   * remove_memory_hit_object();
   * void iterate_feel_touch(function<void>);
   * }
   *
   * //.def("is_medkit", &CScriptGameObject::IsMedkit)
   * //.def("is_eatable_item", &CScriptGameObject::IsEatableItem)
   * //.def("is_antirad", &CScriptGameObject::IsAntirad)
   * //.def("is_game_object", &CScriptGameObject::IsGameObject)
   * //.def("is_car", &CScriptGameObject::IsCar)
   * //.def("is_helicopter", &CScriptGameObject::IsHeli)
   * //.def("is_holder", &CScriptGameObject::IsHolderCustom)
   * //.def("is_explosive", &CScriptGameObject::IsExplosive)
   * //.def("is_script_zone", &CScriptGameObject::IsScriptZone)
   * //.def("is_projector", &CScriptGameObject::IsProjector)
   * //.def("is_food_item", &CScriptGameObject::IsFoodItem)
   * //.def("is_missile", &CScriptGameObject::IsMissile)
   * //.def("is_physics_shell_holder", &CScriptGameObject::IsPhysicsShellHolder)
   * //.def("is_grenade", &CScriptGameObject::IsGrenade)
   * //.def("is_bottle_item", &CScriptGameObject::IsBottleItem)
   * //.def("is_torch", &CScriptGameObject::IsTorch)
   */
}

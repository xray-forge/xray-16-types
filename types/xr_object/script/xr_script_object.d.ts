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
    /**
     * Engine enum value for `game_object.dummy`.
     */
    public static readonly dummy: -1;

    /**
     * Engine enum value for `game_object.game_path`.
     */
    public static readonly game_path: 0;
    /**
     * Engine enum value for `game_object.level_path`.
     */
    public static readonly level_path: 1;
    /**
     * Engine enum value for `game_object.patrol_path`.
     */
    public static readonly patrol_path: 2;
    /**
     * Engine enum value for `game_object.no_path`.
     */
    public static readonly no_path: 3;

    /**
     * Engine enum value for `game_object.friend`.
     */
    public static readonly friend: 0;
    /**
     * Engine enum value for `game_object.neutral`.
     */
    public static readonly neutral: 1;
    /**
     * Engine enum value for `game_object.enemy`.
     */
    public static readonly enemy: 2;

    /**
     * Engine enum value for `game_object.alifeMovementTypeMask`.
     */
    public static readonly alifeMovementTypeMask: 0;
    /**
     * Engine enum value for `game_object.alifeMovementTypeRandom`.
     */
    public static readonly alifeMovementTypeRandom: 1;

    /**
     * Engine enum value for `game_object.dialog_pda_msg`.
     */
    public static readonly dialog_pda_msg: 0;
    /**
     * Engine enum value for `game_object.info_pda_msg`.
     */
    public static readonly info_pda_msg: 1;
    /**
     * Engine enum value for `game_object.no_pda_msg`.
     */
    public static readonly no_pda_msg: 2;

    /**
     * Engine enum value for `game_object.relation_kill`.
     */
    public static readonly relation_kill: 0;
    /**
     * Engine enum value for `game_object.relation_attack`.
     */
    public static readonly relation_attack: 1;
    /**
     * Engine enum value for `game_object.relation_fight_help_human`.
     */
    public static readonly relation_fight_help_human: 2;
    /**
     * Engine enum value for `game_object.relation_fight_help_monster`.
     */
    public static readonly relation_fight_help_monster: 4;

    /**
     * Engine enum value for `game_object.movement`.
     */
    public static readonly movement: 0;
    /**
     * Engine enum value for `game_object.watch`.
     */
    public static readonly watch: 1;
    /**
     * Engine enum value for `game_object.animation`.
     */
    public static readonly animation: 2;
    /**
     * Engine enum value for `game_object.sound`.
     */
    public static readonly sound: 3;
    /**
     * Engine enum value for `game_object.particle`.
     */
    public static readonly particle: 4;
    /**
     * Engine enum value for `game_object.object`.
     */
    public static readonly object: 5;
    /**
     * Engine enum value for `game_object.action_type_count`.
     */
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

    /**
     * Engine-created script object wrapper.
     */
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

    /**
     * Get objects that recently hit this object.
     *
     * @returns Engine hit-memory collection.
     */
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

    /**
     * Get current stalker mental state.
     *
     * @returns Mental state id.
     */
    public mental_state<T extends number>(): T; // Todo: unknown enum

    /**
     * Get objects that are being detected but are not visible yet.
     *
     * @returns Engine not-yet-visible collection.
     */
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

    /**
     * Open talk dialog with this object.
     */
    public switch_to_talk(): void;

    /**
     * @returns Object team id.
     */
    public team(): i32;

    /**
     * @returns Whether smart-cover selection is restricted to smart covers only.
     */
    public use_smart_covers_only(): boolean;

    /**
     * Restrict or allow regular cover selection.
     *
     * @param value - Whether only smart covers may be selected.
     */
    public use_smart_covers_only(value: boolean): void;

    /**
     * Attach a weapon addon from an inventory object.
     *
     * @param object - Addon object.
     */
    public weapon_addon_attach(object: game_object): void;

    /**
     * Detach a weapon addon by section name.
     *
     * @param addon - Addon section name.
     */
    public weapon_addon_detach(addon: string): void;

    /**
     * @returns Whether the active weapon has a scope attached.
     */
    public weapon_is_scope(): boolean;

    /**
     * @returns Active weapon silencer status.
     */
    public weapon_silencer_status(): i32;

    /**
     * @returns Whether the active weapon is strapped.
     */
    public weapon_strapped(): boolean;

    /**
     * @returns Whether the active weapon is unstrapped.
     */
    public weapon_unstrapped(): boolean;

    /**
     * @returns Name of the object that last hit this object.
     */
    public who_hit_name(): string;

    /**
     * @returns Section name of the object that last hit this object.
     */
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

    /**
     * @returns Current stalker body state.
     */
    public body_state(): TXR_MonsterBodyState;

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

    /**
     * Mark this dead body inventory as opened or closed.
     *
     * @param value - Whether the dead body is closed.
     */
    public deadbody_closed(value: boolean): void;

    /**
     * @returns Whether death sounds are enabled.
     */
    public death_sound_enabled(): boolean;

    /**
     * Enable or disable death sounds.
     *
     * @param value - Whether death sounds are enabled.
     */
    public death_sound_enabled(value: boolean): void;

    /**
     * Get object facing direction.
     *
     * @returns Direction vector.
     */
    public direction(): vector;

    /**
     * Disable this anomaly object.
     */
    public disable_anomaly(): void;

    /**
     * @returns Whether hit marks are disabled.
     */
    public disable_hit_marks(): boolean;

    /**
     * Enable or disable hit mark suppression.
     *
     * @param value - Whether hit marks should be disabled.
     */
    public disable_hit_marks(value: boolean): void;

    /**
     * Disable inventory upgrades for this object.
     */
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

    /**
     * Enable inventory upgrades for this object.
     */
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

    /**
     * @returns Movement path extrapolation length.
     */
    public extrapolate_length(): f32;

    /**
     * Set movement path extrapolation length.
     *
     * @param value - Extrapolation length.
     */
    public extrapolate_length(value: f32): void;

    /**
     * Force a fake-dead monster to stand up.
     */
    public fake_death_stand_up(): void;

    /**
     * @returns Current object field of view.
     */
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

    /**
     * Cast this object to an artefact.
     *
     * @returns Artefact object.
     */
    public get_artefact(): CArtefact;

    /**
     * Cast this object to a campfire.
     *
     * @returns Campfire object.
     */
    public get_campfire(): CZoneCampfire;

    /**
     * @returns Currently equipped outfit, or `null` when none is equipped.
     */
    public get_current_outfit(): game_object | null;

    /**
     * @returns Current patrol path point index.
     */
    public get_current_point_index(): u32;

    /**
     * @returns Whether monster anti-aim is forced.
     */
    public get_force_anti_aim(): boolean;

    /**
     * Cast this object to a hanging lamp.
     *
     * @returns Hanging lamp object.
     */
    public get_hanging_lamp(): hanging_lamp;

    /**
     * Cast this object to a holder.
     *
     * @returns Holder object.
     */
    public get_holder_class(): holder;

    /**
     * @returns Current movement speed vector.
     */
    public get_movement_speed(): vector;

    /**
     * @returns Name of lua script controlling monster object.
     */
    public get_script_name(): string;

    /**
     * @returns Visual name assigned to this object.
     */
    public get_visual_name<T extends string = string>(): T;

    /**
     * Check whether this object has an info portion.
     *
     * @param info_portion - Info portion id.
     * @returns Whether the info portion is present.
     */
    public has_info(info_portion: string): boolean;

    /**
     * Hide the actor weapon model.
     */
    public hide_weapon(): void;

    /**
     * @returns Minimum idle time for smart-cover animation.
     */
    public idle_min_time(): f32;

    /**
     * Set minimum idle time for smart-cover animation.
     *
     * @param value - Idle time in seconds.
     */
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

    /**
     * @returns Active input restriction names.
     */
    public in_restrictions(): string;

    /**
     * @returns Whether this stalker is currently in a smart cover.
     */
    public in_smart_cover(): boolean;

    /**
     * Available only in debug mode.
     * Sets information for game object for debug.
     */
    public info_add(text: string): void;

    /**
     * Set whether items can be taken from this inventory box.
     *
     * @param value - Whether taking items is allowed.
     * @returns New take permission state.
     */
    public inv_box_can_take(value: boolean): boolean;

    /**
     * @returns Whether this monster ignores damage.
     */
    public invulnerable(): boolean;

    /**
     * Enable or disable monster damage immunity.
     *
     * @param value - Whether the monster should be invulnerable.
     */
    public invulnerable(value: boolean): void;

    /**
     * @returns Whether the object is currently turning its body.
     */
    public is_body_turning(): boolean;

    /**
     * @returns Whether this level changer is enabled.
     */
    public is_level_changer_enabled(): boolean;

    /**
     * @returns Whether nearby items are available for pickup.
     */
    public is_there_items_to_pickup(): boolean;

    /**
     * Kill a target object.
     *
     * @param object - Target object.
     */
    public kill(object: game_object): void;

    /**
     * Sample a future position on the current movement path.
     *
     * @param distance - Distance along the path.
     * @param position - Output position.
     * @returns Level vertex id for the sampled position.
     */
    public location_on_path(distance: f32, position: vector): u32;

    /**
     * Lock this door for NPC navigation.
     */
    public lock_door_for_npc(): void;

    /**
     * @returns Minimum time spent looking out from smart cover.
     */
    public lookout_min_time(): f32;

    /**
     * Set minimum time spent looking out from smart cover.
     *
     * @param time - Lookout time in seconds.
     */
    public lookout_min_time(time: f32): void;

    /**
     * Make an inventory item active.
     *
     * @param item - Item to activate.
     */
    public make_item_active(item: game_object): void;

    /**
     * Check whether an item was marked as dropped by this object.
     *
     * @param object - Item object.
     * @returns Whether the item is marked as dropped.
     */
    public marked_dropped(object: game_object): boolean;

    /**
     * Get sound memory records.
     *
     * @returns Engine sound-memory collection.
     */
    public memory_sound_objects(): unknown;

    /**
     * @returns Money owned by this inventory owner.
     */
    public money(): u32;

    /**
     * @returns Motivation action planner for this object.
     */
    public motivation_action_manager(): action_planner;

    /**
     * @returns Current movement type id.
     */
    public movement_type(): number; // Todo: unknown enum

    /**
     * @returns Current patrol path name, or `null` when no patrol path is active.
     */
    public patrol(): string | null;

    /**
     * Mark the current patrol path as needing recalculation.
     */
    public patrol_path_make_inactual(): void;

    /**
     * Play a model animation cycle.
     *
     * @param animation - Animation name.
     * @param mix_in - Whether to blend with current animation.
     */
    public play_cycle(animation: string, mix_in: boolean): void;

    /**
     * Play a model animation cycle with default blending.
     *
     * @param animation - Animation name.
     */
    public play_cycle(animation: string): void;

    /**
     * Play an NPC sound by internal sound type.
     *
     * @param sound_type - Internal sound type.
     * @param max_start_time - Optional maximum start delay.
     * @param min_start_time - Optional minimum start delay.
     * @param max_stop_time - Optional maximum stop time.
     * @param min_stop_time - Optional minimum stop time.
     * @param id - Optional sound id.
     */
    public play_sound(
      sound_type: u32,
      max_start_time?: u32,
      min_start_time?: u32,
      max_stop_time?: u32,
      min_stop_time?: u32,
      id?: u32
    ): void;

    /**
     * Register this door as usable by NPC navigation.
     */
    public register_door_for_npc(): void;

    /**
     * Clear the monster home restriction.
     */
    public remove_home(): void;

    /**
     * Remove movement restrictions from this object.
     *
     * @param out_restrictions - Out restriction names.
     * @param in_restrictions - In restriction names.
     */
    public remove_restrictions(out_restrictions: string, in_restrictions: string): void;

    /**
     * Stop and remove an NPC sound by internal sound type.
     *
     * @param sound_type - Internal sound type.
     */
    public remove_sound(sound_type: u32): void;

    /**
     * Restore the default start dialog for this object.
     */
    public restore_default_start_dialog(): void;

    /**
     * Restore default monster-ignore distance.
     */
    public restore_max_ignore_monster_distance(): void;

    /**
     * @returns Config section name of this object.
     */
    public section<T extends string = string>(): T;

    /**
     * Check whether this object can see another object.
     *
     * @param object - Object to test.
     * @returns Whether the object is visible.
     */
    public see(object: game_object): boolean;

    /**
     * Check whether this object can see a named point or object.
     *
     * @param value - Name to test.
     * @returns Whether the target is visible.
     */
    public see(value: string): boolean;

    /**
     * Load sell condition factors from an ini section.
     *
     * @param ini_file - Source ini file.
     * @param section - Section name.
     */
    public sell_condition(ini_file: ini_file, section: string): void;

    /**
     * Set sell condition factors directly.
     *
     * @param friend_factor - Condition factor for friendly buyers.
     * @param enemy_factor - Condition factor for hostile buyers.
     */
    public sell_condition(friend_factor: f32, enemy_factor: f32): void;

    /**
     * Apply a physics force to this object.
     *
     * @param force - Force vector.
     * @param magnitude - Force magnitude.
     * @param impulse - Impulse factor.
     */
    public set__force(force: vector, magnitude: number, impulse: number): void;

    /**
     * Set actor relation flags for this object.
     *
     * @param value - Relation flags.
     */
    public set_actor_relation_flags(value: flags32): void;

    /**
     * Enable or disable bloodsucker alien control.
     *
     * @param is_enabled - Whether alien control is active.
     */
    public set_alien_control(is_enabled: boolean): void;

    /**
     * Set target body state for stalker movement.
     *
     * @param state - Body state.
     */
    public set_body_state(state: TXR_MonsterBodyState): void;

    /**
     * Configure bloodsucker capture animation jump.
     *
     * @param object - Target object.
     * @param animation - Capture animation name.
     * @param position - Jump position.
     * @param factor - Jump force factor.
     */
    public set_capture_anim(object: game_object, animation: string, position: vector, factor: f32): void;

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

    /**
     * Enable or disable bloodsucker collision override.
     *
     * @param value - Whether collision is disabled.
     */
    public set_collision_off(value: boolean): void;

    /**
     * Restore the default panic threshold.
     */
    public set_default_panic_threshold(): void;

    /**
     * Set destination game graph vertex.
     *
     * @param value - Game vertex id.
     */
    public set_dest_game_vertex_id(value: u16): void;

    /**
     * Set destination level vertex.
     *
     * @param vertex_id - Target level vertex id.
     */
    public set_dest_level_vertex_id(vertex_id: u32): void;

    /**
     * Set detail path type used by movement.
     *
     * @param EDetailPathType - Detail path type id.
     */
    public set_detail_path_type(EDetailPathType: unknown /* Enum DetailPathManager::EDetailPathType */): void;

    /**
     * Force bloodsucker invisibility state.
     *
     * @param is_invisible - Whether the object should be invisible.
     */
    public set_invisible(is_invisible: boolean): void;

    /**
     * Set movement target selection type.
     *
     * @param type - Selection type id.
     */
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

    /**
     * Make smart-cover target selection prefer idle positions.
     */
    public set_smart_cover_target_idle(): void;

    /**
     * Set sympathy value used by relation logic.
     *
     * @param value - Sympathy value.
     */
    public set_sympathy(value: f32): void;

    /**
     * Set trader sound for an animation state.
     *
     * @param animation - Trader animation name.
     * @param sound - Sound name.
     */
    public set_trader_sound(animation: string, sound: string): void;

    /**
     * @returns Current sight parameters.
     */
    public sight_params(): CSightParams;

    /**
     * Enable or disable enemy transfer skipping.
     *
     * @param value - Whether enemy transfer should be skipped.
     */
    public skip_transfer_enemy(value: boolean): void;

    /**
     * @returns Whether sniper update rate is enabled.
     */
    public sniper_update_rate(): boolean;

    /**
     * Enable or disable sniper update rate.
     *
     * @param value - Whether sniper update rate is enabled.
     */
    public sniper_update_rate(value: boolean): void;

    /**
     * @returns Spawn ini attached to this object, or `null`.
     */
    public spawn_ini(): ini_file | null;

    /**
     * @returns Whether special danger movement is enabled.
     */
    public special_danger_move(): boolean;

    /**
     * Enable or disable special danger movement.
     *
     * @param value - Whether special danger movement is enabled.
     */
    public special_danger_move(value: boolean): void;

    /**
     * Stop particles attached to a bone.
     *
     * @param name - Particle effect name.
     * @param bone - Bone name.
     */
    public stop_particles(name: string, bone: string): void;

    /**
     * Open trade dialog with this object.
     */
    public switch_to_trade(): void;

    /**
     * @returns Sympathy value used by relation logic.
     */
    public sympathy(): f32;

    /**
     * @returns Whether this NPC may take items.
     */
    public take_items_enabled(): boolean;

    /**
     * Enable or disable item taking for this NPC.
     *
     * @param value - Whether item taking is enabled.
     */
    public take_items_enabled(value: boolean): void;

    /**
     * @returns Whether actor torch is enabled.
     */
    public torch_enabled(): boolean;

    /**
     * Unload the active weapon magazine into inventory.
     */
    public unload_magazine(): void;

    /**
     * Unlock this door for NPC navigation.
     */
    public unlock_door_for_npc(): void;

    /**
     * @returns Visibility threshold used by this object.
     */
    public visibility_threshold(): f32;

    /**
     * @returns Whether the active weapon has an attached grenade launcher.
     */
    public weapon_is_grenadelauncher(): boolean;

    /**
     * Set the NPC sight mode from a sight type and movement-facing options.
     *
     * @param type - Sight mode.
     * @param torso_look - Whether the torso should turn toward the sight target.
     * @param path - Whether to use the current path direction.
     */
    public set_sight(type: TXR_SightType, torso_look: boolean, path: boolean): void;

    /**
     * Set the NPC sight mode toward a point, with a look-over delay.
     *
     * @param type - Sight mode.
     * @param target - Point to look at, or `null` to clear the explicit point.
     * @param look_over_delay - Delay before looking over.
     */
    public set_sight(type: TXR_SightType, target: vector | null, look_over_delay: u32): void;

    /**
     * Set the NPC sight mode toward a point and optionally fire at it.
     *
     * @param type - Sight mode.
     * @param target - Point to look at.
     * @param torso_look - Whether the torso should turn toward the target.
     * @param fire_object - Whether the object should fire while aiming.
     */
    public set_sight(type: TXR_SightType, target: vector, torso_look: boolean, fire_object: boolean): void;

    /**
     * Set the NPC sight mode toward a point.
     *
     * @param type - Sight mode.
     * @param target - Point to look at.
     * @param torso_look - Whether the torso should turn toward the target.
     */
    public set_sight(type: TXR_SightType, target: vector, torso_look: boolean): void;

    /**
     * Set the NPC sight mode toward a point.
     *
     * @param type - Sight mode.
     * @param target - Point to look at.
     */
    public set_sight(type: TXR_SightType, target: vector): void;

    /**
     * Set the NPC sight target to another object.
     *
     * @param object - Object to look at.
     * @param torso_look - Whether the torso should turn toward the target.
     * @param fire_object - Whether the object should fire while aiming.
     * @param no_pitch - Whether to ignore pitch while aiming.
     */
    public set_sight(object: game_object, torso_look?: boolean, fire_object?: boolean, no_pitch?: boolean): void;

    /**
     * Set the state of a task by id.
     *
     * @param state - New task state.
     * @param task_id - Task id.
     */
    public set_task_state(state: TXR_TaskState, task_id: string): void;

    /**
     * Enable or disable visual memory for this object.
     *
     * @param enabled - Whether visual memory is enabled.
     */
    public set_visual_memory_enabled(enabled: boolean): void;

    /**
     * Set trade show condition.
     *
     * @param ini_file - Trade config.
     * @param section - Condition section.
     */
    public show_condition(ini_file: unknown, section: string): void;

    /**
     * @returns Current sound voice prefix used by the object sound player.
     */
    public sound_prefix(): string;

    /**
     * Set the sound voice prefix used by the object sound player.
     *
     * @param prefix - Sound voice prefix.
     */
    public sound_prefix(prefix: string): void;

    /**
     * @returns Whether this stalker is marked as wounded.
     */
    public wounded(): boolean;

    /**
     * Mark this stalker as wounded or recovered.
     *
     * @param value - Whether the stalker is wounded.
     */
    public wounded(value: boolean): void;

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

    /**
     * @returns Number of active sounds registered on this object.
     */
    public active_sound_count(): i32;

    /**
     * Get number of active sounds registered on this object.
     *
     * @param only_playing - Whether to count only sounds currently playing.
     * @returns Number of active sounds.
     */
    public active_sound_count(only_playing: boolean): i32;

    /**
     * Allow or block breaking the current actor talk dialog.
     *
     * @param value - Whether the dialog may be interrupted.
     */
    public allow_break_talk_dialog(value: boolean): void;

    /**
     * @returns Distance used when applying smart-cover loophole direction.
     */
    public apply_loophole_direction_distance(): f32;

    /**
     * Set the distance used when applying smart-cover loophole direction.
     *
     * @param distance - Loophole direction distance.
     */
    public apply_loophole_direction_distance(distance: f32): void;

    /**
     * @returns Whether this attachable item is enabled.
     */
    public attachable_item_enabled(): boolean;

    /**
     * @returns Whether this burer is forced to use a gravity attack.
     */
    public burer_get_force_gravi_attack(): boolean;

    /**
     * @returns Whether this monster is forced to use anti-aim behavior.
     */
    public get_force_anti_aim(): boolean;

    /**
     * Set trade buy conditions from an ini section.
     *
     * @param ini_file - Trade config.
     * @param section - Condition section.
     */
    public buy_condition(ini_file: ini_file, section: string): void;

    /**
     * Set default trade buy factors.
     *
     * @param friend_factor - Factor used for friendly relations.
     * @param enemy_factor - Factor used for hostile relations.
     */
    public buy_condition(friend_factor: f32, enemy_factor: f32): void;

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

    /**
     * Allow or block taking items from this dead body.
     *
     * @param value - Whether taking items is allowed.
     */
    public deadbody_can_take(value: boolean): void;

    /**
     * @returns Whether items can be taken from this dead body.
     */
    public deadbody_can_take_status(): boolean;

    /**
     * @returns Current detail path type used by the object's movement manager.
     */
    public detail_path_type(): unknown;

    /**
     * Enable or disable weapon show, hide and reload sounds for this inventory owner.
     *
     * @param value - Whether those sounds should play.
     */
    public disable_show_hide_sounds(value: boolean): void;

    /**
     * Enable this anomaly zone.
     */
    public enable_anomaly(): void;

    /**
     * Method for inventory items to set them enabled / disabled for stalkers.
     * As result, medkit or detector can be activated by stalker.
     *
     * @param is_enabled - Whether item should be enabled for usage by owning object.
     */
    public enable_attachable_item(is_enabled: boolean): void;

    /**
     * Enable actor talk interaction with this inventory owner.
     */
    public enable_talk(): void;

    /**
     * Enable actor trade interaction with this inventory owner.
     */
    public enable_trade(): void;

    /**
     * Enable or disable visual memory for this monster.
     *
     * @param value - Whether vision is enabled.
     */
    public enable_vision(value: boolean): void;

    /**
     * @returns Whether this zombie should fall down in fake-death state.
     */
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

    /**
     * @returns Actor relation flags stored for this character.
     */
    public get_actor_relation_flags(): flags32;

    /**
     * @returns Ammo count currently loaded in this weapon magazine.
     */
    public get_ammo_in_magazine(): u32;

    /**
     * @returns This object as a car.
     */
    public get_car(): CCar;

    /**
     * @returns Corpse selected by this monster, or `null`.
     */
    public get_corpse(): game_object | null;

    /**
     * @returns Current holder used by the actor, or `null`.
     */
    public get_current_holder(): holder | null;

    /**
     * @returns Current enemy object, or `null`.
     */
    public get_enemy(): game_object | null;

    /**
     * @returns Current enemy strength estimate.
     */
    public get_enemy_strength(): i32;

    /**
     * @returns Physics shell for this object, or `null`.
     */
    public get_physics_shell(): physics_shell | null;

    /**
     * Get current start dialog id.
     */
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

    /**
     * @returns Current delay between group grenade throws.
     */
    public group_throw_time_interval(): u32;

    /**
     * Set delay between group grenade throws.
     *
     * @param interval - Throw interval.
     */
    public group_throw_time_interval(interval: u32): void;

    /**
     * @returns Current head orientation for this creature.
     */
    public head_orientation(): vector;

    /**
     * @returns Monster ignore threshold used by this stalker's enemy memory.
     */
    public ignore_monster_threshold(): f32;

    /**
     * Set monster ignore threshold used by this stalker's enemy memory.
     *
     * @param threshold - Ignore threshold, clamped by the engine.
     */
    public ignore_monster_threshold(threshold: f32): void;

    /**
     * Check whether a point is in range of the current smart-cover loophole.
     *
     * @param position - Point to test.
     * @returns Whether the point is in current loophole range.
     */
    public in_current_loophole_range(position: vector): boolean;

    /**
     * Reset debugging information about object.
     * Available only for debug builds.
     */
    public info_clear(): void;

    /**
     * Check whether a position is inside this space restrictor.
     *
     * @param position - Position to test.
     * @returns Whether the position is inside.
     */
    public inside(position: vector): boolean;

    /**
     * Check whether a position is inside this space restrictor.
     *
     * @param position - Position to test.
     * @param epsilon - Extra tolerance.
     * @returns Whether the position is inside.
     */
    public inside(position: vector, epsilon: f32): boolean;

    /**
     * @returns Whether items can be taken from this inventory box.
     */
    public inv_box_can_take_status(): boolean;

    /**
     * Close or open this inventory box.
     *
     * @param is_closed - Whether the box is closed.
     * @param reason - Script reason stored for the close state.
     * @returns Whether the close state was applied.
     */
    public inv_box_closed(is_closed: boolean, reason: string): boolean;

    /**
     * @param task - Task object to check.
     * @returns Whether this task is active.
     */
    public is_active_task(task: CGameTask): boolean;

    /**
     * @returns Whether this door is locked for NPC navigation.
     */
    public is_door_locked_for_npc(): boolean;

    /**
     * @returns Whether this inventory box has no items.
     */
    public is_inv_box_empty(): boolean;

    /**
     * @returns Whether inventory upgrade interaction is enabled.
     */
    public is_inv_upgrade_enabled(): boolean;

    /**
     * @returns Whether object is currently talking with actor and talk dialog is active.
     */
    public is_talking(): boolean;

    /**
     * @returns Whether trade interaction is enabled.
     */
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

    /**
     * Force this monster to jump toward a point.
     *
     * @param target - Jump target.
     * @param factor - Jump tuning factor used by the monster controller.
     */
    public jump(target: vector, factor: f32): void;

    /**
     * Make another object temporarily visible to this object's memory.
     *
     * @param object - Object to reveal.
     */
    public make_object_visible_somewhen(object: game_object): void;

    /**
     * Mark an inventory item as dropped.
     *
     * @param object - Item object.
     */
    public mark_item_dropped(object: game_object): void;

    /**
     * @returns Physics mass of this object.
     */
    public mass(): f32;

    /**
     * @returns Maximum health for this entity.
     */
    public max_health(): f32;

    /**
     * @returns Whether night vision is enabled on this torch item.
     */
    public night_vision_enabled(): boolean;

    /**
     * Notify this door that it has closed.
     */
    public on_door_is_closed(): void;

    /**
     * Notify this door that it has opened.
     */
    public on_door_is_open(): void;

    /**
     * @returns Current outgoing restriction list.
     */
    public out_restrictions(): string;

    /**
     * @returns Current movement path type.
     */
    public path_type(): unknown;

    /**
     * @returns Whether this poltergeist ignores the actor.
     */
    public poltergeist_get_actor_ignore(): boolean;

    /**
     * @returns Specific character profile name.
     */
    public profile_name(): string;

    /**
     * @returns Current vision or weapon range for this object.
     */
    public range(): f32;

    /**
     * @returns Character rank.
     */
    public rank(): i32;

    /**
     * Clear all space restrictions from this object.
     */
    public remove_all_restrictions(): void;

    /**
     * Restore default monster ignore threshold.
     */
    public restore_ignore_monster_threshold(): void;

    /**
     * Let the actor draw weapons again after a forced hide.
     */
    public restore_weapon(): void;

    /**
     * Start actor talk dialog with another inventory owner.
     *
     * @param object - Dialog partner.
     * @param disable_break - Whether the dialog cannot be interrupted.
     */
    public run_talk_dialog(object: game_object, disable_break: boolean): void;

    /**
     * Mark a task as active.
     *
     * @param task - Task to activate.
     */
    public set_active_task(task: CGameTask): void;

    /**
     * Move the actor to a position.
     *
     * @param position - New actor position.
     */
    public set_actor_position(position: vector): void;

    /**
     * Set anomaly power.
     *
     * @param power - New anomaly power.
     */
    public set_anomaly_power(power: f32): void;

    /**
     * Set custom panic threshold for this base monster.
     *
     * @param threshold - Panic threshold.
     */
    public set_custom_panic_threshold(threshold: f32): void;

    /**
     * Clear desired smart-cover loophole.
     */
    public set_dest_loophole(): void;

    /**
     * Set desired smart-cover loophole by id.
     *
     * @param loophole_id - Loophole id.
     */
    public set_dest_loophole(loophole_id: string): void;

    /**
     * Set goodwill toward another object.
     *
     * @param goodwill - Goodwill value.
     * @param object - Target object.
     */
    public set_goodwill(goodwill: i32, object: game_object): void;

    /**
     * Set monster home by patrol path name.
     *
     * @param name - Patrol path name, or `null` to clear home.
     * @param min_radius - Minimum home radius.
     * @param max_radius - Maximum home radius.
     * @param is_aggressive - Whether home is aggressive.
     * @param mid_radius - Middle home radius.
     */
    public set_home(
      name: string | null,
      min_radius: f32,
      max_radius?: f32,
      is_aggressive?: boolean,
      mid_radius?: f32
    ): void;

    /**
     * Set monster home by level vertex id.
     *
     * @param lvid - Level vertex id, or `null` to clear home.
     * @param min_radius - Minimum home radius.
     * @param max_radius - Maximum home radius.
     * @param is_aggressive - Whether home is aggressive.
     * @param mid_radius - Middle home radius.
     */
    public set_home(
      lvid: u32 | null,
      min_radius: f32,
      max_radius?: f32,
      is_aggressive?: boolean,
      mid_radius?: f32
    ): void;

    /**
     * Set level changer invitation hint text.
     *
     * @param hint - Text to show when trying to change level.
     */
    public set_level_changer_invitation(hint: string): void;

    /**
     * Set whether this usable object may be used by non-script logic.
     *
     * @param is_usable - Whether non-script usage is allowed.
     */
    public set_nonscript_usable(is_usable: boolean): void;

    /**
     * Set weapon fire queue size.
     *
     * @param size - Queue size.
     */
    public set_queue_size(size: u32): void;

    /**
     * Set relation to another object.
     *
     * @param relation - Relation id.
     * @param object - Target object.
     */
    public set_relation(relation: number, object: game_object): void;

    /**
     * Make the smart-cover target mode fire without lookout.
     */
    public set_smart_cover_target_fire_no_lookout(): void;

    /**
     * Set active sound mask for this monster.
     *
     * @param mask - Sound mask.
     */
    public set_sound_mask(mask: u32): void;

    /**
     * Set start dialog id for this phrase dialog manager.
     *
     * @param dialog_id - Dialog id.
     */
    public set_start_dialog(dialog_id: string): void;

    /**
     * Set tip text when actor is near and hovering aim over target.
     * As example, `talk`, `loot` and other kind of labels is possible when using this method.
     *
     * @param text - Text to set as tip.
     */
    public set_tip_text(text: string): void;

    /**
     * Restore default usable-object tip text.
     */
    public set_tip_text_default(): void;

    /**
     * Set trader global animation.
     *
     * @param animation - Animation name.
     */
    public set_trader_global_anim(animation: string): void;

    /**
     * Set bloodsucker visibility state as a raw engine value.
     *
     * @param state - Visibility state.
     */
    public set_vis_state(state: f32): void;

    /**
     * @returns Whether stalker sniper fire mode is enabled.
     */
    public sniper_fire_mode(): boolean;

    /**
     * Enable or disable stalker sniper fire mode.
     *
     * @param value - Whether sniper fire mode is enabled.
     */
    public sniper_fire_mode(value: boolean): void;

    /**
     * Start particles attached to a bone.
     *
     * @param name - Particle effect name.
     * @param bone - Bone name.
     */
    public start_particles(name: string, bone: string): void;

    /**
     * Stop the current actor talk dialog.
     */
    public stop_talk(): void;

    /**
     * Switch the opened talk menu to upgrade mode.
     */
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

    /**
     * @returns Target body state requested by the movement manager.
     */
    public target_body_state(): TXR_move;

    /**
     * @returns Target movement type requested by the movement manager.
     */
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

    /**
     * Remove this stalker from its squad combat registry.
     */
    public unregister_in_combat(): void;

    /**
     * Find the farthest accessible level vertex in a direction.
     *
     * @param level_vertex_id - Starting level vertex id.
     * @param direction - Direction to search in.
     * @param max_distance - Maximum search distance.
     * @returns Found level vertex id, or the start vertex if none is valid.
     */
    public vertex_in_direction(level_vertex_id: u32, direction: vector, max_distance: f32): u32;

    /**
     * @returns Whether visual memory is enabled for this monster.
     */
    public vision_enabled(): boolean;

    /**
     * @returns Grenade launcher attachment status for the active weapon.
     */
    public weapon_grenadelauncher_status(): i32;

    /**
     * @returns Whether the active weapon has an attached silencer.
     */
    public weapon_is_silencer(): boolean;

    /**
     * @returns Scope attachment status for the active weapon.
     */
    public weapon_scope_status(): i32;

    /**
     * @returns Inventory weight for this object.
     */
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

    /**
     * @returns Weapon accuracy for this inventory owner.
     */
    public accuracy(): f32;

    /**
     * Reload attach position for this attachable item from a section.
     *
     * @param section - Config section with attach data.
     */
    public attachable_item_load_attach(section: string): void;

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

    /**
     * Force a bloodsucker stand/sleep animation variant.
     *
     * @param index - Animation index.
     */
    public force_stand_sleep_animation(index: u32): void;

    /**
     * @returns Current bloodsucker visibility state.
     */
    public get_visibility_state(): i32;

    /**
     * Check whether a point is in range of a smart-cover loophole.
     *
     * @param cover_id - Smart-cover id.
     * @param loophole_id - Loophole id.
     * @param position - Point to test.
     * @returns Whether the point is in loophole range.
     */
    public in_loophole_range(cover_id: string, loophole_id: string, position: vector): boolean;

    /**
     * Set whether this poltergeist ignores the actor.
     *
     * @param value - Whether actor should be ignored.
     */
    public poltergeist_set_actor_ignore(value: boolean): void;

    /**
     * Clear desired movement position for this stalker.
     */
    public set_desired_position(): void;

    /**
     * Set desired movement position for this stalker.
     *
     * @param position - Desired position.
     */
    public set_desired_position(position: vector): void;

    /**
     * Force or release anti-aim behavior for this base monster.
     *
     * @param value - Whether anti-aim is forced.
     */
    public set_force_anti_aim(value: boolean): void;

    /**
     * Set monster vision range.
     *
     * @param range - New range.
     */
    public set_range(range: f32): void;

    /**
     * Check whether a smart-cover object is suitable for this stalker.
     *
     * @param object - Smart-cover object.
     * @returns Whether the cover is suitable.
     */
    public suitable_smart_cover(object: game_object): boolean;

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

    /**
     * @returns Whether movement is enabled for this inventory owner.
     */
    public movement_enabled(): boolean;

    /**
     * Enable or disable movement for this inventory owner.
     *
     * @param value - Whether movement is enabled.
     */
    public movement_enabled(value: boolean): void;

    /**
     * Set item condition.
     *
     * @param condition - New condition value.
     */
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

    /**
     * @returns Base incoming restriction list.
     */
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

    /**
     * Stop the current external trader sound.
     */
    public external_sound_stop(): void;

    /**
     * Find the best cover from a threat position.
     *
     * @param position - Threat position.
     * @returns Cover point.
     */
    public find_best_cover(position: vector): cover_point;

    /**
     * Get current game graph vertex id.
     *
     * @returns Game vertex id.
     */
    public game_vertex_id(): u32;

    /**
     * @returns This object as a helicopter.
     */
    public get_helicopter(): CHelicopter;

    /**
     * @returns Last known monster sound info.
     */
    public get_sound_info(): SoundInfo;

    /**
     * Get object group id.
     *
     * @returns Group id.
     */
    public group(): i32;

    /**
     * @returns Whether this inventory box is closed.
     */
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

    /**
     * Register this stalker in its squad combat registry.
     */
    public register_in_combat(): void;

    /**
     * Find a safe cover near a position.
     *
     * @param position - Search position.
     * @param radius - Search radius.
     * @param min_distance - Minimum distance from position.
     * @returns Cover point.
     */
    public safe_cover(position: vector, radius: f32, min_distance: f32): cover_point;

    /**
     * Enable or disable script control.
     *
     * @param script_control - Whether script control is enabled.
     * @param script_name - Script control name.
     */
    public script(script_control: boolean, script_name: string): void;

    /**
     * Clear desired movement direction for this stalker.
     */
    public set_desired_direction(): void;

    /**
     * Set desired movement direction for this stalker.
     *
     * @param direction - Desired direction.
     */
    public set_desired_direction(direction: vector): void;

    /**
     * Enable or disable manual bloodsucker invisibility control.
     *
     * @param value - Whether manual invisibility control is enabled.
     */
    public set_manual_invisibility(value: boolean): void;

    /**
     * Set target movement type for this stalker.
     *
     * @param movement_type - Movement type.
     */
    public set_movement_type(movement_type: number /* MonsterSpace::EMovementType */): void;

    /**
     * Move an NPC to a position.
     *
     * @param position - New NPC position.
     */
    public set_npc_position(position: vector): void;

    /**
     * Set sound memory threshold for this monster.
     *
     * @param threshold - Sound threshold.
     */
    public set_sound_threshold(threshold: f32): void;

    /**
     * Set trader head animation.
     *
     * @param animation - Animation name.
     */
    public set_trader_head_anim(animation: string): void;

    /**
     * Set visual name for this object.
     *
     * @param name - Visual name.
     */
    public set_visual_name(name: string): void;

    /**
     * @returns Target mental state requested by the movement manager.
     */
    public target_mental_state(): TXR_animation;

    /**
     * Unregister this door from NPC door management.
     */
    public unregister_door_for_npc(): void;

    /**
     * @returns Ammo count in this ammo box.
     */
    public ammo_get_count(): u16;

    /**
     * Set ammo count for this ammo box.
     *
     * @param count - Ammo count.
     */
    public ammo_set_count(count: u16): void;

    /**
     * @returns Configured ammo box size.
     */
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

    /**
     * Set custom zone restrictor type.
     *
     * @param type - Restrictor type.
     */
    public set_restrictor_type(type: u8): void;

    /**
     * @returns Custom zone restrictor type.
     */
    public get_restrictor_type(): u8;

    /**
     * Set spatial registration type for this object.
     *
     * @param type - Spatial type mask.
     */
    public set_spatial_type(type: u8): void;

    /**
     * Set weapon type id.
     *
     * @param type - Weapon type id.
     */
    public set_weapon_type(type: u8): void;

    /**
     * @returns Current weapon substate.
     */
    public get_weapon_substate(): u8;

    /**
     * Start trade with another object.
     *
     * @param object - Trade partner.
     */
    public start_trade(object: game_object): void;

    /**
     * Start upgrade interaction with another object.
     *
     * @param object - Upgrade partner.
     */
    public start_upgrade(object: game_object): void;

    /**
     * Switch HUD item state.
     *
     * @param state - New HUD item state.
     */
    public switch_state(state: u32): void;

    /**
     * Set enemy target for this phantom.
     *
     * @param object - Enemy object.
     */
    public phantom_set_enemy(object: game_object): void;

    /**
     * Set actor jump speed.
     *
     * @param speed - Jump speed.
     */
    public set_actor_jump_speed(speed: f32): void;

    /**
     * Set actor maximum walk weight.
     *
     * @param weight - Maximum walk weight.
     */
    public set_actor_max_walk_weight(weight: f32): void;

    /**
     * Set actor maximum carry weight.
     *
     * @param weight - Maximum carry weight.
     */
    public set_actor_max_weight(weight: f32): void;

    /**
     * Set actor run speed coefficient.
     *
     * @param coef - Run coefficient.
     */
    public set_actor_run_coef(coef: f32): void;

    /**
     * Set actor backward run speed coefficient.
     *
     * @param coef - Backward run coefficient.
     */
    public set_actor_runback_coef(coef: f32): void;

    /**
     * Set actor sprint speed coefficient.
     *
     * @param coef - Sprint coefficient.
     */
    public set_actor_sprint_koef(coef: f32): void;

    /**
     * Set additional maximum walk weight.
     *
     * @param weight - Additional walk weight.
     */
    public set_additional_max_walk_weight(weight: f32): void;

    /**
     * Set additional maximum carry weight.
     *
     * @param weight - Additional carry weight.
     */
    public set_additional_max_weight(weight: f32): void;

    /**
     * Set active ammo type for this weapon.
     *
     * @param type - Ammo type index.
     */
    public set_ammo_type(type: u8): void;

    /**
     * Set artefact bleeding restore rate.
     *
     * @param rate - Restore rate.
     */
    public set_artefact_bleeding(rate: f32): void;

    /**
     * Set artefact health restore rate.
     *
     * @param rate - Restore rate.
     */
    public set_artefact_health(rate: f32): void;

    /**
     * Set artefact power restore rate.
     *
     * @param rate - Restore rate.
     */
    public set_artefact_power(rate: f32): void;

    /**
     * Set artefact radiation restore rate.
     *
     * @param rate - Restore rate.
     */
    public set_artefact_radiation(rate: f32): void;

    /**
     * Set artefact satiety restore rate.
     *
     * @param rate - Restore rate.
     */
    public set_artefact_satiety(rate: f32): void;

    /**
     * Set bone visibility on this object visual.
     *
     * @param name - Bone name.
     * @param visible - Whether the bone is visible.
     * @param recursive - Whether child bones are affected.
     */
    public set_bone_visible(name: string, visible: boolean, recursive: boolean): void;

    /**
     * Set character icon texture id.
     *
     * @param icon - Icon id.
     */
    public set_character_icon(icon: string): void;

    /**
     * Directly set entity health instead of applying a health property delta.
     *
     * @remarks
     * This binding exists because the normal health property setter routes through conditions().ChangeHealth.
     */
    public set_health_ex(value: f32): void;

    /**
     * Set main weapon type id.
     *
     * @param type - Main weapon type id.
     */
    public set_main_weapon_type(type: u32): void;

    /**
     * @returns Actor jump speed.
     */
    public get_actor_jump_speed(): f32;

    /**
     * @returns Actor maximum walk weight.
     */
    public get_actor_max_walk_weight(): f32;

    /**
     * @returns Actor maximum carry weight.
     */
    public get_actor_max_weight(): f32;

    /**
     * @returns Actor run speed coefficient.
     */
    public get_actor_run_coef(): f32;

    /**
     * @returns Actor backward run speed coefficient.
     */
    public get_actor_runback_coef(): f32;

    /**
     * @returns Actor sprint speed coefficient.
     */
    public get_actor_sprint_koef(): f32;

    /**
     * @returns Additional maximum walk weight.
     */
    public get_additional_max_walk_weight(): f32;

    /**
     * @returns Additional maximum carry weight.
     */
    public get_additional_max_weight(): f32;

    /**
     * @returns Current anomaly power.
     */
    public get_anomaly_power(): f32;

    /**
     * @returns Artefact bleeding restore rate.
     */
    public get_artefact_bleeding(): f32;

    /**
     * @returns Artefact health restore rate.
     */
    public get_artefact_health(): f32;

    /**
     * @returns Artefact power restore rate.
     */
    public get_artefact_power(): f32;

    /**
     * @returns Artefact radiation restore rate.
     */
    public get_artefact_radiation(): f32;

    /**
     * @returns Artefact satiety restore rate.
     */
    public get_artefact_satiety(): f32;

    /**
     * @returns Object luminocity.
     */
    public get_luminocity(): f32;

    /**
     * @returns Hemispheric luminocity for this object.
     */
    public get_luminocity_hemi(): f32;

    /**
     * @returns Total inventory weight for this inventory owner.
     */
    public get_total_weight(): f32;

    /**
     * @returns Vehicle currently attached to the actor, or `null`.
     */
    public get_attached_vehicle(): game_object | null;

    /**
     * @returns Number of items on the belt.
     */
    public belt_count(): u32;

    /**
     * @returns Main weapon type id.
     */
    public get_main_weapon_type(): u32;

    /**
     * @returns Spatial registration type mask.
     */
    public get_spatial_type(): u32;

    /**
     * @returns Current HUD item state.
     */
    public get_state(): u32;

    /**
     * @returns Weapon type id.
     */
    public get_weapon_type(): u32;

    /**
     * Play a HUD animation if it exists.
     *
     * @param motion - HUD motion name.
     * @param mix_in - Whether to blend with the current animation.
     * @param state - State to use for playback.
     * @returns Playback motion id, or `0` when no matching motion exists.
     */
    public play_hud_motion(motion: string, mix_in: boolean, state: u32): u32;

    /**
     * Attach actor to a vehicle or holder.
     *
     * @param vehicle - Vehicle object.
     * @param force - Whether attach should be forced.
     */
    public attach_vehicle(vehicle: game_object, force: boolean): void;

    /**
     * Clear queued game news for this inventory owner.
     */
    public clear_game_news(): void;

    /**
     * Detach actor from the current vehicle or holder.
     *
     * @param force - Whether detach should be forced.
     */
    public detach_vehicle(force: boolean): void;

    /**
     * Move object to a position immediately.
     *
     * @param position - Target position.
     * @param update_ai_location - Whether AI location should be updated.
     */
    public force_set_position(position: vector, update_ai_location: boolean): void;

    /**
     * Get inventory ammo count for a weapon ammo type.
     *
     * @param type - Ammo type index.
     * @returns Matching ammo count.
     */
    public get_ammo_count_for_type(type: u8): i32;

    /**
     * @returns Whether this weapon is in grenade launcher fire mode.
     */
    public weapon_in_grenade_mode(): boolean;

    /**
     * @returns Whether this object is an alive entity.
     */
    public is_entity_alive(): boolean;

    /**
     * @returns Whether this object is an inventory item.
     */
    public is_inventory_item(): boolean;

    /**
     * @returns Whether this object is an inventory owner.
     */
    public is_inventory_owner(): boolean;

    /**
     * @returns Whether this object is the actor.
     */
    public is_actor(): boolean;

    /**
     * @returns Whether this object is a custom monster.
     */
    public is_custom_monster(): boolean;

    /**
     * @returns Whether this object is a weapon.
     */
    public is_weapon(): boolean;

    /**
     * @returns Whether this object is an outfit.
     */
    public is_outfit(): boolean;

    /**
     * @returns Whether this object is a scope addon.
     */
    public is_scope(): boolean;

    /**
     * @returns Whether this object is a silencer addon.
     */
    public is_silencer(): boolean;

    /**
     * @returns Whether this object is a grenade launcher addon.
     */
    public is_grenade_launcher(): boolean;

    /**
     * @returns Whether this object is a magazined weapon.
     */
    public is_weapon_magazined(): boolean;

    /**
     * @returns Whether this object is a space restrictor.
     */
    public is_space_restrictor(): boolean;

    /**
     * @returns Whether this object is a stalker.
     */
    public is_stalker(): boolean;

    /**
     * @returns Whether this object is an anomaly zone.
     */
    public is_anomaly(): boolean;

    /**
     * @returns Whether this object is a monster.
     */
    public is_monster(): boolean;

    /**
     * @returns Whether this object is an artefact.
     */
    public is_artefact(): boolean;

    /**
     * @returns Whether this object is ammo.
     */
    public is_ammo(): boolean;

    /**
     * @returns Whether this object is a trader.
     */
    public is_trader(): boolean;

    /**
     * @returns Whether this object is a HUD item.
     */
    public is_hud_item(): boolean;

    /**
     * @returns Whether this object is a weapon with grenade launcher support.
     */
    public is_weapon_gl(): boolean;

    /**
     * @returns Whether this object is an inventory box.
     */
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

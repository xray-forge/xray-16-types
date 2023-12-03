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

    public satiety: f32;
    /**
     * Intensity of actor bleeding.
     * 0 - no bleeding.
     */
    public bleeding: f32;
    /**
     * Object health value
     * From 0 to 1.
     */
    public health: f32;
    public morale: f32;
    public power: f32;
    public psy_health: f32;
    public radiation: f32;

    protected constructor();

    /**
     * Get engine client object ID.
     */
    public id(): u16;

    public story_id(): u32;

    public object(value: i32 | string): game_object | null;

    public clsid(): TXR_class_id;

    public add_animation(animation: string, hand_usage: boolean, use_movement_controller: boolean): void;

    public add_animation(
      animation: string,
      hand_usage: boolean,
      position: vector,
      rotation: vector,
      local_animation: boolean
    ): void;

    public action(): entity_action | null;

    public action_count(): u32;

    public active_detector(): game_object | null;

    public active_item(): game_object | null;

    /**
     * @returns active item slot of game object
     */
    public active_slot<T extends u32>(): T;

    public active_zone_contact(value: u16): boolean;

    public add_restrictions(out_restriction: string, in_restriction: string): void;

    public animation_slot(): i32;

    public base_out_restrictions(): string;

    public best_item(): game_object | null;

    public best_weapon(): game_object | null;

    public bind_object(binder: object_binder): void;

    public binded_object(): object_binder;

    public burer_set_force_gravi_attack(value: boolean): void;

    public buy_supplies(value1: ini_file, value2: string): void;

    public can_select_weapon(): boolean;

    public can_select_weapon(value: boolean): void;

    public can_throw_grenades(): boolean;

    public can_throw_grenades(value: boolean): void;

    public clear_animations(): void;

    public clear_override_animation(): void;

    /**
     * Sets provided planner as `debugged` for stalker object.
     * As result, when console command `ai_dbg_stalker on` is toggled, GOAP state of planner is displayed.
     * Requires `mixed` build engine.
     *
     * @param planner - action planner to show in stalker stats when debugging is enabled
     */
    public debug_planner(planner: action_planner): void;

    public disable_info_portion(value: string): boolean;

    public disable_talk(): void;

    public disable_trade(): void;

    public dont_has_info(value: string): boolean;

    /**
     * Drop item from inventory.
     *
     * @param item - game object to drop
     */
    public drop_item(item: game_object): void;

    public enable_night_vision(value: boolean): void;

    public external_sound_start(value: string): void;

    public get_bone_id(value: string): u16;

    public get_current_direction(): vector;

    public get_current_outfit_protection(value: i32): f32;

    public get_dest_smart_cover(): cover_point;

    public get_dest_smart_cover_name(): string | null;

    public get_monster_hit_info(): MonsterHitInfo;

    public get_physics_object(): CPhysicObject;

    /**
     * @returns whether object is controlled by lua script
     */
    public get_script(): boolean;

    public get_smart_cover_description(): string;

    public give_talk_message(value1: string, value2: string, value3: string): void;

    public idle_max_time(): f32;

    public idle_max_time(time: f32): void;

    public in_current_loophole_fov(vector: vector): boolean;

    public inventory_for_each(cb: (this: void) => void): void;

    public is_door_blocked_by_npc(): boolean;

    public is_talk_enabled(): boolean;

    public is_weapon_going_to_be_strapped(weapon: game_object | null): boolean;

    public iterate_inventory_box(
      cb: (this: void, box: game_object, item: game_object) => void,
      object: game_object
    ): void;

    public lookout_max_time(): f32;

    public lookout_max_time(value: f32): void;

    public max_ignore_monster_distance(): f32;

    public max_ignore_monster_distance(value: f32): void;

    public memory_hit_objects(): unknown; // :vector<MemorySpace::CHitObject, xalloc<struct MemorySpace::CHitObject>

    public memory_time(another: game_object): u32;

    public memory_visible_objects(): LuaIterable<visible_memory_object>;

    public mental_state<T extends number>(): T; // todo: unknown enum

    public not_yet_visible_objects(): unknown;

    public object_count(): u32;

    public path_completed(): boolean;

    public relation(game_object: game_object): TXR_relation;

    public release_stand_sleep_animation(): void;

    public reset_action_queue(): void;

    public restore_sound_threshold(): void;

    public set_weight(weight: f32): void;

    public set_actor_direction(value: f32): void;

    public set_ammo_elapsed(value: i32): void;

    public set_community_goodwill(first: string, second: i32): void;

    public set_const_force(vector: vector, value: f32, time_interval: u32): void;

    public set_dest_smart_cover(): void;

    public set_dest_smart_cover(value: string): void;

    public set_enemy(object: game_object): void;

    public set_fov(fov: f32): void;

    public set_item(action_id: number, game_object: game_object | null, value1?: u32, value2?: u32): void;

    public set_mental_state(state: TXR_animation): void;

    public set_override_animation(animation: string): void;

    public set_path_type(type: TXR_game_object_path): void;

    public set_previous_point(point: i32): void;

    public set_smart_cover_target(): void;

    public set_smart_cover_target(game_object: game_object): void;

    public set_smart_cover_target(vector: vector): void;

    public set_smart_cover_target_default(value: boolean): void;

    public set_smart_cover_target_fire(): void;

    public set_smart_cover_target_lookout(): void;

    public set_start_point(point: i32): void;

    public sound_voice_prefix(): string;

    /**
     * @returns game object squad id
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

    public activate_slot(index: u32): void;

    public actor_look_at_point(vector: vector): void;

    public aim_bone_id(): string;

    public aim_bone_id(value: string): void;

    public aim_time(game_object: game_object): u32;

    public aim_time(game_object: game_object, value: u32): void;

    public allow_sprint(value: boolean): void;

    public animation_count(): i32;

    public best_danger(): danger_object | null;

    public body_state(): void;

    public bone_position(value: string): vector;

    public buy_item_condition_factor(value: f32): void;

    public change_team(team_id: u8, squad_id: u8, group_id: u8): void;

    public character_icon<T extends string = string>(): T;

    public character_name<T extends string = string>(): T;

    public character_rank(): i32;

    public condition(): f32;

    public cost(): u32;

    public critically_wounded(): boolean;

    public deadbody_closed(value: boolean): void;

    public death_sound_enabled(): boolean;

    public death_sound_enabled(value: boolean): void;

    public direction(): vector;

    public disable_anomaly(): void;

    public disable_hit_marks(): boolean;

    public disable_hit_marks(value: boolean): void;

    public disable_inv_upgrade(): void;

    public drop_item_and_teleport(game_object: game_object, vector: vector): void;

    public eat(game_object: game_object): void;

    public enable_inv_upgrade(): void;

    /**
     * Switch client level changed enabled state.
     *
     * @param is_enabled - whether level changer should be enabled
     */
    public enable_level_changer(is_enabled: boolean): void;

    public enable_memory_object(game_object: game_object, value: boolean): void;

    public explode(value: u32): void;

    public extrapolate_length(): f32;

    public extrapolate_length(value: f32): void;

    public fake_death_stand_up(): void;

    public fov(): f32;

    public get_ammo_total(): u32;

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
     * @returns name of lua script controlling monster object
     */
    public get_script_name(): string;

    public get_visual_name<T extends string = string>(): T;

    public has_info(value: string): boolean;

    public hide_weapon(): void;

    public idle_min_time(): f32;

    public idle_min_time(value: f32): void;

    public in_loophole_fov(value1: string, valu2: string, value3: vector): boolean;

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

    public kill(game_object: game_object): void;

    public location_on_path(value: f32, vector: vector): u32;

    public lock_door_for_npc(): void;

    public lookout_min_time(): f32;

    public lookout_min_time(time: f32): void;

    public make_item_active(game_object: game_object): void;

    public marked_dropped(game_object: game_object): boolean;

    public memory_sound_objects(): unknown;

    public money(): u32;

    public motivation_action_manager(): action_planner;

    public movement_type(): number; // todo: unknown enum

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

    public set_character_community(value1: string, value2: u32, value3: i32): void;

    public set_character_rank(value: i32): void;

    public set_collision_off(value: boolean): void;

    public set_default_panic_threshold(): void;

    public set_dest_game_vertex_id(value: u16): void;

    public set_dest_level_vertex_id(vertex_id: u32): void;

    public set_detail_path_type(EDetailPathType: unknown /** enum DetailPathManager::EDetailPathType */): void;

    public set_invisible(is_invisible: boolean): void;

    public set_movement_selection_type(type: unknown /** enum ESelectionType */): void;

    public set_patrol_path(value1: string, EPatrolStartType: number, EPatrolRouteType: number, value2: boolean): void;

    public set_smart_cover_target_idle(): void;

    public set_sympathy(value: f32): void;

    public set_trader_sound(value1: string, value2: string): void;

    public sight_params(): CSightParams;

    public skip_transfer_enemy(value: boolean): void;

    public sniper_update_rate(): boolean;

    public sniper_update_rate(value: boolean): void;

    public spawn_ini(): ini_file;

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

    public show_condition(ini_file: unknown, value: string): void;

    public sound_prefix(): string;

    public sound_prefix(value: string): void;

    public wounded(): boolean;

    public wounded(wounded: boolean): void;

    public add_sound(value1: string, value2: u32, type: unknown, value3: u32, value4: u32, value5: u32): u32;

    public add_sound(
      value1: string,
      value2: u32,
      type: unknown,
      value3: u32,
      value4: u32,
      value5: u32,
      value6: string
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

    public change_character_reputation(value: i32): void;

    public change_goodwill(delta_goodwill: i32, to_object: game_object): void;

    public character_reputation(): i32;

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
     * @param is_enabled - whether item should be enabled for usage by owning object
     */
    public enable_attachable_item(is_enabled: boolean): void;

    public enable_talk(): void;

    public enable_trade(): void;

    public enable_vision(value: boolean): void;

    public fake_death_fall_down(): boolean;

    public force_set_goodwill(goodwill: i32, to_object: game_object): void;

    /**
     * For bloodsuckers specifically set current visibility state.
     */
    public force_visibility_state(state: TXR_bloodsucker_visibility_state): void;

    /**
     * Return formula: `personal_goodwill + reputation_goodwill + rank_goodwill +
     *  community_goodwill + community_to_community`
     *
     * @param target - target client object
     * @returns goodwill level from object to target
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

    public get_task(task_id: string, only_in_process: boolean): CGameTask | null;

    public get_task_state(value: string): unknown;

    public give_info_portion(value: string): boolean;

    public give_money(value: i32): void;

    /**
     * Show talk dialog message with icon.
     *
     * @param title - title of the message
     * @param text - text of the message
     * @param icon_texture_name - icon to display in message image
     * @param selector - path in form XML to message template
     */
    public give_talk_message2(title: string, text: string, icon_texture_name: string, selector: string): void;

    /**
     * Give game task for an object, usually it is actor object.
     *
     * @param task
     * @param time_to_complete
     * @param check_existing
     * @param timer_ttl
     */
    public give_task(task: CGameTask, time_to_complete: u32, check_existing: boolean, timer_ttl: u32): void;

    /**
     * Returns level of goodwill stored for an object.
     * No strict formulas, just get actual value.
     *
     * @param target - target client object
     * @returns goodwill level to target object
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
     * @returns whether object is currently talking with actor and talk dialog is active
     */
    public is_talking(): boolean;

    public is_trade_enabled(): boolean;

    public item_in_slot(slot: u32): game_object | null;

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

    public set_goodwill(value: i32, game_object: game_object): void;

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
     * @param hint - text to show when trying to change level
     */
    public set_level_changer_invitation(hint: string): void;

    public set_nonscript_usable(is_usable: boolean): void;

    public set_queue_size(value: u32): void;

    public set_relation(ERelationType: number, game_object: game_object): void;

    public set_smart_cover_target_fire_no_lookout(): unknown;

    public set_sound_mask(value: u32): void;

    public set_start_dialog(value: string): void;

    /**
     * Set tip text when actor is near and hovering aim over target.
     * As example, `talk`, `loot` and other kind of labels is possible when using this method.
     *
     * @param text - text to set as tip
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
     * @param upgrade_section - section of upgrade to check
     * @returns whether upgrade can be added
     */
    public can_add_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - section of upgrade to check
     * @returns whether upgrade can be installed
     */
    public can_install_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - section of upgrade to check
     * @returns whether upgrade is installed
     */
    public has_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_group_section - section of upgrade group to check
     * @returns whether upgrade group is installed
     */
    public has_upgrade_group(upgrade_group_section: string): boolean;

    /**
     * @param upgrade_section - section of upgrade to check parent group
     * @returns whether upgrade parent group is installed
     */
    public has_upgrade_group_by_upgrade_id(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - section of upgrade to add
     * @returns whether upgrade is installed successfully or not
     */
    public add_upgrade(upgrade_section: string): boolean;

    /**
     * @param upgrade_section - section of upgrade to install
     * @returns whether upgrade is installed successfully or not
     */
    public install_upgrade(upgrade_section: string): boolean;

    /**
     * Iterate over all item upgrades.
     *
     * @param callback - callback to call on each iteration to check installed upgrades
     */
    public iterate_installed_upgrades(callback: (upgrade_section: string, object: game_object) => void): void;

    public target_body_state(): TXR_move;

    public target_movement_type(): number; /* EMovementType */

    public transfer_item(item: game_object, to: game_object): void;

    public transfer_money(value: i32, from: game_object): void;

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
     * @param title - notification title
     * @param text - notification text
     * @param icon_texture - notification icon texture
     * @param delay - delay before show notification
     * @param show_time - time to show notification before hiding it
     * @param type - type of the notification (eNews = 0, eTalk = 1)
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
     * @param position - target position to check
     * @returns if target position is accessible by the object
     */
    public accessible(position: vector): boolean;

    /**
     * @param vertexId - target vertex ID to check
     * @returns if target vertex is accessible by the object
     */
    public accessible(vertexId: u32): boolean;

    public accuracy(): f32;

    public attachable_item_load_attach(value: string): void;

    public best_cover(vector1: vector, vector2: vector, value3: f32, value4: f32, value5: f32): cover_point;

    public best_enemy(): game_object | null;

    public center(): vector;

    public deadbody_closed_status(): boolean;

    public death_time(): u32;

    public enable_torch(value: boolean): void;

    public force_stand_sleep_animation(value: u32): void;

    public get_visibility_state(): i32;

    public in_loophole_range(value1: string, value2: string, vector: vector): boolean;

    public poltergeist_set_actor_ignore(value: boolean): void;

    public set_desired_position(): void;

    public set_desired_position(vector: vector): void;

    public set_force_anti_aim(value: boolean): void;

    public set_range(value: f32): void;

    public suitable_smart_cover(game_object: game_object): boolean;

    public add_combat_sound(
      value1: string,
      value2: number,
      type: i32 /** enum ESoundTypes */,
      value3: u32,
      value4: u32,
      value5: u32,
      value6: string
    ): u32;

    public berserk(): void;
    /**
     * Add action for game object entity.
     * Depending on priority pushes it to back or front of actions list.
     *
     * @param entity_action - action to perform
     * @param is_high_priority - whether it is high priority action
     */

    public command(entity_action: entity_action, is_high_priority: boolean): void;

    public hit(hit: hit): void;

    public inactualize_patrol_path(): void;

    public inactualize_level_path(): void;

    public inactualize_game_path(): void;

    /**
     * Iterate over game object inventory.
     * Runs supplied callback for each item in inventory of the object.
     * If callback returns `true`, the cycle breaks.
     *
     * @param cb - callback to run for each item
     * @param object - target object to run callback for (actually unused by the engine)
     */
    public iterate_inventory(
      cb: (this: void, owner: game_object, item: game_object) => void | boolean,
      object: game_object
    ): void;

    public movement_enabled(): boolean;

    public movement_enabled(value: boolean): void;

    public set_condition(condition: f32): void;

    /**
     * @returns [vertex_id, vector] tuple of accessible position id and vector
     */
    public accessible_nearest(vertex_position: vector, vector2: vector): LuaMultiReturn<[u32, vector]>;

    public action_by_index(value: u32): entity_action | null;

    /**
     * @returns whether game object is alive
     */
    public alive(): boolean;

    public base_in_restrictions(): string;

    public can_script_capture(): boolean;

    /**
     * @returns object community like `monolith`, `stalker` or `zombied`
     */
    public character_community<T extends string = string>(): T;

    public external_sound_stop(): void;

    public find_best_cover(vector: vector): cover_point;

    public game_vertex_id(): u32;

    public get_helicopter(): CHelicopter;

    public get_sound_info(): SoundInfo;

    public group(): i32;

    public inv_box_closed_status(): boolean;

    public level_vertex_id(): u32;

    public memory_position(game_object: game_object): vector;

    public movement_target_reached(): boolean;

    public name(): string;

    public parent(): game_object;

    public position(): vector;

    public register_in_combat(): void;

    public safe_cover(vector: vector, value1: f32, value2: f32): cover_point;

    public script(script_control: boolean, script_name: string): void;

    public set_desired_direction(): void;

    public set_desired_direction(vector: vector): void;

    public set_manual_invisibility(value: boolean): void;

    public set_movement_type(EMovementType: number /** MonsterSpace::EMovementType */): void;

    public set_npc_position(vector: vector): void;

    public set_sound_threshold(value: f32): void;

    public set_trader_head_anim(value: string): void;

    public set_visual_name(name: string): void;

    public target_mental_state(): TXR_animation;

    public unregister_door_for_npc(): void;

    public ammo_get_count(): u16;

    public ammo_set_count(count: u16): void;

    public ammo_box_size(): u16;

    public cast_Stalker(): CAI_Stalker;

    public cast_Artefact(): CArtefact;

    public cast_Car(): CCar;

    public cast_GameObject(): CGameObject;

    public cast_Heli(): CHelicopter;

    public cast_SpaceRestrictor(): CSpaceRestrictor;

    public cast_HolderCustom(): holder;

    public cast_Weapon(): CWeapon;

    public cast_Ammo(): CWeaponAmmo;

    public cast_WeaponMagazined(): CWeaponMagazined;

    public cast_ScriptZone(): ce_script_zone;

    public cast_CustomZone(): CCustomZone;

    public cast_EntityAlive(): CEntityAlive;

    public cast_Explosive(): explosive;

    public cast_PhysicsShellHolder(): CPhysicsShellHolder;

    public get_info_time(info: string): CTime;

    public bone_visible(bone: string): boolean;

    public has_ammo_type(type: string): boolean;

    public is_on_belt(object: game_object): boolean;

    public use(object: game_object): void;

    /**
     * Set remaining item uses count.
     *
     * @param remaining - count of remaining uses for item before destroy
     */
    public set_remaining_uses(remaining: u8): void;

    public get_max_uses(): u8;

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

    public force_set_position(position: vector, bool: boolean): void;

    public get_ammo_count_for_type(type: u8): i32;
  }

  /*
  * vector<MemorySpace::CNotYetVisibleObject,xalloc<MemorySpace::CNotYetVisibleObject> > not_yet_visible_objects();
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
  */
}

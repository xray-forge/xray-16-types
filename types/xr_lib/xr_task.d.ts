declare module "xray16" {
  /**
   * Task state and task type constants.
   *
   * @source C++ class task
   * @customConstructor task
   * @group xr_task
   *
   * @remarks
   * State and type constants share one native export. Use the matching subset for each API.
   */
  export class task {
    /**
     * Engine enum value for `task.additional`.
     */
    public static readonly additional: 1;
    /**
     * Engine enum value for `task.completed`.
     */
    public static readonly completed: 2;
    /**
     * Engine enum value for `task.fail`.
     */
    public static readonly fail: 0;
    /**
     * Engine enum value for `task.in_progress`.
     */
    public static readonly in_progress: 1;
    /**
     * Engine enum value for `task.insignificant`.
     */
    public static readonly insignificant: 2;
    /**
     * Engine enum value for `task.storyline`.
     */
    public static readonly storyline: 0;
    /**
     * Engine enum value for `task.task_dummy`.
     */
    public static readonly task_dummy: 65535;

    /**
     * Engine-owned task constants.
     */
    private constructor();
  }

  /**
   * @group xr_task
   */
  export type TXR_TaskStateName = EnumeratedStaticsKeys<typeof task>;

  /**
   * ETaskState.
   *
   * @group xr_task
   */
  export type TXR_TaskState = EnumeratedStaticsValues<typeof task>;

  /**
   * One objective inside a game task.
   *
   * @source C++ class SGameTaskObjective
   * @customConstructor SGameTaskObjective
   * @group xr_task
   *
   * @remarks
   * Objective `0` is the task root objective. Additional objectives start at `1`.
   */
  export class SGameTaskObjective {
    /**
     * Whether the default map location should be visible for this objective.
     *
     * @remarks
     * This mirrors the native `def_ml_enabled` field used by loaded task objectives.
     */
    public def_ml_enabled: boolean;

    /**
     * @remarks
     * The objective stores a pointer to `task`; keep the parent task alive while using this objective.
     *
     * @param task - Parent task.
     * @param id - Objective index.
     */
    public constructor(task: CGameTask, id: i32);

    /**
     * Get objective index inside the parent task.
     *
     * @returns Objective index.
     */
    public get_idx(): u16;

    /**
     * Set objective icon texture.
     *
     * @param icon_name - Icon texture or string table id.
     */
    public set_icon_name(icon_name: string): void;

    /**
     * @returns Objective icon name, or null when none is set.
     */
    public get_icon_name<T extends string = string>(): T | null;

    /**
     * Set objective description text.
     *
     * @param description - Description text or string table id.
     */
    public set_description(description: string): void;

    /**
     * @returns Objective description text or string table id.
     */
    public get_description(): string;

    /**
     * Set objective title.
     *
     * @param title - Title text or string table id.
     */
    public set_title(title: string): void;

    /**
     * @returns Objective title.
     */
    public get_title(): string;

    /**
     * Set encyclopedia article id unlocked with this objective.
     *
     * @param id - Encyclopedia article id.
     */
    public set_article_id(id: string): void;

    /**
     * Set encyclopedia article key for this objective.
     *
     * @param key - Article key.
     */
    public set_article_key(key: string): void;

    /**
     * Set map spot type used by this objective.
     *
     * @param location - Map location type.
     */
    public set_map_location(location: string): void;

    /**
     * Add a script function called after objective completion.
     *
     * @remarks
     * Function names are resolved when a script-created objective is added to a task. Missing functions are logged and
     * then skipped by the engine.
     *
     * @param function_name - Script function name.
     */
    public add_on_complete_func(function_name: string): void;

    /**
     * Require an info portion for objective completion.
     *
     * @param value - Info portion id.
     */
    public add_complete_info(value: string): void;

    /**
     * Give an info portion when objective fails.
     *
     * @param value - Info portion id.
     */
    public add_on_fail_info(value: string): void;

    /**
     * Add a script function called after objective failure.
     *
     * @remarks
     * Function names are resolved when a script-created objective is added to a task. Missing functions are logged and
     * then skipped by the engine.
     *
     * @param function_name - Script function name.
     */
    public add_on_fail_func(function_name: string): void;

    /**
     * Give an info portion when objective completes.
     *
     * @param value - Info portion id.
     */
    public add_on_complete_info(value: string): void;

    /**
     * Add a script predicate used to decide objective completion.
     *
     * @remarks
     * Function names are resolved when a script-created objective is added to a task. Missing functions are logged and
     * then skipped by the engine.
     *
     * @param function_name - Script function name.
     */
    public add_complete_func(function_name: string): void;

    /**
     * Add a script predicate used to decide objective failure.
     *
     * @remarks
     * Function names are resolved when a script-created objective is added to a task. Missing functions are logged and
     * then skipped by the engine.
     *
     * @param function_name - Script function name.
     */
    public add_fail_func(function_name: string): void;

    /**
     * Require an info portion for objective failure.
     *
     * @param value - Info portion id.
     */
    public add_fail_info(value: string): void;

    /**
     * @returns Current objective state.
     */
    public get_state(): TXR_TaskState;

    /**
     * @returns Task type, such as `task.storyline` or `task.additional`.
     */
    public get_type(): number; /* ETaskType */

    /**
     * Set task type.
     *
     * @param type - Task type, such as `task.storyline` or `task.additional`.
     */
    public set_type(type: i32 /* ETaskType */): void;

    /**
     * Set hint text for the linked map location.
     *
     * @param hint - Hint text or string table id.
     */
    public set_map_hint(hint: string): void;

    /**
     * @returns Target map location of task object.
     */
    public get_map_location(): string;

    /**
     * @returns Target map object ID of task object.
     */
    public get_map_object_id(): u16;

    /**
     * Replace linked map location data and recreate the spot.
     *
     * @remarks
     * Removes the current linked spot, sets the objective back to `task.in_progress`, then creates a new map spot.
     *
     * @param new_map_location - New map location type.
     * @param new_map_object_id - New target object id.
     */
    public change_map_location(new_map_location: string, new_map_object_id: u16): void;

    /**
     * Remove linked map locations.
     *
     * @remarks
     * When `notify` is `false`, the linked map location is removed from the level map manager. The objective then clears
     * its stored location type and object id.
     *
     * @param notify - Whether to notify task manager that the location was released.
     */
    public remove_map_locations(notify: boolean): void;

    /**
     * Create the linked map location if the objective has a spot type and object id.
     *
     * @remarks
     * During load, the objective tries to reattach to an existing serializable spot owned by the task. During normal
     * creation, it creates a new serializable spot and disables its pointer. The objective must already have a map
     * location type and a valid game object id.
     *
     * @param on_load - Whether creation happens during save loading.
     */
    public create_map_location(on_load: boolean): void;

    /**
     * Set object id tracked by the objective map spot.
     *
     * @param id - Game object id.
     */
    public set_map_object_id(id: i32): void;

    /**
     * Shadow of Chernobyl alias for `set_map_object_id`.
     *
     * @param id - Game object id.
     */
    public set_object_id(id: i32): void;
  }

  /**
   * Game task with one or more objectives.
   *
   * @source C++ class CGameTask : SGameTaskObjective
   * @customConstructor CGameTask
   * @group xr_task
   *
   * @remarks
   * A task is also its root objective. Methods inherited from `SGameTaskObjective` operate on that root objective.
   */
  export class CGameTask extends SGameTaskObjective {
    /**
     * Create an empty game task.
     */
    public constructor();

    /**
     * Load task data from configs.
     *
     * @remarks
     * Reads from `gameplay/game_tasks.xml`. Task XML function names are resolved immediately.
     *
     * @throws If the task id is missing from `game_tasks.xml` or a referenced task function cannot be resolved.
     *
     * @param id - Task id.
     */
    public load(id: string): void;

    /**
     * @returns Task id.
     */
    public get_id(): string;

    /**
     * Set task priority used by task UI ordering.
     *
     * @param priority - New priority.
     */
    public set_priority(priority: i32): void;

    /**
     * Set task id.
     *
     * @param id - Task id.
     */
    public set_id(id: string): void;

    /**
     * @returns Task priority.
     */
    public get_priority(): u32;

    /**
     * Add an objective to this task.
     *
     * @remarks
     * The native binding adopts the objective and copies its current data into the task objective list. Mutating the
     * original objective after this call does not update the stored copy.
     *
     * @param objective - Objective to adopt into the task.
     */
    public add_objective(objective: SGameTaskObjective): void;

    /**
     * Get objective by index.
     *
     * @remarks
     * Index `0` returns the root objective. Other indices access native storage without a bounds check.
     *
     * @param objective_id - Objective index.
     * @returns Objective instance.
     */
    public get_objective(objective_id: i32): SGameTaskObjective;

    /**
     * Count task objectives including the root objective.
     *
     * @returns Objective count.
     */
    public get_objectives_cnt(): u32;
  }
}

declare module "xray16" {
  /**
   * @source C++ class task
   * @customConstructor task
   * @group xr_task
   */
  export class task {
    public static readonly additional: 1;
    public static readonly completed: 2;
    public static readonly fail: 0;
    public static readonly in_progress: 1;
    public static readonly storyline: 0;
    public static readonly task_dummy: 65535;

    private constructor();
  }

  /**
   * @group xr_task
   */
  export type TXR_TaskStateName = EnumeratedStaticsKeys<typeof task>;

  /**
   * ETaskState
   *
   * @group xr_task
   */
  export type TXR_TaskState = EnumeratedStaticsValues<typeof task>;

  /**
   * @source C++ class SGameTaskObjective
   * @customConstructor SGameTaskObjective
   * @group xr_task
   */
  export class SGameTaskObjective {
    public constructor(task: CGameTask, id: i32);

    public set_icon_name(icon_name: string): void;

    public get_icon_name<T extends string = string>(): T | null;

    public set_description(description: string): void;

    public get_description(): string;

    public set_title(title: string): void;

    public get_title(): string;

    public set_map_location(location: string): void;

    public add_on_complete_func(function_name: string): void;

    public add_complete_info(value: string): void;

    public add_on_fail_info(value: string): void;

    public add_on_fail_func(function_name: string): void;

    public add_on_complete_info(value: string): void;

    public add_complete_func(function_name: string): void;

    public add_fail_func(function_name: string): void;

    public add_fail_info(value: string): void;

    public get_state(): TXR_TaskState;

    public get_type(): number; /* ETaskType */

    public set_type(type: i32 /* ETaskType */): void;

    public set_map_hint(hint: string): void;

    /**
     * @returns target map location of task object
     */
    public get_map_location(): string;

    /**
     * @returns target map object ID of task object
     */
    public get_map_object_id(): u16;

    public change_map_location(new_map_location: string, new_map_object_id: u16): void;

    public remove_map_locations(notify: boolean): void;

    public create_map_location(on_load: boolean): void;

    public set_map_object_id(id: i32): void;
  }

  /**
   * @source C++ class CGameTask : SGameTaskObjective
   * @customConstructor CGameTask
   * @group xr_task
   */
  export class CGameTask extends SGameTaskObjective {
    public constructor();

    public get_id(): string;

    public set_priority(priority: i32): void;

    public set_id(id: string): void;

    public get_priority(): u32;
  }
}

declare module "xray16" {
  /**
   * @source C++ class SGameTaskObjective
   * @customConstructor SGameTaskObjective
   * @group xr_quest
   */
  export class XR_SGameTaskObjective {
    public constructor(task: XR_CGameTask, id: i32);

    public remove_map_locations(flag: boolean): void;
    public set_icon_name(icon_name: string): void;
    public get_icon_name(): string;
    public set_description(title: string): void;
    public get_description(): string;
    public set_title(title: string): void;
    public get_title(): string;
    public set_map_location(location: string): void;
    public add_on_complete_func(value: string): void;
    public add_complete_info(value: string): void;
    public add_on_fail_info(value: string): void;
    public add_on_fail_func(value: string): void;
    public add_on_complete_info(value: string): void;
    public add_complete_func(value: string): void;
    public add_fail_func(value: string): void;
    public add_fail_info(value: string): void;
    public get_state(): TXR_TaskState;
    public get_type(): number; /* ETaskType */
    public set_type(type: i32 /* ETaskType */): void;
    public set_map_hint(hint: string): void;
    public change_map_location(value: string, value2: u16): void;
    public set_map_object_id(id: i32): void;
  }

  /**
   * @source C++ class CGameTask : SGameTaskObjective
   * @customConstructor CGameTask
   * @group xr_quest
   */
  export class XR_CGameTask extends XR_SGameTaskObjective {
    public constructor();

    public get_id(): string;
    public set_priority(value: i32): void;
    public set_id(id: string): void;
    public get_priority(): u32;
  }
}

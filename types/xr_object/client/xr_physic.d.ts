
declare module "xray16" {
  /**
   * @source C++ class physics_element
   * @customConstructor physics_element
   * @group xr_physic
   */
  export class physics_element {
    public apply_force(a: f32, b: f32, c: f32): void;

    public fix(): void;

    public get_angular_vel(vector: vector): void;

    public get_density(): f32;

    public get_linear_vel(vector: vector): void;

    public get_mass(): f32;

    public get_volume(): f32;

    public global_transform(): matrix;

    public is_breakable(): boolean;

    public is_fixed(): boolean;

    public release_fixed(): void;
  }

  /**
   * @source C++ class particles_object
   * @customConstructor particles_object
   * @group xr_physic
   */
  export class particles_object {
    public constructor(name: string);

    public pause_path(value: boolean): void;

    public play_at_pos(vector: vector): void;

    public move_to(vector1: vector, vector2: vector): void;

    public looped(): boolean;

    public load_path(path: string): void;

    public start_path(is_looped: boolean): void;

    public stop(): void;

    public stop_path(): void;

    public stop_deffered(): void;

    public play(): void;

    public playing(): boolean;

    public last_position(): vector;

    public set_direction(direction: vector): void;

    public set_orientation(a: f32, b: f32, c: f32): void;

    public stop_deferred(): void;
  }

  /**
   * @source C++ class physics_joint
   * @customConstructor physics_joint
   * @group xr_physic
   */
  export class physics_joint {
    public get_anchor(vector: vector): void;

    public get_axes_number(): u16;

    public get_axis_angle(value: i32): f32;

    public get_axis_dir(value: i32, vector: vector): void;

    public get_bone_id(): u16;

    public get_first_element(): physics_element;

    public get_limits(value1: f32, value2: f32, value3: i32): LuaMultiReturn<[number, number]>;

    public get_max_force_and_velocity(value1: f32, value2: f32, value3: i32): void;

    public get_stcond_element(): physics_element;

    public is_breakable(): boolean;

    public set_anchor_global(value1: f32, value2: f32, value3: f32): void;

    public set_anchor_vs_first_element(value1: f32, value2: f32, value3: f32): void;

    public set_anchor_vs_second_element(value1: f32, value2: f32, value3: f32): void;

    public set_axis_dir_global(value1: f32, value2: f32, value3: f32, value4: i32): void;

    public set_axis_dir_vs_first_element(value1: f32, value2: f32, value3: f32, value4: i32): void;

    public set_axis_dir_vs_second_element(value1: f32, value2: f32, value3: f32, value4: f32): void;

    public set_axis_spring_dumping_factors(value1: f32, value2: f32, value3: i32): void;

    public set_joint_spring_dumping_factors(value1: f32, value2: f32): void;

    public set_limits(value1: f32, value2: f32, value3: i32): void;

    public set_max_force_and_velocity(value1: f32, value2: f32, value3: i32): void;
  }

  /**
   * @source C++ class physics_shell
   * @customConstructor physics_shell
   * @group xr_physic
   */
  export class physics_shell {
    private constructor();

    public apply_force(a: f32, b: f32, c: f32): void;

    public block_breaking(): void;

    public get_angular_vel(vector: vector): void;

    public get_element_by_bone_id(id: u16): physics_element;

    public get_element_by_bone_name(bone_name: string): physics_element;

    public get_element_by_order(order: u16): physics_element;

    public get_elements_number(): u16;

    public get_joint_by_bone_id(id: u16): physics_joint;

    public get_joint_by_bone_name(name: string): physics_joint;

    public get_joint_by_order(order: u16): physics_joint;

    public get_joints_number(): u16;

    public get_linear_vel(vector: vector): void;

    public is_breakable(): boolean;

    public is_breaking_blocked(): boolean;

    public unblock_breaking(): void;
  }

  /**
   * @source C++ class physics_world
   * @customConstructor physics_world
   * @group xr_physic
   */
  export class physics_world {
    public set_gravity(value: f32): void;

    public gravity(): f32;

    public add_call(/* class CPHCondition*, class CPHAction */): void;
  }

  /**
   * @source C++ class IKinematicsAnimated
   * @customConstructor IKinematicsAnimated
   * @group xr_physic
   */
  export class IKinematicsAnimated {
    public PlayCycle(value: string): void;
  }

  /**
   * @source C++ class CPhysicsShellHolder : public CGameObject, CParticlesPlayer,
   *   IObjectPhysicsCollision, IPhysicsShellHolder
   * @customConstructor CPhysicsShellHolder
   * @group xr_physic
   */
  export class CPhysicsShellHolder extends EngineBinding {
    protected constructor();
  }

  /**
   * @source C++ class holder
   * @customConstructor holder
   * @group xr_physic
   */
  export class holder {
    public engaged(): boolean;

    public Action(id: u16, flags: u32): void;

    public SetParam(id: i32, value: vector): void;

    /**
     * Set holder object enter state.
     *
     * @param is_enabled - whether holder object can be entered
     */
    public SetEnterLocked(is_enabled: boolean): void;

    /**
     * Set holder object exist state.
     *
     * @param is_enabled - whether holder object can be exited
     */
    public SetExitLocked(is_enabled: boolean): void;
  }
}

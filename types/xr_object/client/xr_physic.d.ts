declare module "xray16" {
  /**
   * One rigid body element inside a physics shell.
   *
   * @source C++ class physics_element
   * @customConstructor physics_element
   * @group xr_physic
   *
   * @remarks
   * Scripts normally receive elements from a `physics_shell`; they are live engine objects, not standalone values. Keep
   * them only while the owning shell and object are alive.
   */
  export class physics_element {
    /**
     * Apply force to the element.
     *
     * @param x - Force x component.
     * @param y - Force y component.
     * @param z - Force z component.
     */
    public apply_force(x: f32, y: f32, z: f32): void;

    /**
     * Fix the element in place.
     */
    public fix(): void;

    /**
     * Write current angular velocity into a vector.
     *
     * @remarks
     * The passed vector is overwritten.
     *
     * @param velocity - Output vector.
     */
    public get_angular_vel(velocity: vector): void;

    /**
     * @returns Element density.
     */
    public get_density(): f32;

    /**
     * Write current linear velocity into a vector.
     *
     * @remarks
     * The passed vector is overwritten.
     *
     * @param velocity - Output vector.
     */
    public get_linear_vel(velocity: vector): void;

    /**
     * @returns Element mass.
     */
    public get_mass(): f32;

    /**
     * @returns Element volume.
     */
    public get_volume(): f32;

    /**
     * @returns Current global transform.
     */
    public global_transform(): matrix;

    /**
     * @returns Whether the element can break.
     */
    public is_breakable(): boolean;

    /**
     * @returns Whether the element is fixed.
     */
    public is_fixed(): boolean;

    /**
     * Release a fixed element.
     */
    public release_fixed(): void;
  }

  /**
   * Script-controlled particle system.
   *
   * @source C++ class particles_object
   * @customConstructor particles_object
   * @group xr_physic
   *
   * @remarks
   * Path playback methods require a path loaded with `load_path()` first.
   */
  export class particles_object {
    /**
     * @param name - Particle resource name.
     */
    public constructor(name: string);

    /**
     * Pause or resume the loaded particle path.
     *
     * @remarks
     * Requires `load_path()` to have created the internal animator.
     *
     * @param is_paused - Whether path playback is paused.
     */
    public pause_path(is_paused: boolean): void;

    /**
     * Play particles at a world position.
     *
     * @remarks
     * Updates the particle transform and starts non-looped playback.
     *
     * @param position - World position.
     */
    public play_at_pos(position: vector): void;

    /**
     * Move particles and provide velocity for interpolation.
     *
     * @remarks
     * Use this while an effect is already playing to keep its parent transform current.
     *
     * @param position - New world position.
     * @param velocity - Current movement velocity.
     */
    public move_to(position: vector, velocity: vector): void;

    /**
     * @returns Whether the particle system is looped.
     */
    public looped(): boolean;

    /**
     * Load an object animator path for the particle system.
     *
     * @remarks
     * Reuses the current animator when the same path is already loaded.
     *
     * @param path - Path name.
     */
    public load_path(path: string): void;

    /**
     * Start moving along the loaded path.
     *
     * @remarks
     * Requires `load_path()` first.
     *
     * @param is_looped - Whether path playback loops.
     */
    public start_path(is_looped: boolean): void;

    /**
     * Stop particles immediately.
     */
    public stop(): void;

    /**
     * Stop path playback.
     *
     * @remarks
     * Requires `load_path()` first.
     */
    public stop_path(): void;

    /**
     * Stop particles after existing particles finish.
     */
    public stop_deffered(): void;

    /**
     * Start particle playback at the current transform.
     */
    public play(): void;

    /**
     * @returns Whether particles are currently playing.
     */
    public playing(): boolean;

    /**
     * @returns Last particle position.
     */
    public last_position(): vector;

    /**
     * Set particle forward direction.
     *
     * @remarks
     * Pass a meaningful direction vector; the engine builds the remaining basis vectors from it.
     *
     * @param direction - New normalized direction.
     */
    public set_direction(direction: vector): void;

    /**
     * Set particle orientation.
     *
     * @param yaw - Yaw angle.
     * @param pitch - Pitch angle.
     * @param roll - Roll angle.
     */
    public set_orientation(yaw: f32, pitch: f32, roll: f32): void;

    /**
     * Stop particles after existing particles finish.
     */
    public stop_deferred(): void;
  }

  /**
   * Joint connecting two physics elements.
   *
   * @source C++ class physics_joint
   * @customConstructor physics_joint
   * @group xr_physic
   *
   * @remarks
   * Joint handles come from a `physics_shell`. Axis methods expect an axis supported by this joint; check
   * `get_axes_number()` before using indexed axis methods. Keep them only while the owning shell and object are alive.
   */
  export class physics_joint {
    /**
     * Write the joint anchor into a vector.
     *
     * @remarks
     * The passed vector is overwritten. Slider joints do not have a defined anchor and trip a native assertion.
     *
     * @param anchor - Output anchor vector.
     */
    public get_anchor(anchor: vector): void;

    /**
     * @returns Number of controlled axes.
     */
    public get_axes_number(): u16;

    /**
     * Get current angle for an axis.
     *
     * @remarks
     * Use an axis index lower than `get_axes_number()`.
     *
     * @param axis - Axis index.
     * @returns Axis angle.
     */
    public get_axis_angle(axis: i32): f32;

    /**
     * Write axis direction into a vector.
     *
     * @remarks
     * The passed vector is overwritten. Ball joints have no axis direction to write.
     *
     * @param axis - Axis index.
     * @param direction - Output direction vector.
     */
    public get_axis_dir(axis: i32, direction: vector): void;

    /**
     * @returns Bone id associated with this joint.
     */
    public get_bone_id(): u16;

    /**
     * @returns First connected physics element.
     */
    public get_first_element(): physics_element;

    /**
     * Get angle limits for an axis.
     *
     * @remarks
     * The first two parameters are Lua output placeholders; use the returned tuple in TypeScript.
     *
     * @param min - Output lower limit placeholder.
     * @param max - Output upper limit placeholder.
     * @param axis - Axis index.
     * @returns Lower and upper limits.
     */
    public get_limits(min: f32, max: f32, axis: i32): LuaMultiReturn<[number, number]>;

    /**
     * Get force and velocity limits for an axis.
     *
     * @remarks
     * Native Lua writes through the first two parameters. In TypeScript, pass placeholders only for declaration
     * compatibility.
     *
     * @param force - Output force placeholder.
     * @param velocity - Output velocity placeholder.
     * @param axis - Axis index.
     */
    public get_max_force_and_velocity(force: f32, velocity: f32, axis: i32): void;

    /**
     * @returns Second connected physics element.
     */
    public get_stcond_element(): physics_element;

    /**
     * @returns Whether the joint can break.
     */
    public is_breakable(): boolean;

    /**
     * Set anchor in world space.
     *
     * @remarks
     * The coordinates are interpreted in the shell's global frame.
     */
    public set_anchor_global(x: f32, y: f32, z: f32): void;

    /**
     * Set anchor relative to the first element.
     *
     * @remarks
     * The coordinates are interpreted in the first element's local frame.
     */
    public set_anchor_vs_first_element(x: f32, y: f32, z: f32): void;

    /**
     * Set anchor relative to the second element.
     *
     * @remarks
     * The coordinates are interpreted in the second element's local frame.
     */
    public set_anchor_vs_second_element(x: f32, y: f32, z: f32): void;

    /**
     * Set axis direction in world space.
     *
     * @remarks
     * Use an axis index lower than `get_axes_number()`.
     */
    public set_axis_dir_global(x: f32, y: f32, z: f32, axis: i32): void;

    /**
     * Set axis direction relative to the first element.
     *
     * @remarks
     * Use an axis index lower than `get_axes_number()`.
     */
    public set_axis_dir_vs_first_element(x: f32, y: f32, z: f32, axis: i32): void;

    /**
     * Set axis direction relative to the second element.
     *
     * @remarks
     * Use an axis index lower than `get_axes_number()`.
     */
    public set_axis_dir_vs_second_element(x: f32, y: f32, z: f32, axis: i32): void;

    /**
     * Set spring and damping factors for an axis.
     *
     * @remarks
     * Use an axis index lower than `get_axes_number()`.
     */
    public set_axis_spring_dumping_factors(spring: f32, damping: f32, axis: i32): void;

    /**
     * Set spring and damping factors for the whole joint.
     */
    public set_joint_spring_dumping_factors(spring: f32, damping: f32): void;

    /**
     * Set angle limits for an axis.
     *
     * @remarks
     * Limits are angles in radians for rotational axes. Use an axis index lower than `get_axes_number()`.
     */
    public set_limits(min: f32, max: f32, axis: i32): void;

    /**
     * Set force and velocity limits for an axis.
     *
     * @remarks
     * Use an axis index lower than `get_axes_number()`.
     */
    public set_max_force_and_velocity(force: f32, velocity: f32, axis: i32): void;
  }

  /**
   * Physics shell made of elements and joints.
   *
   * @source C++ class physics_shell
   * @customConstructor physics_shell
   * @group xr_physic
   *
   * @remarks
   * Shells are engine-owned. Store-order lookups require an index lower than the corresponding count method.
   */
  export class physics_shell {
    /**
     * Engine-created physics shell.
     */
    private constructor();

    /**
     * Apply force to the shell.
     *
     * @param x - Force x component.
     * @param y - Force y component.
     * @param z - Force z component.
     */
    public apply_force(x: f32, y: f32, z: f32): void;

    /**
     * Prevent shell elements and joints from breaking.
     */
    public block_breaking(): void;

    /**
     * Write current angular velocity into a vector.
     *
     * @remarks
     * The passed vector is overwritten with the root element's angular velocity.
     *
     * @param velocity - Output vector.
     */
    public get_angular_vel(velocity: vector): void;

    /**
     * Get an element by model bone id.
     *
     * @remarks
     * Returns the element attached to the bone, if the shell has one for that id. Invalid ids can trip native
     * assertions in debug builds.
     *
     * @param id - Bone id.
     * @returns Matching physics element.
     */
    public get_element_by_bone_id(id: u16): physics_element;

    /**
     * Get an element by model bone name.
     *
     * @remarks
     * The bone name must exist in the shell's kinematics. Invalid names can trip native assertions in debug builds.
     *
     * @param bone_name - Bone name.
     * @returns Matching physics element.
     */
    public get_element_by_bone_name(bone_name: string): physics_element;

    /**
     * Get an element by shell storage order.
     *
     * @remarks
     * `order` must be lower than `get_elements_number()`; invalid values trip a native assertion.
     *
     * @param order - Element order.
     * @returns Matching physics element.
     */
    public get_element_by_order(order: u16): physics_element;

    /**
     * @returns Number of elements in the shell.
     */
    public get_elements_number(): u16;

    /**
     * Get a joint by model bone id.
     *
     * @remarks
     * Returns the joint attached to the bone, if the shell has one for that id. Invalid ids can trip native assertions
     * in debug builds.
     *
     * @param id - Bone id.
     * @returns Matching physics joint.
     */
    public get_joint_by_bone_id(id: u16): physics_joint;

    /**
     * Get a joint by model bone name.
     *
     * @remarks
     * The bone name must exist in the shell's kinematics. Invalid names can trip native assertions in debug builds.
     *
     * @param name - Bone name.
     * @returns Matching physics joint.
     */
    public get_joint_by_bone_name(name: string): physics_joint;

    /**
     * Get a joint by shell storage order.
     *
     * @remarks
     * `order` must be lower than `get_joints_number()`; invalid values trip a native assertion.
     *
     * @param order - Joint order.
     * @returns Matching physics joint.
     */
    public get_joint_by_order(order: u16): physics_joint;

    /**
     * @returns Number of joints in the shell.
     */
    public get_joints_number(): u16;

    /**
     * Write current linear velocity into a vector.
     *
     * @remarks
     * The passed vector is overwritten with the root element's linear velocity.
     *
     * @param velocity - Output vector.
     */
    public get_linear_vel(velocity: vector): void;

    /**
     * @returns Whether the shell can break.
     */
    public is_breakable(): boolean;

    /**
     * @returns Whether breaking is currently blocked.
     */
    public is_breaking_blocked(): boolean;

    /**
     * Allow shell elements and joints to break again.
     */
    public unblock_breaking(): void;
  }

  /**
   * Opaque native physics condition handle.
   *
   * @source C++ class CPHCondition
   * @customConstructor CPHCondition
   * @group xr_physic
   *
   * @remarks
   * Script-friendly condition callbacks are exposed through `level.add_call`; this handle models native physics world
   * calls that already have a C++ condition object.
   */
  export class CPHCondition {
    private constructor();
  }

  /**
   * Opaque native physics action handle.
   *
   * @source C++ class CPHAction
   * @customConstructor CPHAction
   * @group xr_physic
   *
   * @remarks
   * Script-friendly action callbacks are exposed through `level.add_call`; this handle models native physics world calls
   * that already have a C++ action object.
   */
  export class CPHAction {
    private constructor();
  }

  /**
   * Global physics world controls.
   *
   * @source C++ class physics_world
   * @customConstructor physics_world
   * @group xr_physic
   *
   * @remarks
   * Obtain the live world through `level.physics_world()`. Gravity changes affect the whole level.
   */
  export class physics_world {
    /**
     * Set world gravity.
     *
     * @param value - Gravity value.
     */
    public set_gravity(value: f32): void;

    /**
     * @returns Current world gravity.
     */
    public gravity(): f32;

    /**
     * Add a physics condition/action callback pair.
     *
     * @remarks
     * This binding expects native `CPHCondition` and `CPHAction` objects; ordinary scripts usually use
     * `level.add_call` instead.
     *
     * @param condition - Native physics condition object.
     * @param action - Native physics action object.
     */
    public add_call(condition: CPHCondition, action: CPHAction): void;
  }

  /**
   * Animated model kinematics.
   *
   * @source C++ class IKinematicsAnimated
   * @customConstructor IKinematicsAnimated
   * @group xr_physic
   */
  export class IKinematicsAnimated {
    /**
     * Play an animation cycle by name.
     *
     * @param name - Animation name.
     */
    public PlayCycle(name: string): void;
  }

  /**
   * Client object that owns a physics shell.
   *
   * @source C++ class CPhysicsShellHolder : public CGameObject, CParticlesPlayer,
   *   IObjectPhysicsCollision, IPhysicsShellHolder
   * @customConstructor CPhysicsShellHolder
   * @group xr_physic
   *
   * @remarks
   * This is a native owner of physics shell state. Scripts usually reach it through `game_object.cast_PhysicsShellHolder()`
   * or `game_object.get_physics_shell()`.
   */
  export class CPhysicsShellHolder extends EngineBinding {
    /**
     * Engine-created physics shell holder.
     */
    protected constructor();
  }

  /**
   * Holder object that the actor can engage with.
   *
   * @source C++ class holder
   * @customConstructor holder
   * @group xr_physic
   *
   * @remarks
   * Returned only for objects that implement holder controls, such as mounted weapons or vehicles.
   */
  export class holder {
    /**
     * @returns Whether the actor is currently attached to the holder.
     */
    public engaged(): boolean;

    /**
     * Send holder action flags.
     *
     * @param id - Action id.
     * @param flags - Action flags.
     */
    public Action(id: u16, flags: u32): void;

    /**
     * Set holder vector parameter.
     *
     * @param id - Parameter id.
     * @param value - Parameter value.
     */
    public SetParam(id: i32, value: vector): void;

    /**
     * Set holder object enter state.
     *
     * @param is_enabled - Whether entering the holder is locked.
     */
    public SetEnterLocked(is_enabled: boolean): void;

    /**
     * Set holder object exit state.
     *
     * @param is_enabled - Whether exiting the holder is locked.
     */
    public SetExitLocked(is_enabled: boolean): void;
  }
}

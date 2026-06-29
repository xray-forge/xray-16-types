declare module "xray16" {
  /**
   * Campfire anomaly object.
   *
   * @source C++ class CZoneCampfire : CGameObject
   * @customConstructor CZoneCampfire
   * @group xr_level
   */
  export class CZoneCampfire extends CGameObject {
    public constructor();

    /**
     * @returns Whether the campfire is currently burning.
     */
    public is_on(): boolean;

    /**
     * Turn the campfire on.
     */
    public turn_on(): void;

    /**
     * Turn the campfire off.
     */
    public turn_off(): void;
  }

  /**
   * Animated client physics object.
   *
   * @source C++ class CPhysicObject : CGameObject
   * @customConstructor CPhysicObject
   * @group xr_level
   */
  export class CPhysicObject extends CGameObject {
    /**
     * Ignore dynamic objects while the door-like object is moving.
     */
    public set_door_ignore_dynamics(): void;

    /**
     * Start sounds attached to animated bones.
     */
    public play_bones_sound(): void;

    /**
     * Run the object animation backward.
     */
    public run_anim_back(): void;

    /**
     * Restore normal dynamic-object collision handling.
     */
    public unset_door_ignore_dynamics(): void;

    /**
     * Run the object animation forward.
     */
    public run_anim_forward(): void;

    /**
     * Stop the current object animation.
     *
     * @returns Whether animation was stopped.
     */
    public stop_anim(): boolean;

    /**
     * @returns Current animation time.
     */
    public anim_time_get(): f32;

    /**
     * Set current animation time.
     *
     * @param time - Animation time.
     */
    public anim_time_set(time: f32): void;

    /**
     * Stop sounds attached to animated bones.
     */
    public stop_bones_sound(): void;
  }

  /**
   * Hanging lamp object controlled from scripts.
   *
   * @source C++ class hanging_lamp : CGameObject
   * @customConstructor hanging_lamp
   * @group xr_level
   */
  export class hanging_lamp extends CGameObject {
    public constructor();

    /**
     * Turn the lamp on.
     */
    public turn_on(): void;

    /**
     * Turn the lamp off.
     */
    public turn_off(): void;
  }

  /**
   * Driveable car and mounted weapon holder.
   *
   * @source C++ class CCar : CGameObject, holder
   * @customConstructor CCar
   * @group xr_level
   */
  export class CCar extends CGameObject implements holder {
    public static eWpnActivate: 3;
    public static eWpnAutoFire: 5;
    public static eWpnDesiredDir: 1;
    public static eWpnDesiredPos: 2;
    public static eWpnFire: 4;
    public static eWpnToDefaultDir: 6;

    public constructor();

    /**
     * Lock or unlock entering the car.
     *
     * @param is_enabled - Whether entering is locked.
     */
    public SetEnterLocked(is_enabled: boolean): void;

    /**
     * Lock or unlock exiting the car.
     *
     * @param is_enabled - Whether exiting is locked.
     */
    public SetExitLocked(is_enabled: boolean): void;

    /**
     * @returns Whether the mounted weapon can hit its current target.
     */
    public CanHit(): boolean;

    /**
     * Trigger car explosion.
     */
    public CarExplode(): void;

    /**
     * Change fuel by a delta.
     *
     * @param fuel - Fuel delta.
     */
    public ChangefFuel(fuel: f32): void;

    /**
     * Change vehicle health by a delta.
     *
     * @param value - Health delta.
     */
    public ChangefHealth(value: f32): void;

    /**
     * @returns Current velocity vector.
     */
    public CurrentVel(): vector;

    /**
     * @returns Scheduled explosion time.
     */
    public ExplodeTime(): u32;

    /**
     * @returns Difference between current and desired weapon fire direction.
     */
    public FireDirDiff(): f32;

    /**
     * @returns Amount of fuel in vehicle instance.
     */
    public GetfFuel(): f32;

    /**
     * @returns Amount of fuel in vehicle instance.
     */
    public get_fuel(): f32;

    /**
     * @returns Fuel consumption rate of vehicle instance.
     */
    public GetfFuelConsumption(): f32;

    /**
     * @returns Fuel consumption rate of vehicle instance.
     */
    public get_fuel_consumption(): f32;

    /**
     * @returns Fuel tank size (max possible amount of fuel at time).
     */
    public GetfFuelTank(): f32;

    /**
     * @returns Fuel tank size.
     */
    public get_fuel_tank(): f32;

    /**
     * @returns Vehicle health value.
     */
    public GetfHealth(): f32;

    /**
     * @returns Whether vehicle has mounted weapon.
     */
    public HasWeapon(): boolean;

    /**
     * Check whether an object is visible from the car weapon.
     *
     * @param game_object - Object to test.
     * @returns Whether the object is visible.
     */
    public IsObjectVisible(game_object: game_object): boolean;

    /**
     * Start car damage particles.
     */
    public PlayDamageParticles(): void;

    /**
     * Set scheduled explosion time.
     *
     * @param time - Explosion time.
     */
    public SetExplodeTime(time: u32): void;

    /**
     * Set current fuel amount.
     *
     * @param fuel - Fuel amount.
     */
    public SetfFuel(fuel: f32): void;

    /**
     * Set current fuel amount.
     *
     * @param fuel - Fuel amount.
     */
    public set_fuel(fuel: f32): void;

    /**
     * Set fuel consumption rate.
     *
     * @param consumption - Fuel consumption rate.
     */
    public SetfFuelConsumption(consumption: f32): void;

    /**
     * Set fuel consumption rate.
     *
     * @param consumption - Fuel consumption rate.
     */
    public set_fuel_consumption(consumption: f32): void;

    /**
     * Set fuel tank capacity.
     *
     * @param fuel - Fuel tank capacity.
     */
    public SetfFuelTank(fuel: f32): void;

    /**
     * Set fuel tank capacity.
     *
     * @param fuel - Fuel tank capacity.
     */
    public set_fuel_tank(fuel: f32): void;

    /**
     * Set vehicle health.
     *
     * @param health - New health value.
     */
    public SetfHealth(health: f32): void;

    /**
     * @returns Whether vehicle engine is active at the moment.
     */
    public IsActiveEngine(): boolean;

    /**
     * Start vehicle engine.
     */
    public StartEngine(): void;

    /**
     * Stop vehicle engine.
     */
    public StopEngine(): void;

    /**
     * Set vehicle hand break in active state.
     */
    public HandBreak(): void;

    /**
     * Deactivate vehicle hand break.
     */
    public ReleaseHandBreak(): void;

    /**
     * @returns Current vehicle RPM value (speed).
     */
    public GetRPM(): f32;

    /**
     * Set current vehicle RPM value (speed).
     *
     * @param rpm - RPM value to apply.
     */
    public SetRPM(rpm: f32): void;

    /**
     * Stop car damage particles.
     */
    public StopDamageParticles(): void;

    /**
     * @returns Whether the actor is currently attached to this holder.
     */
    public engaged(): boolean;

    /**
     * Send a holder or weapon action.
     *
     * @param id - Action id.
     * @param flags - Action flags.
     */
    public Action(id: u16, flags: u32): void;

    /**
     * Set a mounted weapon vector parameter.
     *
     * @param id - Weapon parameter id.
     * @param vector - Parameter value.
     */
    public SetParam(id: i32, vector: vector): void;

    /**
     * Set a mounted weapon vector parameter.
     *
     * @param id - Weapon parameter id.
     * @param vector - Parameter value.
     */
    public SetParam(id: TXR_CCar_weapon_param, vector: vector): void;
  }

  /**
   * @group xr_level
   */
  export type TXR_CCar_weapon_param = EnumeratedStaticsValues<typeof CCar>;

  /**
   * Script-controlled helicopter object.
   *
   * @source C++ class CHelicopter : CGameObject
   * @customConstructor CHelicopter
   * @group xr_level
   */
  export class CHelicopter extends CGameObject {
    public static readonly eAlive: 0;
    public static readonly eBodyByPath: 0;
    public static readonly eBodyToPoint: 1;
    public static readonly eDead: 1;
    public static readonly eEnemyEntity: 2;
    public static readonly eEnemyNone: 0;
    public static readonly eEnemyPoint: 1;
    public static readonly eMovLanding: 4;
    public static readonly eMovNone: 0;
    public static readonly eMovPatrolPath: 2;
    public static readonly eMovRoundPath: 3;
    public static readonly eMovTakeOff: 5;
    public static readonly eMovToPoint: 1;

    public readonly m_exploded: boolean;
    public readonly m_light_started: boolean;
    public readonly m_flame_started: boolean;
    public readonly m_dead: boolean;
    public m_max_mgun_dist: f32;
    public m_max_rocket_dist: f32;
    public m_min_mgun_dist: f32;
    public m_min_rocket_dist: f32;
    public m_syncronize_rocket: boolean;
    public m_time_between_rocket_attack: u32;
    public m_use_mgun_on_attack: boolean;
    public m_use_rocket_on_attack: boolean;

    public constructor();

    /**
     * Check whether an object is visible to the helicopter.
     *
     * @param game_object - Object to test.
     * @returns Whether the object is visible.
     */
    public isVisible(game_object: game_object): boolean;

    /**
     * @returns Safe altitude configured for the movement manager.
     */
    public GetSafeAltitude(): f32;

    /**
     * @returns Current real altitude above terrain.
     */
    public GetRealAltitude(): f32;

    /**
     * @returns Current scalar velocity.
     */
    public GetCurrVelocity(): f32;

    /**
     * Get desired speed near the destination point.
     *
     * @param value - Distance threshold.
     * @returns Speed at that destination distance.
     */
    public GetSpeedInDestPoint(value: f32): f32;

    /**
     * @returns Distance at which the helicopter treats a point as reached.
     */
    public GetOnPointRangeDist(): f32;

    /**
     * @returns Maximum movement velocity.
     */
    public GetMaxVelocity(): f32;

    /**
     * @returns Helicopter health.
     */
    public GetfHealth(): f32;

    /**
     * @returns Current movement state.
     */
    public GetMovementState(): i32; /* Enum ? */

    /**
     * @returns Current body aiming state.
     */
    public GetBodyState(): i32; /* Enum ? */

    /**
     * @returns Current velocity vector.
     */
    public GetCurrVelocityVec(): vector;

    /**
     * @returns Alive/dead state.
     */
    public GetState(): i32;

    /**
     * @returns Distance to destination position.
     */
    public GetDistanceToDestPosition(): f32;

    /**
     * @returns Current enemy tracking state.
     */
    public GetHuntState(): i32; /* Enum ? */

    /**
     * Set desired speed near the destination point.
     *
     * @param value - Speed value.
     */
    public SetSpeedInDestPoint(value: f32): unknown;

    /**
     * Set linear acceleration limits.
     *
     * @param min - Minimum acceleration.
     * @param max - Maximum acceleration.
     */
    public SetLinearAcc(min: f32, max: f32): void;

    /**
     * Set helicopter health.
     *
     * @param health - New health value.
     * @returns Applied health value.
     */
    public SetfHealth(health: f32): f32;

    /**
     * Set maximum movement velocity.
     *
     * @param value - Maximum velocity.
     */
    public SetMaxVelocity(value: f32): void;

    /**
     * Track an enemy object.
     *
     * @param game_object - Enemy object, or null to clear.
     */
    public SetEnemy(game_object: game_object | null): void;

    /**
     * Track an enemy point.
     *
     * @param position - Enemy world position.
     */
    public SetEnemy(position: vector): void;

    /**
     * Set fire trail length.
     *
     * @param value - Trail length.
     */
    public SetFireTrailLength(value: f32): void;

    /**
     * Set allowed barrel direction tolerance.
     *
     * @param value - Tolerance value.
     */
    public SetBarrelDirTolerance(value: f32): void;

    /**
     * Set movement destination.
     *
     * @param position - Destination world position.
     */
    public SetDestPosition(position: vector): void;

    /**
     * Set point reach distance.
     *
     * @param distance - Reach distance.
     */
    public SetOnPointRangeDist(distance: f32): void;

    /**
     * Aim the helicopter body at a point.
     *
     * @param position - Point to look at.
     * @param is_smooth - Whether to rotate smoothly.
     */
    public LookAtPoint(position: vector, is_smooth: boolean): void;

    /**
     * Move by a patrol path.
     *
     * @param path_name - Patrol path name.
     * @param start_point - Starting point index.
     */
    public GoPatrolByPatrolPath(path_name: string, start_point: i32): void;

    /**
     * Explode the helicopter.
     */
    public Explode(): void;

    /**
     * Turn helicopter lighting on or off.
     *
     * @param is_enabled - New lighting state.
     */
    public TurnLighting(is_enabled: boolean): void;

    /**
     * @returns Whether fire trail rendering is enabled.
     */
    public UseFireTrail(): boolean;

    /**
     * Enable or disable fire trail rendering.
     *
     * @param is_enabled - New fire trail state.
     */
    public UseFireTrail(is_enabled: boolean): void;

    /**
     * Move around a point by a round patrol path.
     *
     * @param center - Round path center.
     * @param radius - Path radius.
     * @param clockwise - Whether to move clockwise.
     */
    public GoPatrolByRoundPath(center: vector, radius: f32, clockwise: boolean): void;

    /**
     * Kill the helicopter without running a full explosion command.
     */
    public Die(): void;

    /**
     * Start flame effects.
     */
    public StartFlame(): void;

    /**
     * Turn engine sound on or off.
     *
     * @param enabled - New sound state.
     */
    public TurnEngineSound(enabled: boolean): void;

    /**
     * Clear current enemy target.
     */
    public ClearEnemy(): void;
  }
}

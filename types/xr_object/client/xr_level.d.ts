declare module "xray16" {
  /**
   * Campfire anomaly object.
   *
   * @source `src/xrGame/MosquitoBald_script.cpp`, `CZoneCampfire` binding.
   * @customConstructor CZoneCampfire
   * @group xr_level
   *
   * @remarks
   * Campfire controls require this runtime object. The binding is registered next to mosquito-bald anomalies and
   * exposes only on/off state controls; generic anomaly zones do not have these methods.
   */
  export class CZoneCampfire extends CGameObject {
    /**
     * Create a campfire object wrapper.
     */
    public constructor();

    /**
     * @returns Whether the campfire is currently burning.
     */
    public is_on(): boolean;

    /**
     * Switch the campfire into its enabled state and start native idle effects.
     */
    public turn_on(): void;

    /**
     * Switch the campfire into its disabled state and stop native idle effects.
     */
    public turn_off(): void;
  }

  /**
   * Animated client physics object.
   *
   * @source C++ class CPhysicObject : CGameObject
   * @customConstructor CPhysicObject
   * @group xr_level
   *
   * @remarks
   * Wrapper for animated physics props, especially door-like objects. Door and bone-sound helpers require this runtime
   * class.
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
   *
   * @remarks
   * Lamp controls require this runtime object. They do not apply to arbitrary lights or torches.
   */
  export class hanging_lamp extends CGameObject {
    /**
     * Create a hanging lamp object wrapper.
     */
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
   * @source `src/xrGame/CarScript.cpp`, `CCar` binding.
   * @customConstructor CCar
   * @group xr_level
   *
   * @remarks
   * Vehicle and mounted-weapon holder APIs require a car object. Use `game_object.get_car()` or holder casts before
   * calling these methods from shared object code.
   */
  export class CCar extends CGameObject implements holder {
    /**
     * Engine enum value for `CCar.eWpnActivate`.
     */
    public static readonly eWpnActivate: 3;
    /**
     * Engine enum value for `CCar.eWpnAutoFire`.
     */
    public static readonly eWpnAutoFire: 5;
    /**
     * Engine enum value for `CCar.eWpnDesiredDir`.
     */
    public static readonly eWpnDesiredDir: 1;
    /**
     * Engine enum value for `CCar.eWpnDesiredPos`.
     */
    public static readonly eWpnDesiredPos: 2;
    /**
     * Engine enum value for `CCar.eWpnFire`.
     */
    public static readonly eWpnFire: 4;
    /**
     * Engine enum value for `CCar.eWpnToDefaultDir`.
     */
    public static readonly eWpnToDefaultDir: 6;

    /**
     * Create a car object wrapper.
     */
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
     * Change current fuel by a delta and clamp it to the tank range.
     *
     * @remarks
     * Negative deltas cannot reduce fuel below `0`; positive deltas cannot increase it above `GetfFuelTank()`.
     * Use `SetfFuel()` or `set_fuel()` when the script needs to assign an absolute fuel value.
     *
     * @param fuel - Fuel delta.
     */
    public ChangefFuel(fuel: f32): void;

    /**
     * Change vehicle health by a delta and clamp it to the normalized health range.
     *
     * @remarks
     * The native implementation clamps the result to `0..1`. Use `SetfHealth()` when assigning an absolute health
     * value.
     *
     * @param value - Health delta.
     */
    public ChangefHealth(value: f32): void;

    /**
     * @returns Current velocity vector.
     */
    public CurrentVel(): vector;

    /**
     * @returns Scheduled delayed-fuse explosion time in milliseconds, or `0` when no fuse was initialized.
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
     * Set delayed-fuse explosion time.
     *
     * @remarks
     * The native method accepts milliseconds and converts them to the delayed action fuse timeout.
     *
     * @param time - Explosion time in milliseconds.
     */
    public SetExplodeTime(time: u32): void;

    /**
     * Set current fuel amount directly.
     *
     * @remarks
     * This is an absolute setter and does not clamp against tank capacity.
     *
     * @param fuel - Fuel amount.
     */
    public SetfFuel(fuel: f32): void;

    /**
     * Set current fuel amount directly.
     *
     * @remarks
     * Lowercase alias for `SetfFuel()`.
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
     * Set vehicle health directly.
     *
     * @remarks
     * This forwards to the entity health setter and returns the applied value. `ChangefHealth()` is the clamped delta
     * helper.
     *
     * @param health - New health value.
     * @returns Applied health value.
     */
    public SetfHealth(health: f32): f32;

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
     * Send a mounted-weapon action.
     *
     * @remarks
     * For `eWpnFire`, `eWpnActivate`, and `eWpnAutoFire`, native code treats `flags === 1` as enabled/start and any
     * other value as disabled/stop. `eWpnToDefaultDir` resets the weapon direction to its bind orientation.
     *
     * @param id - Weapon action id.
     * @param flags - Action flags.
     */
    public Action(id: u16, flags: u32): void;

    /**
     * Set a mounted-weapon vector parameter.
     *
     * @remarks
     * The script binding exposes the vector overload. Native code handles `eWpnDesiredPos` by aiming the weapon at the
     * provided world position; other ids are ignored by this overload.
     *
     * @param id - Weapon parameter id.
     * @param vector - Parameter value.
     */
    public SetParam(id: i32, vector: vector): void;

    /**
     * Set mounted weapon desired target position.
     *
     * @param id - `CCar.eWpnDesiredPos`.
     * @param vector - Target world position.
     */
    public SetParam(id: typeof CCar.eWpnDesiredPos, vector: vector): void;
  }

  /**
   * Mounted-weapon action and parameter ids exported on `CCar`.
   *
   * @source `src/xrGame/CarScript.cpp`, `CCar.wpn_action` enum.
   * @group xr_level
   *
   * @remarks
   * `eWpnFire`, `eWpnActivate`, `eWpnAutoFire`, and `eWpnToDefaultDir` are action ids for `CCar.Action()`.
   * `eWpnDesiredPos` is handled by the script-visible `CCar.SetParam()` vector overload.
   */
  export type TXR_CCar_weapon_param = EnumeratedStaticsValues<typeof CCar>;

  /**
   * Helicopter life-state values returned by `CHelicopter.GetState()`.
   *
   * @source `src/xrGame/helicopter_script.cpp`, `CHelicopter.state` enum.
   * @group xr_level
   */
  export type TXR_helicopter_state = typeof CHelicopter.eAlive | typeof CHelicopter.eDead | -1;

  /**
   * Helicopter movement-state values returned by `CHelicopter.GetMovementState()`.
   *
   * @source `src/xrGame/helicopter_script.cpp`, `CHelicopter.movement_state` enum.
   * @group xr_level
   */
  export type TXR_helicopter_movement_state =
    | typeof CHelicopter.eMovNone
    | typeof CHelicopter.eMovToPoint
    | typeof CHelicopter.eMovPatrolPath
    | typeof CHelicopter.eMovRoundPath
    | typeof CHelicopter.eMovLanding
    | typeof CHelicopter.eMovTakeOff;

  /**
   * Helicopter body-state values returned by `CHelicopter.GetBodyState()`.
   *
   * @source `src/xrGame/helicopter_script.cpp`, `CHelicopter.body_state` enum.
   * @group xr_level
   */
  export type TXR_helicopter_body_state = typeof CHelicopter.eBodyByPath | typeof CHelicopter.eBodyToPoint;

  /**
   * Helicopter enemy-tracking values returned by `CHelicopter.GetHuntState()`.
   *
   * @source `src/xrGame/helicopter_script.cpp`, `CHelicopter.hunt_state` enum.
   * @group xr_level
   */
  export type TXR_helicopter_hunt_state =
    | typeof CHelicopter.eEnemyNone
    | typeof CHelicopter.eEnemyPoint
    | typeof CHelicopter.eEnemyEntity;

  /**
   * Script-controlled helicopter object.
   *
   * @source `src/xrGame/helicopter_script.cpp`, `CHelicopter` binding.
   * @customConstructor CHelicopter
   * @group xr_level
   *
   * @remarks
   * Helicopter controls require a helicopter object. Movement, enemy, lighting, and fire-trail setters are direct
   * native control hooks and do not validate scenario logic.
   */
  export class CHelicopter extends CGameObject {
    /**
     * Engine enum value for `CHelicopter.eAlive`.
     */
    public static readonly eAlive: 0;
    /**
     * Engine enum value for `CHelicopter.eBodyByPath`.
     */
    public static readonly eBodyByPath: 0;
    /**
     * Engine enum value for `CHelicopter.eBodyToPoint`.
     */
    public static readonly eBodyToPoint: 1;
    /**
     * Engine enum value for `CHelicopter.eDead`.
     */
    public static readonly eDead: 1;
    /**
     * Engine enum value for `CHelicopter.eEnemyEntity`.
     */
    public static readonly eEnemyEntity: 2;
    /**
     * Engine enum value for `CHelicopter.eEnemyNone`.
     */
    public static readonly eEnemyNone: 0;
    /**
     * Engine enum value for `CHelicopter.eEnemyPoint`.
     */
    public static readonly eEnemyPoint: 1;
    /**
     * Engine enum value for `CHelicopter.eMovLanding`.
     */
    public static readonly eMovLanding: 4;
    /**
     * Engine enum value for `CHelicopter.eMovNone`.
     */
    public static readonly eMovNone: 0;
    /**
     * Engine enum value for `CHelicopter.eMovPatrolPath`.
     */
    public static readonly eMovPatrolPath: 2;
    /**
     * Engine enum value for `CHelicopter.eMovRoundPath`.
     */
    public static readonly eMovRoundPath: 3;
    /**
     * Engine enum value for `CHelicopter.eMovTakeOff`.
     */
    public static readonly eMovTakeOff: 5;
    /**
     * Engine enum value for `CHelicopter.eMovToPoint`.
     */
    public static readonly eMovToPoint: 1;

    /**
     * Whether the helicopter explosion has already been triggered.
     */
    public readonly m_exploded: boolean;

    /**
     * Whether helicopter lights are currently started.
     */
    public readonly m_light_started: boolean;

    /**
     * Whether flame effects are currently started.
     */
    public readonly m_flame_started: boolean;

    /**
     * Whether the helicopter is marked dead.
     */
    public readonly m_dead: boolean;

    /**
     * Maximum machine-gun attack distance.
     */
    public m_max_mgun_dist: f32;

    /**
     * Maximum rocket attack distance.
     */
    public m_max_rocket_dist: f32;

    /**
     * Minimum machine-gun attack distance.
     */
    public m_min_mgun_dist: f32;

    /**
     * Minimum rocket attack distance.
     */
    public m_min_rocket_dist: f32;

    /**
     * Whether rocket firing is synchronized with the helicopter attack logic.
     */
    public m_syncronize_rocket: boolean;

    /**
     * Delay between rocket attacks.
     */
    public m_time_between_rocket_attack: u32;

    /**
     * Whether machine-gun attacks are enabled.
     */
    public m_use_mgun_on_attack: boolean;

    /**
     * Whether rocket attacks are enabled.
     */
    public m_use_rocket_on_attack: boolean;

    /**
     * Create a helicopter object wrapper.
     */
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
     * @remarks
     * The native binding requires one numeric argument, but the implementation ignores it and returns the configured
     * destination speed.
     *
     * @param value - Ignored by native code.
     * @returns Speed used near the destination point.
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
    public GetMovementState(): TXR_helicopter_movement_state;

    /**
     * @returns Current body aiming state.
     */
    public GetBodyState(): TXR_helicopter_body_state;

    /**
     * @returns Current velocity vector.
     */
    public GetCurrVelocityVec(): vector;

    /**
     * @returns Alive/dead state.
     */
    public GetState(): TXR_helicopter_state;

    /**
     * @returns Distance to destination position.
     */
    public GetDistanceToDestPosition(): f32;

    /**
     * @returns Current enemy tracking state.
     */
    public GetHuntState(): TXR_helicopter_hunt_state;

    /**
     * Set desired speed near the destination point.
     *
     * @remarks
     * Used by the movement manager while approaching the current destination or patrol point.
     *
     * @param value - Speed value.
     */
    public SetSpeedInDestPoint(value: f32): void;

    /**
     * Set forward and braking linear acceleration values.
     *
     * @param min - Forward acceleration.
     * @param max - Braking acceleration.
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
     * Track an enemy object by its engine id.
     *
     * @remarks
     * Passing nullish values is not safe for the native object overload. Use `ClearEnemy()` to clear the current enemy.
     *
     * @param game_object - Enemy object to track.
     */
    public SetEnemy(game_object: game_object): void;

    /**
     * Track an enemy point.
     *
     * @remarks
     * Sets the hunt state to `CHelicopter.eEnemyPoint` and stores the provided world position.
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
     * Set movement destination and switch movement state to `CHelicopter.eMovToPoint`.
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
     * Aim the helicopter body at a point or return aiming to path direction.
     *
     * @remarks
     * Native code treats the boolean as an enable flag: `true` switches body state to `eBodyToPoint`, while `false`
     * switches it back to `eBodyByPath`.
     *
     * @param position - Point to look at when enabled.
     * @param is_smooth - Whether point aiming is enabled.
     */
    public LookAtPoint(position: vector, is_smooth: boolean): void;

    /**
     * Move by a named patrol path and switch movement state to `CHelicopter.eMovPatrolPath`.
     *
     * @param path_name - Patrol path name.
     * @param start_point - Starting patrol vertex id.
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
     * Enable or disable fire trail rendering and update fire dispersion settings.
     *
     * @param is_enabled - New fire trail state.
     */
    public UseFireTrail(is_enabled: boolean): void;

    /**
     * Move around a point by a generated round patrol path and switch movement state to `CHelicopter.eMovRoundPath`.
     *
     * @remarks
     * Native code refuses radii smaller than the current speed and angular-speed constraints allow.
     *
     * @param center - Round path center.
     * @param radius - Path radius.
     * @param clockwise - Whether to move clockwise.
     */
    public GoPatrolByRoundPath(center: vector, radius: f32, clockwise: boolean): void;

    /**
     * Switch the helicopter to dead state and enable its falling physics.
     *
     * @remarks
     * This stops the engine sound and starts the broken-loop sound, but it is separate from `Explode()`.
     */
    public Die(): void;

    /**
     * Start smoke/flame particle effects if they are not already active.
     */
    public StartFlame(): void;

    /**
     * Turn engine sound on or off.
     *
     * @param enabled - New sound state.
     */
    public TurnEngineSound(enabled: boolean): void;

    /**
     * Clear current enemy target and switch hunt state to `CHelicopter.eEnemyNone`.
     */
    public ClearEnemy(): void;
  }
}

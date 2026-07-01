declare module "xray16" {
  /**
   * Monster movement, animation, and sound constants.
   *
   * @source C++ class MonsterSpace
   * @customConstructor MonsterSpace
   * @group xr_action
   *
   * @remarks
   * These constants are grouped by the original engine namespace, not by TypeScript use site. Some values are used by
   * stalker movement controllers, some by monsters, and head animation values are used by trader sound actions.
   */
  export class MonsterSpace {
    /**
     * Engine enum value for `MonsterSpace.head_anim_angry`.
     */
    public static readonly head_anim_angry: 1;
    /**
     * Engine enum value for `MonsterSpace.head_anim_glad`.
     */
    public static readonly head_anim_glad: 2;
    /**
     * Engine enum value for `MonsterSpace.head_anim_kind`.
     */
    public static readonly head_anim_kind: 3;
    /**
     * Engine enum value for `MonsterSpace.head_anim_normal`.
     */
    public static readonly head_anim_normal: 0;
    /**
     * Engine enum value for `MonsterSpace.sound_script`.
     */
    public static readonly sound_script: 128;
  }

  /**
   * @group xr_action
   */
  export type TXR_MonsterBodyStateKey = EnumeratedStaticsKeys<typeof MonsterSpace>;

  /**
   * @group xr_action
   */
  export type TXR_MonsterBodyState = EnumeratedStaticsValues<typeof MonsterSpace>;

  /**
   * Composite action passed to scripted entities.
   *
   * @source C++ class entity_action
   * @customConstructor entity_action
   * @group xr_action
   *
   * @remarks
   * This is a container for sub-actions. The engine applies only the parts set with `set_action()`, and completion
   * checks read the matching sub-action state. It is meaningful only when passed to a scripted entity controller, such
   * as `game_object.command()`.
   */
  export class entity_action extends EngineBinding {
    /**
     * Create an empty entity action.
     */
    public constructor();

    /**
     * Copy an existing entity action.
     *
     * @param action - Action to copy.
     */
    public constructor(action: entity_action);

    /**
     * Set the movement part of this action.
     *
     * @param move - Movement action.
     */
    public set_action(move: move): void;

    /**
     * Set the look part of this action.
     *
     * @param look - Look action.
     */
    public set_action(look: look): void;

    /**
     * Set the animation part of this action.
     *
     * @param anim - Animation action.
     */
    public set_action(anim: anim): void;

    /**
     * Set the sound part of this action.
     *
     * @param sound - Sound action.
     */
    public set_action(sound: sound): void;

    /**
     * Set the particle part of this action.
     *
     * @param particle - Particle action.
     */
    public set_action(particle: particle): void;

    /**
     * Set the object interaction part of this action.
     *
     * @param objectAction - Object action.
     */
    public set_action(objectAction: XR_object): void;

    /**
     * Set the completion condition for this action.
     *
     * @param cond - Completion condition.
     */
    public set_action(cond: cond): void;

    /**
     * Set a monster global action.
     *
     * @remarks
     * Intended for custom monsters. Stalkers and ordinary inventory objects do not execute monster global actions.
     *
     * @param act - Monster action.
     */
    public set_action(act: act): void;

    /**
     * Check whether the movement part is complete.
     *
     * @returns Whether movement is complete.
     */
    public move(): boolean;

    /**
     * Check whether the particle part is complete.
     *
     * @returns Whether particle playback is complete.
     */
    public particle(): boolean;

    /**
     * Check whether the whole action is complete.
     *
     * @returns Whether all required parts are complete.
     */
    public completed(): boolean;

    /**
     * Check whether the object interaction part is complete.
     *
     * @returns Whether object interaction is complete.
     */
    public object(): boolean;

    /**
     * Check whether all action parts are complete.
     *
     * @returns Whether the action is complete.
     */
    public all(): boolean;

    /**
     * Check whether the action time condition has elapsed.
     *
     * @returns Whether the time condition is complete.
     */
    public time(): boolean;

    /**
     * Check whether the look part is complete.
     *
     * @returns Whether look handling is complete.
     */
    public look(): boolean;

    /**
     * Check whether the sound part is complete.
     *
     * @returns Whether sound playback is complete.
     */
    public sound(): boolean;

    /**
     * Check whether the animation part is complete.
     *
     * @returns Whether animation is complete.
     */
    public anim(): boolean;
  }

  /**
   * @group xr_action
   */
  export type TXR_entity_action = move | look | anim | sound | particle | XR_object | cond | act;

  /**
   * Object interaction action.
   *
   * @source C++ class object
   * @customConstructor object
   * @group xr_action
   *
   * @remarks
   * Object actions are consumed by the object handler of an AI entity. Weapon-oriented actions such as `fire1`,
   * `reload`, or `strap` require the controlled object to have a compatible active item.
   */
  export class XR_object extends EngineBinding {
    /**
     * Engine enum value for `XR_object.activate`.
     */
    public static readonly activate: 16;
    /**
     * Engine enum value for `XR_object.aim1`.
     */
    public static readonly aim1: 4;
    /**
     * Engine enum value for `XR_object.aim2`.
     */
    public static readonly aim2: 5;
    /**
     * Engine enum value for `XR_object.deactivate`.
     */
    public static readonly deactivate: 17;
    /**
     * Engine enum value for `XR_object.drop`.
     */
    public static readonly drop: 11;
    /**
     * Engine enum value for `XR_object.dummy`.
     */
    public static readonly dummy: -1;
    /**
     * Engine enum value for `XR_object.fire1`.
     */
    public static readonly fire1: 6;
    /**
     * Engine enum value for `XR_object.fire2`.
     */
    public static readonly fire2: 8;
    /**
     * Engine enum value for `XR_object.hide`.
     */
    public static readonly hide: 22;
    /**
     * Engine enum value for `XR_object.idle`.
     */
    public static readonly idle: 9;
    /**
     * Engine enum value for `XR_object.reload`.
     */
    public static readonly reload: 2;
    /**
     * Engine enum value for `XR_object.reload1`.
     */
    public static readonly reload1: 2;
    /**
     * Engine enum value for `XR_object.reload2`.
     */
    public static readonly reload2: 3;
    /**
     * Engine enum value for `XR_object.show`.
     */
    public static readonly show: 21;
    /**
     * Engine enum value for `XR_object.strap`.
     */
    public static readonly strap: 10;
    /**
     * Engine enum value for `XR_object.switch1`.
     */
    public static readonly switch1: 0;
    /**
     * Engine enum value for `XR_object.switch2`.
     */
    public static readonly switch2: 1;
    /**
     * Engine enum value for `XR_object.take`.
     */
    public static readonly take: 23;
    /**
     * Engine enum value for `XR_object.turn_off`.
     */
    public static readonly turn_off: 20;
    /**
     * Engine enum value for `XR_object.turn_on`.
     */
    public static readonly turn_on: 19;
    /**
     * Engine enum value for `XR_object.use`.
     */
    public static readonly use: 18;

    /**
     * Create an empty object action.
     */
    public constructor();

    /**
     * Create an action for a game object.
     *
     * @param game_object - Target object.
     * @param action - Object action id.
     */
    public constructor(game_object: game_object, action: TXR_object_action);

    /**
     * Create a timed action for a game object.
     *
     * @param game_object - Target object.
     * @param action - Object action id.
     * @param time - Action time limit.
     */
    public constructor(game_object: game_object, action: TXR_object_action, time: u32);

    /**
     * Create an object action without a target.
     *
     * @param action - Object action id.
     */
    public constructor(action: TXR_object_action);

    /**
     * Create an action for an object by name.
     *
     * @param object_name - Target object name.
     * @param action - Object action id.
     */
    public constructor(object_name: string, action: TXR_object_action);

    /**
     * Set the object action mode.
     *
     * @param action - Object action id.
     */
    public action(action: TXR_object_action): void;

    /**
     * Set target object by name.
     *
     * @param object_name - Target object name.
     */
    public object(object_name: string): void;

    /**
     * Set target object.
     *
     * @param game_object - Target object.
     */
    public object(game_object: game_object): void;

    /**
     * Check whether the object action is complete.
     *
     * @returns Whether the action is complete.
     */
    public completed(): boolean;
  }

  /**
   * @group xr_action
   */
  export type TXR_object_action = EnumeratedStaticsValues<typeof XR_object>;

  /**
   * Note: typescript workaround since global type `object` is reserved.
   *
   * @group xr_global_declaration
   */
  export const object: typeof XR_object;

  /**
   * Movement action for stalkers, monsters, and vehicles.
   *
   * @source C++ class move
   * @customConstructor move
   * @group xr_action
   *
   * @remarks
   * The overload family is split between generic movement goals, vehicle input flags, and monster-only movement
   * actions. Use the constructor group that matches the object receiving the resulting `entity_action`.
   */
  export class move extends EngineBinding {
    // Todo: All enums are in one static, probably should declare few parent interfaces / classes with enums
    /**
     * Engine enum value for `move.crouch`.
     */
    public static readonly crouch: 0;

    /**
     * Engine enum value for `move.back`.
     */
    public static readonly back: 4;
    /**
     * Engine enum value for `move.criteria`.
     */
    public static readonly criteria: 2;

    /**
     * Engine enum value for `move.curve`.
     */
    public static readonly curve: 0;
    /**
     * Engine enum value for `move.curve_criteria`.
     */
    public static readonly curve_criteria: 2;

    /**
     * Engine enum value for `move.default`.
     */
    public static readonly default: 0;
    /**
     * Engine enum value for `move.dodge`.
     */
    public static readonly dodge: 1;
    /**
     * Engine enum value for `move.down`.
     */
    public static readonly down: 64;
    /**
     * Engine enum value for `move.drag`.
     */
    public static readonly drag: 3;
    /**
     * Engine enum value for `move.force`.
     */
    public static readonly force: 1;
    /**
     * Engine enum value for `move.fwd`.
     */
    public static readonly fwd: 2;
    /**
     * Engine enum value for `move.handbrake`.
     */
    public static readonly handbrake: 128;
    /**
     * Engine enum value for `move.jump`.
     */
    public static readonly jump: 4;
    /**
     * Engine enum value for `move.left`.
     */
    public static readonly left: 8;

    /**
     * Engine enum value for `move.line`.
     */
    public static readonly line: 0;
    /**
     * Engine enum value for `move.none`.
     */
    public static readonly none: 1;
    /**
     * Engine enum value for `move.off`.
     */
    public static readonly off: 512;
    /**
     * Engine enum value for `move.on`.
     */
    public static readonly on: 256;
    /**
     * Engine enum value for `move.right`.
     */
    public static readonly right: 16;

    /**
     * Fast run movement type, not sprint but generic fast movement.
     */
    public static readonly run: 1;
    /**
     * Engine enum value for `move.run_fwd`.
     */
    public static readonly run_fwd: 2;
    /**
     * Engine enum value for `move.run_with_leader`.
     */
    public static readonly run_with_leader: 7;
    /**
     * Engine enum value for `move.stand`.
     */
    public static readonly stand: 2;
    /**
     * Engine enum value for `move.standing`.
     */
    public static readonly standing: 1;
    /**
     * Engine enum value for `move.steal`.
     */
    public static readonly steal: 5;
    /**
     * Engine enum value for `move.up`.
     */
    public static readonly up: 32;
    /**
     * Normal walk movement type, generic movement type used in most cases.
     */
    public static readonly walk: 0;

    /**
     * Engine enum value for `move.walk_fwd`.
     */
    public static readonly walk_fwd: 0;
    /**
     * Engine enum value for `move.walk_bkwd`.
     */
    public static readonly walk_bkwd: 1;
    /**
     * Engine enum value for `move.walk_with_leader`.
     */
    public static readonly walk_with_leader: 6;

    /**
     * Create an empty movement action.
     */
    public constructor();

    /**
     * Create a vehicle input action.
     *
     * @remarks
     * Uses `move` input-key flags such as `fwd`, `back`, `left`, `right`, `handbrake`, `on`, and `off`.
     *
     * @param action - Input key id.
     */
    public constructor(action: number);

    /**
     * Create a timed vehicle input action.
     *
     * @remarks
     * Uses `move` input-key flags. The time value limits how long the input action remains active.
     *
     * @param action - Input key id.
     * @param value - Action duration or value.
     */
    public constructor(action: number, value: number);

    /**
     * Move toward an object with explicit body, movement, and path modes.
     *
     * @param bodyState - Body state id.
     * @param movementType - Movement type id.
     * @param pathType - Detail path type id.
     * @param game_object - Target object.
     */
    public constructor(bodyState: number, movementType: TXR_move, pathType: number, game_object: game_object);

    /**
     * Move toward an object with a speed value.
     *
     * @param bodyState - Body state id.
     * @param movementType - Movement type id.
     * @param pathType - Detail path type id.
     * @param game_object - Target object.
     * @param value - Speed or distance value.
     */
    public constructor(
      bodyState: number,
      movementType: TXR_move,
      pathType: number,
      game_object: game_object,
      value: f32
    );

    /**
     * Move along a patrol path.
     *
     * @param bodyState - Body state id.
     * @param movementType - Movement type id.
     * @param pathType - Detail path type id.
     * @param patrol - Patrol path parameters.
     */
    public constructor(bodyState: number, movementType: TXR_move, pathType: number, patrol: patrol);

    /**
     * Move along a patrol path with a speed value.
     *
     * @param bodyState - Body state id.
     * @param movementType - Movement type id.
     * @param pathType - Detail path type id.
     * @param patrol - Patrol path parameters.
     * @param value - Speed or distance value.
     */
    public constructor(bodyState: number, movementType: TXR_move, pathType: number, patrol: patrol, value: f32);

    /**
     * Move toward a position.
     *
     * @param bodyState - Body state id.
     * @param movementType - Movement type id.
     * @param pathType - Detail path type id.
     * @param vector - Target position.
     */
    public constructor(bodyState: number, movementType: TXR_move, pathType: number, vector: vector);

    /**
     * Move toward a position with a speed value.
     *
     * @param bodyState - Body state id.
     * @param movementType - Movement type id.
     * @param pathType - Detail path type id.
     * @param vector - Target position.
     * @param value - Speed or distance value.
     */
    public constructor(bodyState: number, movementType: TXR_move, pathType: number, vector: vector, value: f32);

    /**
     * Move toward a position with distance.
     *
     * @param vector - Target position.
     * @param value - Distance value.
     */
    public constructor(vector: vector, value: number);

    /**
     * Create a monster movement action toward a position.
     *
     * @remarks
     * Monster-only overload using `MonsterSpace::EScriptMonsterMoveAction` values exposed on `move`.
     *
     * @param moveAction - Monster movement action id.
     * @param vector - Target position.
     */
    public constructor(moveAction: TXR_move, vector: vector);

    /**
     * Create a monster movement action along a patrol path.
     *
     * @remarks
     * Monster-only overload using `MonsterSpace::EScriptMonsterMoveAction` values exposed on `move`.
     *
     * @param moveAction - Monster movement action id.
     * @param patrol - Patrol path parameters.
     */
    public constructor(moveAction: TXR_move, patrol: patrol);

    /**
     * Create a monster movement action toward an object.
     *
     * @remarks
     * Monster-only overload using `MonsterSpace::EScriptMonsterMoveAction` values exposed on `move`.
     *
     * @param moveAction - Monster movement action id.
     * @param game_object - Target object.
     */
    public constructor(moveAction: TXR_move, game_object: game_object);

    /**
     * Create a monster movement action toward a position with distance.
     *
     * @remarks
     * Monster-only overload. The distance is the stop distance from the target.
     *
     * @param moveAction - Monster movement action id.
     * @param vector - Target position.
     * @param value - Distance value.
     */
    public constructor(moveAction: TXR_move, vector: vector, value: number);

    /**
     * Create a monster movement action toward a position from a node id.
     *
     * @remarks
     * Monster-only overload. The node id lets the engine build the movement goal from a known level graph point.
     *
     * @param moveAction - Monster movement action id.
     * @param value - Node or point id.
     * @param vector - Target position.
     */
    public constructor(moveAction: TXR_move, value: number, vector: vector);

    /**
     * Create a monster movement action toward a position from a node id with distance.
     *
     * @remarks
     * Monster-only overload. The final value is the stop distance from the target.
     *
     * @param moveAction - Monster movement action id.
     * @param value - Node or point id.
     * @param vector - Target position.
     * @param value2 - Distance value.
     */
    public constructor(moveAction: TXR_move, value: number, vector: vector, value2: number);

    /**
     * Create a monster movement action along a patrol path with distance.
     *
     * @remarks
     * Monster-only overload. The distance is the stop distance from the patrol target.
     *
     * @param moveAction - Monster movement action id.
     * @param patrol - Patrol path parameters.
     * @param value - Distance value.
     */
    public constructor(moveAction: TXR_move, patrol: patrol, value: number);

    /**
     * Create a monster movement action toward an object with distance.
     *
     * @remarks
     * Monster-only overload. The distance is the stop distance from the target object.
     *
     * @param moveAction - Monster movement action id.
     * @param game_object - Target object.
     * @param value - Distance value.
     */
    public constructor(moveAction: TXR_move, game_object: game_object, value: f32);

    /**
     * Create a monster movement action toward a position with speed mode.
     *
     * @remarks
     * Monster-only overload. `speedParam` is a `MonsterSpace::EScriptMonsterSpeedParam` value.
     *
     * @param moveAction - Monster movement action id.
     * @param vector - Target position.
     * @param value - Distance value.
     * @param speedParam - Speed parameter id.
     */
    public constructor(moveAction: TXR_move, vector: vector, value: f32, speedParam: number);

    /**
     * Create a monster movement action along a patrol path with speed mode.
     *
     * @remarks
     * Monster-only overload. `speedParam` is a `MonsterSpace::EScriptMonsterSpeedParam` value.
     *
     * @param moveAction - Monster movement action id.
     * @param patrol - Patrol path parameters.
     * @param value - Distance value.
     * @param speedParam - Speed parameter id.
     */
    public constructor(moveAction: TXR_move, patrol: patrol, value: f32, speedParam: number);

    /**
     * Create a monster movement action toward an object with speed mode.
     *
     * @remarks
     * Monster-only overload. `speedParam` is a `MonsterSpace::EScriptMonsterSpeedParam` value.
     *
     * @param moveAction - Monster movement action id.
     * @param game_object - Target object.
     * @param value - Distance value.
     * @param speedParam - Speed parameter id.
     */
    public constructor(moveAction: TXR_move, game_object: game_object, value: number, speedParam: number);

    /**
     * @returns Whether the movement action is complete.
     */
    public completed(): boolean;

    /**
     * Set detail path type.
     *
     * @param pathType - Detail path type id.
     */
    public path(pathType: number): void;

    /**
     * Set movement type.
     *
     * @param movementType - Movement type id.
     */
    public move(movementType: number): void;

    /**
     * Set target position.
     *
     * @param vector - Target position.
     */
    public position(vector: vector): void;

    /**
     * Set input key action.
     *
     * @param inputKey - Input key id.
     */
    public input(inputKey: number): void;

    /**
     * Set patrol path from a native patrol path pointer.
     *
     * @source `src/xrGame/script_movement_action_script.cpp`, `move.patrol` binding.
     *
     * @remarks
     * This low-level binding expects an internal `CPatrolPath*`, not the public `patrol` parameter object. Prefer the
     * movement action constructors that accept `patrol` unless native code passes a raw patrol path pointer.
     *
     * @param patrolPath - Internal `CPatrolPath*` pointer.
     * @param path_name - Patrol path name copied into the movement action.
     */
    public patrol(patrolPath: unknown /* CPatrolPath* */, path_name: string): void;

    /**
     * Set target object.
     *
     * @param game_object - Target object.
     */
    public object(game_object: game_object): void;

    /**
     * Set body state.
     *
     * @param bodyState - Body state id.
     */
    public body(bodyState: number): void;
  }

  /**
   * @group xr_action
   */
  export type TXR_move = EnumeratedStaticsValues<typeof move>;

  /**
   * Patrol path parameters used by movement actions.
   *
   * @source `src/xrAICore/Navigation/PatrolPath/patrol_path_params_script.cpp`, `CPatrolPathParams` binding.
   * @customConstructor patrol
   * @group xr_action
   *
   * @remarks
   * The Lua-visible `patrol` class stores a patrol path name, start mode, route mode, randomization flag, and optional
   * custom point index. Movement action constructors copy those values into the native movement action.
   */
  export class patrol extends EngineBinding {
    /**
     * Engine enum value for `patrol.stop`.
     *
     * @source `src/xrAICore/Navigation/PatrolPath/patrol_path_params_script.cpp`, route stop enum.
     */
    public static readonly stop: 0;

    /**
     * Engine enum value for `patrol.start`.
     */
    public static readonly start: 0;
    /**
     * Engine enum value for `patrol.continue`.
     */
    public static readonly continue: 1;
    /**
     * Engine enum value for `patrol.nearest`.
     */
    public static readonly nearest: 2;
    /**
     * Engine enum value for `patrol.custom`.
     */
    public static readonly custom: 3;
    /**
     * Engine enum value for `patrol.next`.
     */
    public static readonly next: 4;
    /**
     * Engine enum value for `patrol.dummy`.
     */
    public static readonly dummy: -1;

    /**
     * Create patrol path parameters.
     *
     * @remarks
     * The native constructor resolves `name` through patrol path storage. Missing patrol paths can assert in debug
     * builds. Use `patrol.custom` with `customPointIndex` to start from an explicit patrol point.
     *
     * @param name - Patrol path name.
     * @param startType - Patrol start mode.
     * @param routeType - Patrol route mode.
     * @param random - Whether random point selection is enabled.
     * @param customPointIndex - Custom start point index.
     */
    public constructor(
      name?: string,
      startType?: TXR_patrol_type,
      routeType?: TXR_patrol_type,
      random?: boolean,
      customPointIndex?: u32
    );

    /**
     * @returns Number of points in the patrol path.
     */
    public count(): u32;

    /**
     * Check a patrol point flag by numeric index.
     *
     * @param value1 - Patrol point index.
     * @param value2 - Flag index.
     * @returns Whether the flag is set.
     */
    public flag(value1: u32, value2: u8): boolean;

    /**
     * Check a patrol point flag by name.
     *
     * @param value1 - Patrol point index.
     * @param value2 - Flag name.
     * @returns Whether the flag is set.
     */
    public flag(value1: u32, value2: string): boolean;

    /**
     * Get all flags for a patrol point.
     *
     * @param point_index - Patrol point index.
     * @returns Point flags.
     */
    public flags(point_index: u32): flags32;

    /**
     * Get game graph vertex id for a patrol point.
     *
     * @param value - Patrol point index.
     * @returns Game graph vertex id.
     */
    public game_vertex_id(value: u32): u16;

    /**
     * Find nearest patrol point to a position.
     *
     * @param vector - Position to test.
     * @returns Patrol point index.
     */
    public get_nearest(vector: vector): u32;

    /**
     * Find patrol point index by name.
     *
     * @param value - Patrol point name.
     * @returns Patrol point index.
     */
    public index(value: string): u32;

    /**
     * Get level vertex id for a patrol point.
     *
     * @param value - Patrol point index.
     * @returns Level vertex id.
     */
    public level_vertex_id(value: u32): u32;

    /**
     * Get patrol point name.
     *
     * @param point_index - Patrol point index.
     * @returns Point name.
     */
    public name(point_index: u32): string;

    /**
     * Get patrol point position.
     *
     * @param index - Patrol point index.
     * @returns Point position.
     */
    public point(index: u32): vector;

    /**
     * Check whether a patrol point is terminal.
     *
     * @param point_index - Patrol point index.
     * @returns Whether the point ends the route.
     */
    public terminal(point_index: u32): boolean;
  }

  /**
   * Patrol start or route enum value.
   *
   * @group xr_action
   *
   * @remarks
   * The xray binding exports patrol start and route enums on the same Lua class, so this type is a flattened union of
   * both enum groups.
   */
  export type TXR_patrol_type = EnumeratedStaticsValues<typeof patrol>;

  /**
   * Sight target snapshot.
   *
   * @source C++ class CSightParams
   * @customConstructor XR_CSightParams
   * @group xr_action
   */
  export class CSightParams {
    /**
     * Engine enum value for `CSightParams.eSightTypeDummy`.
     */
    public static readonly eSightTypeDummy: -1;
    /**
     * Engine enum value for `CSightParams.eSightTypeCurrentDirection`.
     */
    public static readonly eSightTypeCurrentDirection: 0;
    /**
     * Engine enum value for `CSightParams.eSightTypePathDirection`.
     */
    public static readonly eSightTypePathDirection: 1;
    /**
     * Engine enum value for `CSightParams.eSightTypeDirection`.
     */
    public static readonly eSightTypeDirection: 2;
    /**
     * Engine enum value for `CSightParams.eSightTypePosition`.
     */
    public static readonly eSightTypePosition: 3;
    /**
     * Engine enum value for `CSightParams.eSightTypeObject`.
     */
    public static readonly eSightTypeObject: 4;
    /**
     * Engine enum value for `CSightParams.eSightTypeCover`.
     */
    public static readonly eSightTypeCover: 5;
    /**
     * Engine enum value for `CSightParams.eSightTypeSearch`.
     */
    public static readonly eSightTypeSearch: 6;
    /**
     * Engine enum value for `CSightParams.eSightTypeLookOver`.
     */
    public static readonly eSightTypeLookOver: 7;
    /**
     * Engine enum value for `CSightParams.eSightTypeCoverLookOver`.
     */
    public static readonly eSightTypeCoverLookOver: 8;
    /**
     * Engine enum value for `CSightParams.eSightTypeFireObject`.
     */
    public static readonly eSightTypeFireObject: 9;
    /**
     * Engine enum value for `CSightParams.eSightTypeFirePosition`.
     */
    public static readonly eSightTypeFirePosition: 10;
    /**
     * Engine enum value for `CSightParams.eSightTypeAnimationDirection`.
     */
    public static readonly eSightTypeAnimationDirection: 11;

    /**
     * Object target for object-based sight modes.
     */
    public readonly m_object: game_object;

    /**
     * Active sight mode.
     */
    public readonly m_sight_type: TXR_SightType;

    /**
     * Position or direction target for vector-based sight modes.
     */
    public readonly m_vector: vector;

    /**
     * Create default sight parameters.
     */
    public constructor();
  }

  /**
   * @group xr_action
   */
  export type TXR_SightType = EnumeratedStaticsValues<typeof CSightParams>;

  /**
   * Look action for setting where an object should watch.
   *
   * @source C++ class look
   * @customConstructor look
   * @group xr_action
   *
   * @remarks
   * Look actions are consumed by AI sight managers and searchlight-like objects. Bone-target overloads require the
   * target object to have the named bone in its visual.
   */
  export class look extends EngineBinding {
    /**
     * Engine enum value for `look.cur_dir`.
     */
    public static readonly cur_dir: 0;
    /**
     * Engine enum value for `look.danger`.
     */
    public static readonly danger: 5;
    /**
     * Engine enum value for `look.direction`.
     */
    public static readonly direction: 2;
    /**
     * Engine enum value for `look.fire_point`.
     */
    public static readonly fire_point: 10;
    /**
     * Engine enum value for `look.path_dir`.
     */
    public static readonly path_dir: 1;
    /**
     * Engine enum value for `look.point`.
     */
    public static readonly point: 3;
    /**
     * Engine enum value for `look.search`.
     */
    public static readonly search: 6;

    /**
     * Create an empty look action.
     */
    public constructor();

    /**
     * Create a look action by sight type.
     *
     * @param sight_type - Sight type id.
     */
    public constructor(sight_type: TXR_SightType);

    /**
     * Look at a position or direction.
     *
     * @param sight_type - Sight type id.
     * @param vector - Target vector.
     */
    public constructor(sight_type: TXR_SightType, vector: vector);

    /**
     * Look at an object.
     *
     * @param sight_type - Sight type id.
     * @param game_object - Target object.
     */
    public constructor(sight_type: TXR_SightType, game_object: game_object);

    /**
     * Look at an object bone.
     *
     * @param sight_type - Sight type id.
     * @param game_object - Target object.
     * @param value - Bone name.
     */
    public constructor(sight_type: TXR_SightType, game_object: game_object, value: string);

    /**
     * Create a searchlight-style look action from a vector.
     *
     * @param vector - Target vector.
     * @param value1 - First angle.
     * @param value2 - Second angle.
     */
    public constructor(vector: vector, value1: f32, value2: f32);

    /**
     * Create a searchlight-style look action from an object.
     *
     * @param game_object - Target object.
     * @param value1 - First angle.
     * @param value2 - Second angle.
     */
    public constructor(game_object: game_object, value1: f32, value2: f32);

    /**
     * @returns Whether the look action is complete.
     */
    public completed(): boolean;

    /**
     * Set sight type.
     *
     * @param sight_type - Sight type id.
     */
    public type(sight_type: TXR_SightType): void;

    /**
     * Set watched object.
     *
     * @param game_object - Target object.
     */
    public object(game_object: game_object): void;

    /**
     * Set watched bone.
     *
     * @param bone_id - Bone name.
     */
    public bone(bone_id: string): void;

    /**
     * Set watched direction.
     *
     * @param vector - Direction vector.
     */
    public direct(vector: Readonly<vector>): void;
  }

  /**
   * @group xr_action
   */
  export type TXR_look = EnumeratedStaticsValues<typeof look>;

  /**
   * Animation action.
   *
   * @source C++ class anim
   * @customConstructor anim
   * @group xr_action
   *
   * @remarks
   * String animation overloads play a named script animation. Numeric one-argument overloads set an AI mental state.
   * Numeric two-argument overloads are monster animation actions.
   */
  export class anim extends EngineBinding {
    // Mental state:
    /**
     * Engine enum value for `anim.danger`.
     */
    public static readonly danger: 0;
    /**
     * Engine enum value for `anim.free`.
     */
    public static readonly free: 1;
    /**
     * Engine enum value for `anim.panic`.
     */
    public static readonly panic: 2;

    // Animation state:
    /**
     * Engine enum value for `anim.stand_idle`.
     */
    public static readonly stand_idle: 0;
    /**
     * Engine enum value for `anim.capture_prepare`.
     */
    public static readonly capture_prepare: 1;
    /**
     * Engine enum value for `anim.sit_idle`.
     */
    public static readonly sit_idle: 2;
    /**
     * Engine enum value for `anim.lie_idle`.
     */
    public static readonly lie_idle: 3;
    /**
     * Engine enum value for `anim.eat`.
     */
    public static readonly eat: 4;
    /**
     * Engine enum value for `anim.sleep`.
     */
    public static readonly sleep: 5;
    /**
     * Engine enum value for `anim.rest`.
     */
    public static readonly rest: 6;
    /**
     * Engine enum value for `anim.attack`.
     */
    public static readonly attack: 7;
    /**
     * Engine enum value for `anim.look_around`.
     */
    public static readonly look_around: 8;
    /**
     * Engine enum value for `anim.turn`.
     */
    public static readonly turn: 9;

    /**
     * Create an empty animation action.
     */
    public constructor();

    /**
     * Play an animation by name.
     *
     * @param value - Animation name.
     */
    public constructor(value: string);

    /**
     * Play an animation by name.
     *
     * @param value1 - Animation name.
     * @param value2 - Whether the animation should loop.
     */
    public constructor(value1: string, value2: boolean);

    /**
     * Set AI mental state.
     *
     * @param state - Mental state id.
     */
    public constructor(state: number); /* Enum MonsterSpace::EMentalState */

    /**
     * Set monster animation action and extra value.
     *
     * @remarks
     * Monster-only overload using `MonsterSpace::EScriptMonsterAnimAction` values exposed on `anim`.
     *
     * @param state - Monster animation action id.
     * @param value - Extra action value.
     */
    public constructor(state: number /* Enum MonsterSpace::EScriptMonsterAnimAction */, value: i32);

    /**
     * @returns Whether the animation action is complete.
     */
    public completed(): boolean;

    /**
     * Set mental state.
     *
     * @param state - Mental state id.
     */
    public type(state: number /* Enum MonsterSpace::EMentalState */): void;

    /**
     * Set animation name.
     *
     * @param value - Animation name.
     */
    public anim(value: string): void;
  }

  /**
   * @group xr_action
   */
  export type TXR_animation_key = EnumeratedStaticsKeys<typeof anim>;

  /**
   * @group xr_action
   */
  export type TXR_animation = EnumeratedStaticsValues<typeof anim>;

  /**
   * Sound action for scripted AI behavior.
   *
   * @source C++ class sound
   * @customConstructor sound
   * @group xr_action
   *
   * @remarks
   * String and `sound_object` overloads play regular script sounds. Numeric overloads use monster sound categories.
   * The head-animation overload is intended for trader-style talking animations.
   */
  export class sound extends EngineBinding {
    /**
     * Engine enum value for `sound.attack`.
     */
    public static readonly attack: 3;
    /**
     * Engine enum value for `sound.attack_hit`.
     */
    public static readonly attack_hit: 4;
    /**
     * Engine enum value for `sound.die`.
     */
    public static readonly die: 7;
    /**
     * Engine enum value for `sound.eat`.
     */
    public static readonly eat: 2;
    /**
     * Engine enum value for `sound.idle`.
     */
    public static readonly idle: 1;
    /**
     * Engine enum value for `sound.panic`.
     */
    public static readonly panic: 11;
    /**
     * Engine enum value for `sound.steal`.
     */
    public static readonly steal: 10;
    /**
     * Engine enum value for `sound.take_damage`.
     */
    public static readonly take_damage: 5;
    /**
     * Engine enum value for `sound.threaten`.
     */
    public static readonly threaten: 9;

    /**
     * Create an empty sound action.
     */
    public constructor();

    /**
     * Play a sound by prefix and name.
     *
     * @param value1 - Sound prefix or collection.
     * @param value2 - Sound name.
     */
    public constructor(value1: string, value2: string);

    /**
     * Play a sound at a position.
     *
     * @param value1 - Sound prefix or collection.
     * @param value2 - Sound name.
     * @param vector - Position.
     */
    public constructor(value1: string, value2: string, vector: vector);

    /**
     * Play a sound at a position with angles.
     *
     * @param value1 - Sound prefix or collection.
     * @param value2 - Sound name.
     * @param vector - Position.
     * @param vector2 - Angles.
     */
    public constructor(value1: string, value2: string, vector: vector, vector2: vector);

    /**
     * Play a sound at a position with angles and loop flag.
     *
     * @param value1 - Sound prefix or collection.
     * @param value2 - Sound name.
     * @param vector - Position.
     * @param vector2 - Angles.
     * @param value3 - Whether playback should loop.
     */
    public constructor(value1: string, value2: string, vector: vector, vector2: vector, value3: boolean);

    /**
     * Play a sound by name at a position.
     *
     * @param value1 - Sound name.
     * @param vector - Position.
     */
    public constructor(value1: string, vector: vector);

    /**
     * Play a sound by name at a position with angles.
     *
     * @param value1 - Sound name.
     * @param vector - Position.
     * @param vector2 - Angles.
     */
    public constructor(value1: string, vector: vector, vector2: vector);

    /**
     * Play a sound by name at a position with angles and loop flag.
     *
     * @param value1 - Sound name.
     * @param vector - Position.
     * @param vector2 - Angles.
     * @param value3 - Whether playback should loop.
     */
    public constructor(value1: string, vector: vector, vector2: vector, value3: boolean);

    /**
     * Play a `sound_object` with a bone at a position.
     *
     * @param sound_object - Sound object.
     * @param value1 - Bone name.
     * @param vector - Position.
     */
    public constructor(sound_object: sound_object, value1: string, vector: vector);

    /**
     * Play a `sound_object` with a bone, position, and angles.
     *
     * @param sound_object - Sound object.
     * @param value1 - Bone name.
     * @param vector - Position.
     * @param vector2 - Angles.
     */
    public constructor(sound_object: sound_object, value1: string, vector: vector, vector2: vector);

    /**
     * Play a `sound_object` with a bone, position, angles, and loop flag.
     *
     * @param sound_object - Sound object.
     * @param value1 - Bone name.
     * @param vector - Position.
     * @param vector2 - Angles.
     * @param value - Whether playback should loop.
     */
    public constructor(sound_object: sound_object, value1: string, vector: vector, vector2: vector, value: boolean);

    /**
     * Play a `sound_object` at a position.
     *
     * @param sound_object - Sound object.
     * @param vector1 - Position.
     */
    public constructor(sound_object: sound_object, vector1: vector);

    /**
     * Play a `sound_object` at a position with angles.
     *
     * @param sound_object - Sound object.
     * @param vector1 - Position.
     * @param vector2 - Angles.
     */
    public constructor(sound_object: sound_object, vector1: vector, vector2: vector);

    /**
     * Play a `sound_object` at a position with angles and loop flag.
     *
     * @param sound_object - Sound object.
     * @param vector1 - Position.
     * @param vector2 - Angles.
     * @param value - Whether playback should loop.
     */
    public constructor(sound_object: sound_object, vector1: vector, vector2: vector, value: boolean);

    /**
     * Play a monster sound by type.
     *
     * @remarks
     * Monster-only overload using `MonsterSound::EType` values exposed on `sound`.
     *
     * @param type - Monster sound type id.
     */
    public constructor(type: TXR_sound_type); /* MonsterSound::EType */

    /**
     * Play a monster sound by type with extra value.
     *
     * @remarks
     * Monster-only overload. The value is the engine delay passed to the monster sound action.
     *
     * @param type - Monster sound type id.
     * @param value - Extra sound value.
     */
    public constructor(type: TXR_sound_type /* Enum MonsterSound::EType*/, value: number);

    /**
     * Play a trader sound with a head animation.
     *
     * @remarks
     * Trader-specific overload. The head animation is one of `MonsterSpace.head_anim_*`.
     *
     * @param value1 - Sound prefix or collection.
     * @param value2 - Sound name.
     * @param type - Monster head animation type.
     */
    public constructor(value1: string, value2: string, type: unknown); /* Enum MonsterSpace::EMonsterHeadAnimType */

    /**
     * Set sound by name.
     *
     * @param value - Sound name.
     */
    public set_sound(value: string): void;

    /**
     * Set sound object.
     *
     * @param sound_object - Sound object.
     */
    public set_sound(sound_object: sound_object): void;

    /**
     * Set sound position.
     *
     * @param vector - Position.
     */
    public set_position(vector: vector): void;

    /**
     * Set sound bone.
     *
     * @param value - Bone name.
     */
    public set_bone(value: string): void;

    /**
     * Set sound angles.
     *
     * @param vector - Angles.
     */
    public set_angles(vector: vector): void;

    /**
     * Set sound type.
     *
     * @param type - Sound type id.
     */
    public set_sound_type(type: number /* ESoundTypes */): void;

    /**
     * @returns Whether sound playback is complete.
     */
    public completed(): boolean;
  }

  /**
   * @group xr_action
   */
  export type TXR_sound_key = EnumeratedStaticsKeys<typeof sound>;

  /**
   * @group xr_action
   */
  export type TXR_sound_type = EnumeratedStaticsValues<typeof sound>;

  /**
   * Completion condition for a composed entity action.
   *
   * @source C++ class cond
   * @customConstructor cond
   * @group xr_action
   *
   * @remarks
   * Conditions choose which sub-action completions should finish the composed `entity_action`. Combine flags when the
   * action should wait for several parts.
   */
  export class cond extends EngineBinding {
    /**
     * Engine enum value for `cond.move_end`.
     */
    public static readonly move_end: 1;
    /**
     * Engine enum value for `cond.look_end`.
     */
    public static readonly look_end: 2;
    /**
     * Engine enum value for `cond.anim_end`.
     */
    public static readonly anim_end: 4;
    /**
     * Engine enum value for `cond.sound_end`.
     */
    public static readonly sound_end: 8;
    /**
     * Engine enum value for `cond.object_end`.
     */
    public static readonly object_end: 32;
    /**
     * Engine enum value for `cond.time_end`.
     */
    public static readonly time_end: 64;
    /**
     * Engine enum value for `cond.act_end`.
     */
    public static readonly act_end: 128;

    /**
     * Create an empty completion condition.
     */
    public constructor();

    /**
     * Create a completion condition from flags.
     *
     * @param value - Condition flags.
     */
    public constructor(value: u32);

    /**
     * Create a completion condition from flags and a time limit.
     *
     * @param value1 - Condition flags.
     * @param value2 - Time limit.
     */
    public constructor(value1: u32, value2: f64);
  }

  /**
   * @group xr_action
   */
  export type TXR_cond = EnumeratedStaticsValues<typeof cond>;

  /**
   * Global monster action.
   *
   * @source C++ class act
   * @customConstructor act
   * @group xr_action
   *
   * @remarks
   * Monster global actions are consumed by custom monster controllers. They are not a generic command system for
   * stalkers, items, or vehicles.
   */
  export class act {
    /**
     * Engine enum value for `act.attack`.
     */
    public static readonly attack: 2;
    /**
     * Engine enum value for `act.eat`.
     */
    public static readonly eat: 1;
    /**
     * Engine enum value for `act.panic`.
     */
    public static readonly panic: 3;
    /**
     * Engine enum value for `act.rest`.
     */
    public static readonly rest: 0;

    /**
     * Create an empty global monster action.
     */
    public constructor();

    /**
     * Create a global monster action.
     *
     * @param action - Global monster action id.
     */
    public constructor(action: number);

    /**
     * Create a global monster action with a target object.
     *
     * @param action - Global monster action id.
     * @param game_object - Target object.
     */
    public constructor(action: number, game_object: game_object);
  }

  /**
   * Particle action transform parameters.
   *
   * @source C++ class particle_params
   * @customConstructor particle_params
   * @group xr_action
   */
  export class particle_params {
    /**
     * Create empty particle parameters.
     */
    public constructor();

    /**
     * Create particle parameters from vectors.
     *
     * @param first - Position vector.
     * @param second - Angle vector.
     * @param third - Velocity vector.
     */
    public constructor(first?: vector, second?: vector, third?: vector);
  }

  /**
   * Particle playback action.
   *
   * @source C++ class particle
   * @customConstructor particle
   * @group xr_action
   *
   * @remarks
   * Bone-attached particles require the controlled object visual to contain the requested bone. Position-only
   * particles use world coordinates.
   */
  export class particle extends EngineBinding {
    /**
     * Create a particle action.
     *
     * @param particle_to_run - Particle effect name.
     * @param particle_params - Optional transform parameters.
     * @param auto_remove - Whether the particle should be removed after playback.
     */
    public constructor(particle_to_run: string, particle_params?: particle_params, auto_remove?: boolean);

    /**
     * Create a particle action attached to a bone.
     *
     * @param particle_to_run - Particle effect name.
     * @param bone_name - Bone name.
     * @param particle_params - Transform parameters.
     * @param auto_remove - Whether the particle should be removed after playback.
     */
    public constructor(
      particle_to_run: string,
      bone_name: string,
      particle_params: particle_params,
      auto_remove: boolean
    );

    /**
     * @returns Whether particle playback is complete.
     */
    public completed(): boolean;

    /**
     * Set particle angles.
     *
     * @param vector - Angles.
     */
    public set_angles(vector: vector): void;

    /**
     * Set attached bone.
     *
     * @param bone_id - Bone name.
     */
    public set_bone(bone_id: string): void;

    /**
     * Set particle effect and auto-remove flag.
     *
     * @param value1 - Particle effect name.
     * @param value2 - Whether the particle should be removed after playback.
     */
    public set_particle(value1: string, value2: boolean): void;

    /**
     * Set particle position.
     *
     * @param vector - Position.
     */
    public set_position(vector: vector): void;

    /**
     * Set particle velocity.
     *
     * @param vector - Velocity.
     */
    public set_velocity(vector: vector): void;
  }
}

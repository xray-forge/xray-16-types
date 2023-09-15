declare module "xray16" {
  /**
   * Generic container object for GOAP world properties.
   *
   * @source C++ class world_property
   * @customConstructor world_property
   * @group xr_goap
   */
  export class world_property extends EngineBinding {
    /**
     * Default constructor to describe a pair of identifier and value.
     *
     * @param id - identifier of unique world property
     * @param enabled - value of property state
     */
    public constructor(id: u32, enabled: boolean);

    /**
     * @returns value of current world property
     */
    public value(): boolean;

    /**
     * @returns condition identifier of current world property
     */
    public condition(): u32;
  }

  /**
   * World state describing whole world state in action planning.
   *
   * Overrides operators: `<`, `==`
   *
   * @source C++ class world_state
   * @customConstructor world_state
   * @group xr_goap
   */
  export class world_state extends EngineBinding {
    /**
     * Default constructor.
     */
    public constructor();

    /**
     * Copy constructor.
     *
     * @param another_state - target world state to copy
     */
    public constructor(another_state: world_state);

    /**
     * Set property for world state.
     *
     * @param property - target property to add in world state
     */
    public add_property(property: world_property): void;

    /**
     * Clear all properties in the state.
     */
    public clear(): void;

    /**
     * Check if provided state is subset of current one.
     *
     * @param state - target state to check
     * @returns whether current world state includes provided state
     */
    public includes(state: world_state): boolean;

    /**
     * Get world property by id.
     *
     * @param id - numeric if of the required property
     * @returns property id/state based on provided id
     */
    public property(id: u32): world_property;

    /**
     * Remove world property from current world state.
     *
     * @param id - identifier of the property to remove
     */
    public remove_property(id: u32): void;
  }

  /**
   * Storage of object evaluators cached state for handling of in-game logic.
   * Container for actions.
   *
   * @source C++ class property_storage
   * @customConstructor property_storage
   * @group xr_goap
   */
  export class property_storage extends EngineBinding {
    /**
     * Get property evaluator value by `id`.
     *
     * @throws if property is not declared in storage
     *
     * @param id - unique identifier of the world property
     * @returns current value for provided `id`
     */
    public property(id: u32): boolean;

    /**
     * Set property value in the storage.
     *
     * @param id - unique identifier of the world property
     * @param value - value for provided `id`
     */
    public set_property(id: u32, value: boolean): void;
  }

  /**
   * Class implementation of world properties evaluators.
   * Generic handler to calculate current state of bound world property `id`.
   *
   * @source C++ class property_evaluator
   * @customConstructor property_evaluator
   * @group xr_goap
   */
  export class property_evaluator extends EngineBinding {
    /**
     * Linked game object to work with.
     */
    public readonly object: game_object;

    /**
     * Container reference with state of action preconditions.
     */
    public readonly storage: property_storage;

    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @param object - target game object to work with, `null` is OK since correct object will be injected on setup
     */
    public constructor(object: game_object | null);

    /**
     * @param object - target game object to work with, `null` is OK since correct object will be injected on setup
     * @param name - name of the evaluator, used for debug purposes mainly
     */
    public constructor(object: game_object | null, name: string);

    /**
     * Handle setup of the evaluator and binding to a specific object.
     *
     * @param object - target client object to work with
     * @param storage - action instance storage with preconditions and state
     */
    public setup(object: game_object, storage: property_storage): void;

    /**
     * Main evaluator lifecycle method.
     * Called every time to get world property up-to-date state.
     */
    public evaluate(): boolean;
  }

  /**
   * Class implementation of world properties evaluators.
   * Static handler to return pre-defined value for specific world property `id`.
   *
   * @source C++ class property_evaluator_const : property_evaluator
   * @customConstructor property_evaluator_const
   * @group xr_goap
   */
  export class property_evaluator_const extends property_evaluator {
    /**
     * @param value - constant value for evaluation
     */
    public constructor(value: boolean);
  }

  /**
   * Abstract class for implementation of GOAP planner actions.
   *
   * @source C++ class action_base
   * @customConstructor action_base
   * @group xr_goap
   */
  export abstract class action_base extends EngineBinding {
    /**
     * Game object that is handled by current action instance.
     */
    public readonly object: game_object;

    /**
     * Container reference with state of action preconditions.
     */
    public readonly storage: property_storage;

    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @param object - target game object to work with, `null` is OK since correct object will be injected on setup
     */
    public constructor(object?: game_object | null);

    /**
     * @param object - target game object to work with, `null` is OK since correct object will be injected on setup
     * @param name - name of the action, used for debug purposes mainly
     */
    public constructor(object: game_object | null, name: string);

    /**
     * Handle setup of the action and binding to a specific object.
     *
     * @param object - target client object to work with
     * @param storage - action instance storage with preconditions and state
     */
    public setup(object: game_object, storage: property_storage): void;

    /**
     * Lifecycle method called once on action execution start.
     * Means that lifecycle of the action begun.
     */
    public initialize(): void;

    /**
     * Lifecycle method.
     * Execution tick of the action, called from object logics update cycle when current action is active.
     */
    public execute(): void;

    /**
     * Lifecycle method called once on action execution stop.
     * Means that action is finished / preconditions are not met anymore.
     */
    public finalize(): void;

    /**
     * Set weight of current action execution.
     *
     * @param weight - weight value to express how prioritized action is
     */
    public set_weight(weight: u16): void;

    /**
     * Add action effect.
     * Describes what target world state is expected to be if action is completed.
     *
     * @param property - world state property describing a pair of evaluator ID and value
     */
    public add_effect(property: world_property): void;

    /**
     * Remove action effect.
     * Action will be not considered as property changing for `id` anymore
     *
     * @param id - world state property id
     */
    public remove_effect(id: u32): void;

    /**
     * Add action execution precondition.
     * When building logics graph, action will be considered blocked by some preconditions.
     *
     * @param property - world state property describing a pair of evaluator ID and value
     */
    public add_precondition(property: world_property): void;

    /**
     * Remove precondition for action.
     * When building logics graph, action will not be considered blocked by evaluator `id` states.
     *
     * @param id - world state property id
     */
    public remove_precondition(id: u32): void;

    /**
     * Debug method.
     * With mixed / debug build allows investigation of evaluators and actions matches.
     * Helps to debug custom actions and actions pre-conditions with state printing in log files.
     *
     * Note: Available only in mixed / debug engine builds, not for direct usage from lua.
     *
     * @param prefix - string prefix to display current action state in logs
     */
    public show(prefix?: string): void;
  }

  /**
   * @source C++ class action_planner
   * @customConstructor action_planner
   * @group xr_goap
   */
  export class action_planner extends EngineBinding {
    /**
     * Game object that is handled by current planner instance.
     */
    public readonly object: game_object;

    /**
     * Container reference with state of planner preconditions.
     */
    public readonly storage: property_storage;

    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @returns whether object action planner is already initialized
     */
    public initialized(): boolean;

    /**
     * @returns whether state of current planner is actual
     */
    public actual(): boolean;

    /**
     * Setup planner for game object.
     *
     * @param object - client game object to setup planner for
     */
    public setup(object: game_object): void;

    /**
     * Clear state of current action planner.
     */
    public clear(): void;

    /**
     * Lifecycle method to handle generic game loop updates.
     */
    public update(): void;

    /**
     * Add generic action by `id` for planner execution.
     *
     * @param id - unique identifier of new action
     * @param action - action implementation containing preconditions, logics, effects and other meta infos
     */
    public add_action(id: u32, action: action_base): void;

    /**
     * Remove action by unique `id`.
     *
     * @param id - unique identifier of the action to remove
     */
    public remove_action(id: u32): void;

    /**
     * Get action instance by unique `id`.
     *
     * @param id - unique identifier of the action to get
     */
    public action(id: u32): action_base;

    /**
     * Get currently active action being executed.
     *
     * @returns current action instance reference
     */
    public current_action(): action_base;

    /**
     * Get currently active action identifier.
     *
     * @returns unique identifier of current action
     */
    public current_action_id(): u32;

    /**
     * Set target world state to try to reach with all the graph logics.
     * All graphs will be built from current state to goal world state with the shortest possible path.
     *
     * @param state - target world state to reach with planner
     */
    public set_goal_world_state(state: world_state): void;

    /**
     * Add evaluator instance for current action planner.
     *
     * @param id - unique identifier of the evaluator
     * @param evaluator - instance of evaluator linked to the `id`
     */
    public add_evaluator(id: u32, evaluator: property_evaluator): void;

    /**
     * Return evaluator instance for current action planner.
     *
     * @param id - unique identifier of the evaluator for removal
     */
    public remove_evaluator(id: u32): void;

    /**
     * Get evaluator instance by `id`.
     *
     * @param id - unique identifier of the evaluator to get
     */
    public evaluator(id: u32): property_evaluator;

    /**
     * Debug method.
     * With mixed / debug build allows investigation of evaluators and actions matches.
     * Helps to debug custom actions and actions pre-conditions with state printing in log files.
     *
     * Note: Available only in mixed / debug engine builds, not for direct usage from lua.
     *
     * @param prefix - string prefix to display current action state in logs
     */
    public show(prefix: string): void;
  }

  /**
   * GOAP action class implementing both action base and action planner.
   * Captures execution as action and plans its internal logic with separate logics graph.
   *
   * Examples: combat planner, anomaly planner, items looting planner, alife planner, state planner
   *
   * @source C++ class planner_action : action_planner,action_base
   * @customConstructor planner_action
   * @group xr_goap
   */
  export class planner_action extends action_planner {
    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @param object - target game object to work with, `null` is OK since correct object will be injected on setup
     */
    public constructor(object?: game_object | null);

    /**
     * @param object - target game object to work with, `null` is OK since correct object will be injected on setup
     * @param name - name of the action, used for debug purposes mainly
     */
    public constructor(object: game_object | null, name: string);

    /**
     * Lifecycle method called once on action execution start.
     * Means that lifecycle of the action begun.
     */
    public initialize(): void;

    /**
     * Lifecycle method called once on action execution stop.
     * Means that action is finished / preconditions are not met anymore.
     */
    public finalize(): void;

    /**
     * Lifecycle method.
     * Execution tick of the action, called from object logics update cycle when current action is active.
     */
    public execute(): void;

    /**
     * Add action effect.
     * Describes what target world state is expected to be if action is completed.
     *
     * @param property - world state property describing a pair of evaluator ID and value
     */
    public add_effect(property: world_property): unknown;

    /**
     * Remove action effect.
     * Action will be not considered as property changing for `id` anymore
     *
     * @param id - world state property id
     */
    public remove_effect(id: u32): void;

    /**
     * Add action execution precondition.
     * When building logics graph, action will be considered blocked by some preconditions.
     *
     * @param property - world state property describing a pair of evaluator ID and value
     */
    public add_precondition(property: world_property): void;

    /**
     * Remove precondition for action.
     * When building logics graph, action will not be considered blocked by evaluator `id` states.
     *
     * @param id - world state property id
     */
    public remove_precondition(id: u32): void;

    /**
     * Set weight of planner action switch.
     *
     * @param weight - weight value to express how prioritized action is
     */
    public set_weight(weight: u32): void;

    /**
     * Comparator to check weight of switching one state to another.
     *
     * @param first - first state
     * @param second - second state
     */
    public weight(first: world_state, second: world_state): u16;
  }

  /**
   * @group xr_global_declaration
   */
  export function cast_planner(this: void, base_action: action_base): action_planner;
}

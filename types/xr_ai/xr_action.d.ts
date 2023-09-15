declare module "xray16" {
  /**
   * @source C++ class entity_action
   * @customConstructor entity_action
   * @group xr_ai
   */
  export class entity_action extends EngineBinding {
    public constructor();
    public constructor(entity: entity_action);

    public set_action(move: move): void;
    public set_action(look: look): void;
    public set_action(anim: anim): void;
    public set_action(sound: sound): void;
    public set_action(particle: particle): void;
    public set_action(objec: XR_object): void;
    public set_action(cond: cond): void;

    public move(): boolean;
    public particle(): boolean;
    public completed(): boolean;
    public object(): boolean;
    public all(): boolean;
    public time(): boolean;
    public look(): boolean;
    public sound(): boolean;
    public anim(): boolean;
  }

  /**
   * @group xr_ai
   */
  export type TXR_entity_action = move | look | anim | sound | particle | XR_object | cond;

  /**
   * @source C++ class move
   * @customConstructor move
   * @group xr_ai
   */
  export class move extends EngineBinding {
    // todo: All enums are in one static, probably should declare few parent interfaces / classes with enums
    public static readonly crouch: 0;

    public static readonly back: 4;
    public static readonly criteria: 2;

    public static readonly curve: 0;
    public static readonly curve_criteria: 2;

    public static readonly default: 0;
    public static readonly dodge: 1;
    public static readonly down: 64;
    public static readonly drag: 3;
    public static readonly force: 1;
    public static readonly fwd: 2;
    public static readonly handbrake: 128;
    public static readonly jump: 4;
    public static readonly left: 8;

    public static readonly line: 0;
    public static readonly none: 1;
    public static readonly off: 512;
    public static readonly on: 256;
    public static readonly right: 16;

    /**
     * Fast run movement type, not sprint but generic fast movement.
     */
    public static readonly run: 1;
    public static readonly run_fwd: 2;
    public static readonly run_with_leader: 7;
    public static readonly stand: 2;
    public static readonly standing: 1;
    public static readonly steal: 5;
    public static readonly up: 32;
    /**
     * Normal walk movement type, generic movement type used in most cases.
     */
    public static readonly walk: 0;

    public static readonly walk_fwd: 0;
    public static readonly walk_bkwd: 1;
    public static readonly walk_with_leader: 6;

    public constructor();
    public constructor(action: unknown);
    public constructor(action: unknown, value: number);
    public constructor(bodyState: number, movementType: TXR_move, pathType: unknown, game_object: game_object);
    public constructor(
      bodyState: number,
      movementType: TXR_move,
      pathType: unknown,
      game_object: game_object,
      value: f32
    );
    public constructor(bodyState: number, movementType: TXR_move, pathType: unknown, patrol: patrol);
    public constructor(bodyState: number, movementType: TXR_move, pathType: unknown, patrol: patrol, value: f32);
    public constructor(bodyState: number, movementType: TXR_move, pathType: unknown, vector: vector);
    public constructor(bodyState: number, movementType: TXR_move, pathType: unknown, vector: vector, value: f32);
    public constructor(vector: vector, value: number);
    public constructor(moveAction: TXR_move, vector: vector);
    public constructor(moveAction: TXR_move, patrol: patrol);
    public constructor(moveAction: TXR_move, game_object: game_object);
    public constructor(moveAction: TXR_move, vector: vector, value: number);
    public constructor(moveAction: TXR_move, value: number, vector: vector);
    public constructor(moveAction: TXR_move, value: number, vector: vector, value2: number);
    public constructor(moveAction: TXR_move, patrol: patrol, value: number);
    public constructor(moveAction: TXR_move, game_object: game_object, value: f32);
    public constructor(moveAction: TXR_move, vector: vector, value: f32, speedParam: number);
    public constructor(moveAction: TXR_move, patrol: patrol, value: f32, speedParam: number);
    public constructor(moveAction: TXR_move, game_object: game_object, value: number, speedParam: unknown);

    public completed(): boolean;
    public path(EDetailPathType: number): void;
    public move(EMovementType: number): void;
    public position(vector: vector): void;
    public input(EInputKeys: number): void;
    public patrol(patrolPath: unknown, shared_str: string): void;
    public object(game_object: game_object): void;
    public body(EBodyState: number): void;
  }

  /**
   * @group xr_ai
   */
  export type TXR_move = EnumeratedStaticsValues<typeof move>;

  /**
   * @source C++ class patrol
   * @customConstructor patrol
   * @group xr_ai
   */
  export class patrol extends EngineBinding {
    // EPatrolRouteType:
    public static readonly stop: 0;
    // public static readonly stop: 1;

    // EPatrolStartType:
    public static readonly start: 0;
    public static readonly continue: 1;
    public static readonly nearest: 2;
    public static readonly custom: 3;
    public static readonly next: 4;
    public static readonly dummy: -1;

    public constructor(name: string);
    public constructor(name: string);
    public constructor(name: string, startType: TXR_patrol_type);
    public constructor(name: string, startType: TXR_patrol_type, routeType: TXR_patrol_type);
    public constructor(name: string, startType: TXR_patrol_type, routeType: TXR_patrol_type, bool: boolean);
    public constructor(name: string, startType: TXR_patrol_type, routeType: TXR_patrol_type, bool: boolean, int: u32);

    public count(): u32;
    public flag(value1: u32, value2: u8): boolean;
    public flag(value1: u32, value2: string): boolean;
    public flags(point_index: u32): flags32;
    public game_vertex_id(value: u32): u16;
    public get_nearest(vector: vector): u32;
    public index(value: string): u32;
    public level_vertex_id(value: u32): u32;
    public name(point_index: u32): string;
    public point(index: u32): vector;
    public terminal(point_index: u32): boolean;
  }

  /**
   * @group xr_ai
   */
  export type TXR_patrol_type = EnumeratedStaticsValues<typeof patrol>;

  /**
   * @source C++ class look
   * @customConstructor look
   * @group xr_ai
   */
  export class look extends EngineBinding {
    public static readonly cur_dir: 0;
    public static readonly danger: 5;
    public static readonly direction: 2;
    public static readonly fire_point: 10;
    public static readonly path_dir: 1;
    public static readonly point: 3;
    public static readonly search: 6;

    public constructor();
    public constructor(sight_type: TXR_SightType);
    public constructor(sight_type: TXR_SightType, vector: vector);
    public constructor(sight_type: TXR_SightType, game_object: game_object);
    public constructor(sight_type: TXR_SightType, game_object: game_object, value: string);
    public constructor(vector: vector, value1: f32, value2: f32);
    public constructor(game_object: game_object, value1: f32, value2: f32);

    public completed(): boolean;
    public type(sight_type: TXR_SightType): void;
    public object(game_object: game_object): void;
    public bone(bode_id: string): void;
    public direct(vector: Readonly<vector>): void;
  }

  /**
   * @group xr_ai
   */
  export type TXR_look = EnumeratedStaticsValues<typeof look>;

  /**
   * @source C++ class anim
   * @customConstructor anim
   * @group xr_ai
   */
  export class anim extends EngineBinding {
    // Mental state:
    public static readonly danger: 0;
    public static readonly free: 1;
    public static readonly panic: 2;

    // Animation state:
    public static readonly stand_idle: 0;
    public static readonly capture_prepare: 1;
    public static readonly sit_idle: 2;
    public static readonly lie_idle: 3;
    public static readonly eat: 4;
    public static readonly sleep: 5;
    public static readonly rest: 6;
    public static readonly attack: 7;
    public static readonly look_around: 8;
    public static readonly turn: 9;

    public constructor();
    public constructor(value: string);
    public constructor(value1: string, value2: boolean);
    public constructor(state: number /* enum MonsterSpace::EMentalState */);
    public constructor(state: number /* enum MonsterSpace::EMentalState */, value: i32);

    public completed(): boolean;
    public type(state: number /* enum MonsterSpace::EMentalState */): void;
    public anim(value: string): void;
  }

  /**
   * @group xr_ai
   */
  export type TXR_animation_key = EnumeratedStaticsKeys<typeof anim>;

  /**
   * @group xr_ai
   */
  export type TXR_animation = EnumeratedStaticsValues<typeof anim>;

  /**
   * @source C++ class sound
   * @customConstructor sound
   * @group xr_ai
   */
  export class sound extends EngineBinding {
    public static readonly attack: 3;
    public static readonly attack_hit: 4;
    public static readonly die: 7;
    public static readonly eat: 2;
    public static readonly idle: 1;
    public static readonly panic: 11;
    public static readonly steal: 10;
    public static readonly take_damage: 5;
    public static readonly threaten: 9;

    public constructor();
    public constructor(value1: string, value2: string);
    public constructor(value1: string, value2: string, vector: vector);
    public constructor(value1: string, value2: string, vector: vector, vector2: vector);
    public constructor(value1: string, value2: string, vector: vector, vector2: vector, value3: boolean);
    public constructor(value1: string, vector: vector);
    public constructor(value1: string, vector: vector, vector2: vector);
    public constructor(value1: string, vector: vector, vector2: vector, value3: boolean);
    public constructor(sound_object: sound_object, value1: string, vector: vector);
    public constructor(sound_object: sound_object, value1: string, vector: vector, vector2: vector);
    public constructor(sound_object: sound_object, value1: string, vector: vector, vector2: vector, value: boolean);
    public constructor(sound_object: sound_object, vector1: vector);
    public constructor(sound_object: sound_object, vector1: vector, vector2: vector);
    public constructor(sound_object: sound_object, vector1: vector, vector2: vector, value: boolean);
    public constructor(type: unknown /* MonsterSound::EType */);
    public constructor(type: unknown /* enum MonsterSound::EType*/, value: number);
    public constructor(value1: string, value2: string, type: unknown /* enum MonsterSpace::EMonsterHeadAnimType */);

    public set_sound(value: string): void;
    public set_sound(sound_object: sound_object): void;
    public set_position(vector: vector): void;
    public set_bone(value: string): void;
    public set_angles(vector: vector): void;
    public set_sound_type(type: unknown /* ESoundTypes */): void;
    public completed(): boolean;
  }

  /**
   * @group xr_ai
   */
  export type TXR_sound_key = EnumeratedStaticsKeys<typeof sound>;

  /**
   * @group xr_ai
   */
  export type TXR_sound_type = EnumeratedStaticsValues<typeof sound>;

  /**
   * @source C++ class cond
   * @customConstructor cond
   * @group xr_ai
   */
  export class cond extends EngineBinding {
    public static readonly move_end: 1;
    public static readonly look_end: 2;
    public static readonly anim_end: 4;
    public static readonly sound_end: 8;
    public static readonly object_end: 32;
    public static readonly time_end: 64;
    public static readonly act_end: 128;

    public constructor();
    public constructor(value: u32);
    public constructor(value1: u32, value2: f64);
  }

  /**
   * @group xr_ai
   */
  export type TXR_cond = EnumeratedStaticsValues<typeof cond>;
}

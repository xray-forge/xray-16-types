import {
  type CPatrolPath,
  type game_object,
  type move,
  type TXR_body_state,
  type TXR_detail_path_type,
  type TXR_movement_type,
  type vector,
} from "xray16";

/**
 * Mock move actions class.
 */
export class MockMove implements move {
  public static create(...args: Array<unknown>): MockMove {
    return new MockMove(...args);
  }

  public static mock(...args: Array<unknown>): move {
    return new MockMove(...args);
  }

  public static readonly crouch = 0 as const;

  public static readonly back = 4 as const;
  public static readonly criteria = 2 as const;

  public static readonly curve = 0 as const;
  public static readonly curve_criteria = 2 as const;

  public static readonly default = 0 as const;
  public static readonly dodge = 1 as const;
  public static readonly down = 64 as const;
  public static readonly drag = 3 as const;
  public static readonly force = 1 as const;
  public static readonly fwd = 2 as const;
  public static readonly handbrake = 128 as const;
  public static readonly jump = 4 as const;
  public static readonly left = 8 as const;

  public static readonly line = 0 as const;
  public static readonly none = 1 as const;
  public static readonly off = 512 as const;
  public static readonly on = 256 as const;
  public static readonly right = 16 as const;
  public static readonly run = 1 as const;
  public static readonly run_fwd = 2 as const;
  public static readonly run_with_leader = 7 as const;
  public static readonly stand = 2 as const;
  public static readonly standing = 1 as const;
  public static readonly steal = 5 as const;
  public static readonly up = 32 as const;

  public static readonly walk = 0 as const;

  public static readonly walk_fwd = 0 as const;
  public static readonly walk_bkwd = 1 as const;
  public static readonly walk_with_leader = 6 as const;

  public __name: string = "move";

  public args: Array<unknown>;

  public isCompleted: boolean = false;
  public pathType: TXR_detail_path_type | null = null;
  public movementType: TXR_movement_type | null = null;
  public targetPosition: vector | null = null;
  public inputKey: number | null = null;
  public patrolPath: CPatrolPath | null = null;
  public patrolName: string | null = null;
  public targetObject: game_object | null = null;
  public bodyState: TXR_body_state | null = null;

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }

  public completed(): boolean {
    return this.isCompleted;
  }

  public path(pathType: TXR_detail_path_type): void {
    this.pathType = pathType;
  }

  public move(movementType: TXR_movement_type): void {
    this.movementType = movementType;
  }

  public position(vector: vector): void {
    this.targetPosition = vector;
  }

  public input(inputKey: number): void {
    this.inputKey = inputKey;
  }

  public patrol(patrolPath: CPatrolPath, pathName: string): void {
    this.patrolPath = patrolPath;
    this.patrolName = pathName;
  }

  public object(gameObject: game_object): void {
    this.targetObject = gameObject;
  }

  public body(bodyState: TXR_body_state): void {
    this.bodyState = bodyState;
  }
}

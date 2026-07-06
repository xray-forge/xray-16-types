/**
 * Mock move actions class.
 */
export class MockMove {
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

  public args: Array<unknown>;

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }
}

/**
 * Mock of the X-Ray engine `anim` action enumeration.
 */
export class MockAnim {
  public static readonly danger = 0 as const;
  public static readonly free = 1 as const;
  public static readonly panic = 2 as const;

  public static readonly stand_idle = 0 as const;
  public static readonly capture_prepare = 1 as const;
  public static readonly sit_idle = 2 as const;
  public static readonly lie_idle = 3 as const;
  public static readonly eat = 4 as const;
  public static readonly sleep = 5 as const;
  public static readonly rest = 6 as const;
  public static readonly attack = 7 as const;
  public static readonly look_around = 8 as const;
  public static readonly turn = 9 as const;
}

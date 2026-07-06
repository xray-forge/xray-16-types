/**
 * Mock of the X-Ray engine `look` action enumeration.
 */
export class MockLook {
  public static readonly cur_dir = 0 as const;
  public static readonly danger = 5 as const;
  public static readonly direction = 2 as const;
  public static readonly fire_point = 10 as const;
  public static readonly path_dir = 1 as const;
  public static readonly point = 3 as const;
  public static readonly search = 6 as const;
}

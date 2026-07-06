/**
 * Mock of the X-Ray engine `object` action/state enumeration.
 */
export class MockObject {
  public static readonly activate = 16 as const;
  public static readonly aim1 = 4 as const;
  public static readonly aim2 = 5 as const;
  public static readonly deactivate = 17 as const;
  public static readonly drop = 11 as const;
  public static readonly dummy = -1 as const;
  public static readonly fire1 = 6 as const;
  public static readonly fire2 = 8 as const;
  public static readonly hide = 22 as const;
  public static readonly idle = 9 as const;
  public static readonly reload = 2 as const;
  public static readonly reload1 = 2 as const;
  public static readonly reload2 = 3 as const;
  public static readonly show = 21 as const;
  public static readonly strap = 10 as const;
  public static readonly switch1 = 0 as const;
  public static readonly switch2 = 1 as const;
  public static readonly take = 23 as const;
  public static readonly turn_off = 20 as const;
  public static readonly turn_on = 19 as const;
  public static readonly use = 18 as const;
}

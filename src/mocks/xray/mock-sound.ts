/**
 * Mock of the X-Ray engine `sound` action enumeration.
 */
export class MockSound {
  public static readonly attack = 3 as const;
  public static readonly attack_hit = 4 as const;
  public static readonly die = 7 as const;
  public static readonly eat = 2 as const;
  public static readonly idle = 1 as const;
  public static readonly panic = 11 as const;
  public static readonly steal = 10 as const;
  public static readonly take_damage = 5 as const;
  public static readonly threaten = 9 as const;
}

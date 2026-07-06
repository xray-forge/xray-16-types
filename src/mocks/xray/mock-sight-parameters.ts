import type { game_object, TXR_SightType, vector } from "xray16";

/**
 * Mock AI sight parameters class.
 */
export class MockSightParameters {
  public static readonly eSightTypeDummy = -1 as const;
  public static readonly eSightTypeCurrentDirection = 0 as const;
  public static readonly eSightTypePathDirection = 1 as const;
  public static readonly eSightTypeDirection = 2 as const;
  public static readonly eSightTypePosition = 3 as const;
  public static readonly eSightTypeObject = 4 as const;
  public static readonly eSightTypeCover = 5 as const;
  public static readonly eSightTypeSearch = 6 as const;
  public static readonly eSightTypeLookOver = 7 as const;
  public static readonly eSightTypeCoverLookOver = 8 as const;
  public static readonly eSightTypeFireObject = 9 as const;
  public static readonly eSightTypeFirePosition = 10 as const;
  public static readonly eSightTypeAnimationDirection = 11 as const;

  public m_object!: game_object;
  public m_sight_type!: TXR_SightType;
  public m_vector!: vector;

  public constructor() {}
}

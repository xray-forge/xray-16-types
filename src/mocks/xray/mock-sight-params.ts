import type { CSightParams, game_object, TXR_SightType, vector } from "xray16";

import { MockGameObject } from "./mock-game-object";
import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `CSightParams` sight-type enumeration class.
 */
export class MockCSightParams implements CSightParams {
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

  public m_object: game_object = MockGameObject.mock();
  public m_sight_type: TXR_SightType = MockCSightParams.eSightTypeDummy;
  public m_vector: vector = MockVector.mock();
}

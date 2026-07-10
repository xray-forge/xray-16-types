import { jest } from "@jest/globals";
import type { game_object, hit, TXR_hit_type, vector } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `hit` object for jest/node.
 */
export class MockHit implements hit {
  public static create(source?: hit): MockHit {
    return new MockHit(source);
  }

  public static mock(source?: hit): hit {
    return new MockHit(source);
  }

  public static readonly burn = 0 as const;
  public static readonly chemical_burn = 2 as const;
  public static readonly dummy = 12 as const;
  public static readonly explosion = 7 as const;
  public static readonly fire_wound = 8 as const;
  public static readonly light_burn = 11 as const;
  public static readonly physic_strike = 10 as const;
  public static readonly radiation = 3 as const;
  public static readonly shock = 1 as const;
  public static readonly strike = 5 as const;
  public static readonly telepatic = 4 as const;
  public static readonly wound = 6 as const;

  public direction: vector = MockVector.mock(1, 0, 0);
  public draftsman: game_object | null = null;
  public impulse: number = 100;
  public power: number = 100;
  public type: TXR_hit_type = MockHit.wound;
  public boneName: string | null = null;

  public bone = jest.fn<(bone: string) => void>((bone) => {
    this.boneName = bone;
  });

  public constructor(source?: hit) {
    if (source) {
      this.direction = source.direction;
      this.draftsman = source.draftsman;
      this.impulse = source.impulse;
      this.power = source.power;
      this.type = source.type;
    }
  }
}

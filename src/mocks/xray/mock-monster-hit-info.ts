import type { game_object, MonsterHitInfo, vector } from "xray16";

import { MockGameObject } from "./mock-game-object";
import { MockVector } from "./mock-vector";

export class MockMonsterHitInfo {
  public static mock(
    direction: vector | null = MockVector.mock(1, 1, 1),
    time: number = 1,
    who: game_object | null = MockGameObject.mock()
  ): MonsterHitInfo {
    return new MockMonsterHitInfo(direction, time, who) as unknown as MonsterHitInfo;
  }

  public direction: vector | null = MockVector.mock(1, 1, 1);
  public time: number = 1;
  public who: game_object | null = MockGameObject.mock();

  public constructor(
    direction: vector | null = MockVector.mock(1, 1, 1),
    time: number = 1,
    who: game_object | null = MockGameObject.mock()
  ) {
    this.direction = direction;
    this.time = time;
    this.who = who;
  }
}

import type { game_object, MonsterHitInfo, vector } from "xray16";

import { MockGameObject } from "./mock-game-object";
import { MockVector } from "./mock-vector";

export class MockMonsterHitInfo implements MonsterHitInfo {
  public static mock(
    direction: vector | null = MockVector.mock(1, 1, 1),
    time: number = 1,
    who: game_object | null = MockGameObject.mock()
  ): MonsterHitInfo {
    return new MockMonsterHitInfo(direction, time, who) as unknown as MonsterHitInfo;
  }

  public __name: string = "MonsterHitInfo";

  public direction: vector = MockVector.mock(1, 1, 1);
  public time: number = 1;
  public who: game_object = MockGameObject.mock();

  public constructor(
    direction: vector | null = MockVector.mock(1, 1, 1),
    time: number = 1,
    who: game_object | null = MockGameObject.mock()
  ) {
    this.direction = direction as vector;
    this.time = time;
    this.who = who as game_object;
  }
}

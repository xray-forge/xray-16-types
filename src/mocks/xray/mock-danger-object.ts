import type { danger_object, game_object, TXR_danger_object, TXR_danger_perceive_type } from "xray16";

import { MockGameObject } from "./mock-game-object";
import { MockVector } from "./mock-vector";

/**
 * Mock xray engine danger object.
 */
export class MockDangerObject implements danger_object {
  public static create(dangerTime: number = -1): MockDangerObject {
    return new MockDangerObject(dangerTime);
  }

  public static mock(dangerTime: number = -1): danger_object {
    return new MockDangerObject(dangerTime) as unknown as danger_object;
  }

  public static attack_sound: number = 1;
  public static attacked: number = 5;
  public static bullet_ricochet: number = 0;
  public static enemy_sound: number = 7;
  public static entity_attacked: number = 2;
  public static entity_corpse: number = 4;
  public static entity_death: number = 3;
  public static grenade: number = 6;
  public static hit: number = 2;
  public static sound: number = 1;
  public static visual: number = 0;

  public dangerType: TXR_danger_object = 6;
  public dangerObject: game_object = MockGameObject.mock();
  public dangerDependentObject: game_object | null = null;
  public dangerPosition: MockVector = MockVector.create(1.5, -0.5, 1);
  public dangerPerceiveType: TXR_danger_perceive_type = 0;
  public dangerTime: number = -1;

  public constructor(dangerTime: number = -1) {
    this.dangerTime = dangerTime;
  }

  public time(): number {
    return this.dangerTime;
  }

  public position(): MockVector {
    return this.dangerPosition;
  }

  public object(): game_object {
    return this.dangerObject;
  }

  public dependent_object(): game_object | null {
    return this.dangerDependentObject;
  }

  public type(): TXR_danger_object {
    return this.dangerType;
  }

  public perceive_type(): TXR_danger_perceive_type {
    return this.dangerPerceiveType;
  }

  public asMock(): danger_object {
    return this as unknown as danger_object;
  }
}

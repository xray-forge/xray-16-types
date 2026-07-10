import { jest } from "@jest/globals";
import { type CPhysicObject } from "xray16";

import { MockCGameObject } from "./mock-c-game-object";

/**
 * Mock of the X-Ray engine `CPhysicObject`.
 */
export class MockPhysicObject extends MockCGameObject implements CPhysicObject {
  public static override create(): MockPhysicObject {
    return new MockPhysicObject();
  }

  public static override mock(): CPhysicObject {
    return new MockPhysicObject() as unknown as CPhysicObject;
  }

  public animationTime: number = 0;


  public set_door_ignore_dynamics = jest.fn();

  public play_bones_sound = jest.fn();

  public run_anim_back = jest.fn();

  public run_anim_forward = jest.fn();

  public stop_anim = jest.fn(() => true);

  public anim_time_get = jest.fn(() => this.animationTime);

  public anim_time_set = jest.fn((time: number) => {
    this.animationTime = time;
  });

  public unset_door_ignore_dynamics = jest.fn();

  public stop_bones_sound = jest.fn();
}

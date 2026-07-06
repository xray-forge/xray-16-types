import { jest } from "@jest/globals";
import { type CALifeMonsterBrain } from "xray16";

/**
 * Mock of the X-Ray engine `CALifeMonsterBrain` alife brain.
 */
export class MockCAlifeMonsterBrain {
  public static mock(): CALifeMonsterBrain {
    return new MockCAlifeMonsterBrain() as unknown as CALifeMonsterBrain;
  }

  public can_choose_alife_tasks = jest.fn();
}

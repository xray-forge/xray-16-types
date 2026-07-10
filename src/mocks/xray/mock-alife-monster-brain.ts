import { jest } from "@jest/globals";
import { type CALifeMonsterBrain } from "xray16";

/**
 * Mock of the X-Ray engine `CALifeMonsterBrain` alife brain.
 */
export class MockCAlifeMonsterBrain implements CALifeMonsterBrain {
  public canChooseAlifeTasks: boolean = true;

  public static create(): MockCAlifeMonsterBrain {
    return new MockCAlifeMonsterBrain();
  }

  public static mock(): CALifeMonsterBrain {
    return new MockCAlifeMonsterBrain();
  }

  public select_task = jest.fn();

  public process_task = jest.fn();

  public default_behaviour = jest.fn();

  public can_choose_alife_tasks = jest.fn((value?: boolean): boolean | void => {
    if (typeof value === "boolean") {
      this.canChooseAlifeTasks = value;
    } else {
      return this.canChooseAlifeTasks;
    }
  }) as jest.MockedFunction<CALifeMonsterBrain["can_choose_alife_tasks"]>;

  public on_state_write = jest.fn();

  public on_state_read = jest.fn();

  public on_register = jest.fn();

  public on_unregister = jest.fn();

  public on_location_change = jest.fn();

  public on_switch_online = jest.fn();

  public on_switch_offline = jest.fn();

  public update = jest.fn();

  public update_script = jest.fn();

  public perform_attack = jest.fn(() => false);

  public action_type = jest.fn(() => 0);

  public object = jest.fn() as jest.MockedFunction<CALifeMonsterBrain["object"]>;

  public movement = jest.fn() as jest.MockedFunction<CALifeMonsterBrain["movement"]>;

  public smart_terrain = jest.fn() as jest.MockedFunction<CALifeMonsterBrain["smart_terrain"]>;
}

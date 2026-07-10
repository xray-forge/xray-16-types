import { jest } from "@jest/globals";
import type { entity_action } from "xray16";

/**
 * Mock of the X-Ray engine `entity_action` class.
 */
export class MockEntityAction implements entity_action {
  public __name: string = "entity_action";

  public args: Array<unknown>;
  public set_action = jest.fn<entity_action["set_action"]>();
  public move = jest.fn<() => boolean>(() => false);
  public particle = jest.fn<() => boolean>(() => false);
  public completed = jest.fn<() => boolean>(() => false);
  public object = jest.fn<() => boolean>(() => false);
  public all = jest.fn<() => boolean>(() => false);
  public time = jest.fn<() => boolean>(() => false);
  public look = jest.fn<() => boolean>(() => false);
  public sound = jest.fn<() => boolean>(() => false);
  public anim = jest.fn<() => boolean>(() => false);

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }
}

import { jest } from "@jest/globals";
import type { effector, effector_params } from "xray16";

/**
 * Mock of a generic X-Ray engine effector class for jest/node.
 */
export class MockEffector implements effector {
  public __name: string = "effector";

  public type: number;
  public time: number;
  public start = jest.fn();
  public process = jest.fn<(params: effector_params) => boolean>(() => false);
  public finish = jest.fn();

  public constructor(type: number, time: number) {
    this.type = type;
    this.time = time;
  }
}

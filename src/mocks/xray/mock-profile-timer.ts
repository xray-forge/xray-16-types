import { jest } from "@jest/globals";
import { type profile_timer } from "xray16";

/**
 * Mock of the X-Ray engine high-precision `profile_timer`.
 */
export class MockProfileTimer implements profile_timer {
  public timestamp: number | null = null;
  public duration: number | null = null;

  public readonly __name: string = "profile_timer";

  public start = jest.fn(() => (this.timestamp = Date.now()));

  public stop = jest.fn(() => {
    if (this.duration === null) {
      this.duration = Date.now() - (this.timestamp as number);
    }
  });

  public time = jest.fn(() => this.duration as number);
}

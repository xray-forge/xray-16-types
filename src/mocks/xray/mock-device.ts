import { jest } from "@jest/globals";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `device()` singleton for jest/node.
 */
export class MockDevice {
  protected static instance: MockDevice | null = null;

  public static getInstance(): MockDevice {
    if (!MockDevice.instance) {
      MockDevice.instance = new MockDevice();
    }

    return MockDevice.instance;
  }

  public width: number = 1920;
  public height: number = 1080;
  public fov: number = 70;
  public precache_frame: number = 0;
  public cam_dir: MockVector = MockVector.create(0.5, 0, 0.5);
  public pause = jest.fn();
}

import { jest } from "@jest/globals";
import type { render_device, vector } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `device()` singleton for jest/node.
 */
export class MockDevice implements render_device {
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
  public cam_dir: vector = MockVector.create(0.5, 0, 0.5);
  public cam_pos: vector = MockVector.create();
  public cam_right: vector = MockVector.create(1, 0, 0);
  public cam_top: vector = MockVector.create(0, 1, 0);
  public aspect_ratio: number = this.width / this.height;
  public frame: number = 0;
  public time_delta: number = 0;
  public f_time_delta: number = 0;
  public globalTime: number = 0;
  public isPaused: boolean = false;

  public time_global = jest.fn(() => this.globalTime);

  public is_paused = jest.fn(() => this.isPaused);

  public pause = jest.fn<(paused: boolean) => void>((paused) => {
    this.isPaused = paused;
  });
}

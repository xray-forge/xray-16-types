import type { noise } from "xray16";

/**
 * Mock of the X-Ray engine `noise` class for jest/node.
 */
export class MockNoise implements noise {
  public intensity: number;
  public grain: number;
  public fps: number;

  public constructor(intensity: number = 0, grain: number = 1, fps: number = 10) {
    this.intensity = intensity;
    this.grain = grain;
    this.fps = fps;
  }

  public set(intensity: number, grain: number, fps: number): this {
    this.intensity = intensity;
    this.grain = grain;
    this.fps = fps;

    return this;
  }
}

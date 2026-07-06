import { jest } from "@jest/globals";

/**
 * Mock of the X-Ray engine particles object.
 */
export class MockParticleObject {
  public static REGISTRY: Map<string, MockParticleObject> = new Map();

  public name: string;
  public isPlaying: boolean = false;

  public constructor(name: string) {
    this.name = name;

    MockParticleObject.REGISTRY.set(name, this);
  }

  public playing = jest.fn(() => this.isPlaying);

  public play = jest.fn(() => {
    this.isPlaying = true;
  });

  public play_at_pos = jest.fn(() => {
    this.isPlaying = true;
  });

  public load_path = jest.fn(() => {});

  public start_path = jest.fn(() => {});

  public stop = jest.fn(() => {
    this.isPlaying = false;
  });
}

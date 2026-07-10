import { jest } from "@jest/globals";
import { type particles_object, type vector } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine particles object.
 */
export class MockParticleObject implements particles_object {
  public static REGISTRY: Map<string, MockParticleObject> = new Map();

  public static create(name: string): MockParticleObject {
    return new MockParticleObject(name);
  }

  public static mock(name: string): particles_object {
    return new MockParticleObject(name);
  }

  public name: string;
  public isPlaying: boolean = false;
  public isPaused: boolean = false;
  public isLooped: boolean = false;
  public position: MockVector = MockVector.create();
  public direction: MockVector = MockVector.create();

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

  public pause_path = jest.fn((isPaused: boolean) => {
    this.isPaused = isPaused;
  });

  public move_to = jest.fn((position: vector) => {
    this.position.set(position);
  });

  public looped = jest.fn(() => this.isLooped);

  public load_path = jest.fn();

  public start_path = jest.fn((isLooped: boolean) => {
    this.isLooped = isLooped;
    this.isPlaying = true;
  });

  public stop = jest.fn(() => {
    this.isPlaying = false;
  });

  public stop_path = jest.fn(() => {
    this.isPlaying = false;
  });

  public stop_deffered = jest.fn(() => this.stop());

  public last_position = jest.fn(() => this.position);

  public set_direction = jest.fn((direction: vector) => {
    this.direction.set(direction);
  });

  public set_orientation = jest.fn();

  public stop_deferred = jest.fn(() => this.stop());
}

import { jest } from "@jest/globals";
import { type sound_object } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine sound object.
 */
export class MockSoundObject implements sound_object {
  public static readonly SOUND_OBJECT_REGISTRY: Array<MockSoundObject> = [];

  public static create(path: string): MockSoundObject {
    return new MockSoundObject(path);
  }

  public static resetRegistry(): void {
    this.SOUND_OBJECT_REGISTRY.splice(0);
  }

  public static mock(path: string): sound_object {
    return new MockSoundObject(path);
  }

  public static asObject(sound: sound_object | null | undefined): MockSoundObject {
    if (!sound) {
      throw new Error("Unexpected null provided for type assertion of sound object.");
    }

    return sound as unknown as MockSoundObject;
  }

  public path: string;
  public frequency: number = 1;
  public max_distance: number = 1;
  public min_distance: number = 0;
  public volume: number = 0;
  public soundLength: number = 30;
  public position: MockVector = MockVector.create();

  public isPlaying: boolean = false;

  public constructor(path: string) {
    this.path = path;

    MockSoundObject.SOUND_OBJECT_REGISTRY.push(this);
  }

  public play_at_pos = jest.fn(() => {});

  public play = jest.fn(() => {
    this.isPlaying = true;
  });

  public play_no_feedback = jest.fn(() => {
    this.isPlaying = true;
  });

  public stop = jest.fn(() => {
    this.isPlaying = false;
  });

  public playing = jest.fn(() => this.isPlaying);

  public length = jest.fn(() => this.soundLength);

  public get_position = jest.fn(() => this.position);

  public set_position = jest.fn((position: MockVector) => {
    this.position.set(position);
  });

  public attach_tail = jest.fn();

  public stop_deffered = jest.fn(() => this.stop());

  public stop_deferred = jest.fn(() => this.stop());
}

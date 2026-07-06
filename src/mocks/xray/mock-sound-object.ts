import { jest } from "@jest/globals";
import { type sound_object } from "xray16";

/**
 * Mock of the X-Ray engine sound object.
 */
export class MockSoundObject {
  public static readonly SOUND_OBJECT_REGISTRY: Array<MockSoundObject> = [];

  public static resetRegistry(): void {
    this.SOUND_OBJECT_REGISTRY.splice(0);
  }

  public static mock(path: string): sound_object {
    return new MockSoundObject(path) as unknown as sound_object;
  }

  public static asObject(sound: sound_object | null | undefined): MockSoundObject {
    if (!sound) {
      throw new Error("Unexpected null provided for type assertion of sound object.");
    }

    return sound as unknown as MockSoundObject;
  }

  public path: string;
  public volume: number = 0;
  public soundLength: number = 30;

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

  public attach_tail = jest.fn();
}

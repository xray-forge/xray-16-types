import type { sound, sound_object, TXR_snd_type, vector } from "xray16";

/**
 * Mock of the X-Ray engine `sound` action enumeration.
 */
export class MockSound implements sound {
  public static create(...args: Array<unknown>): MockSound {
    return new MockSound(...args);
  }

  public static mock(...args: Array<unknown>): sound {
    return new MockSound(...args);
  }

  public static readonly attack = 3 as const;
  public static readonly attack_hit = 4 as const;
  public static readonly die = 7 as const;
  public static readonly eat = 2 as const;
  public static readonly idle = 1 as const;
  public static readonly panic = 11 as const;
  public static readonly steal = 10 as const;
  public static readonly take_damage = 5 as const;
  public static readonly threaten = 9 as const;

  public __name: string = "sound";

  public args: Array<unknown>;
  public isCompleted: boolean = false;
  public sound: string | sound_object | null = null;
  public position: vector | null = null;
  public bone: string | null = null;
  public angles: vector | null = null;
  public soundType: TXR_snd_type | null = null;

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }

  public set_sound(value: string | sound_object): void {
    this.sound = value;
  }

  public set_position(vector: vector): void {
    this.position = vector;
  }

  public set_bone(value: string): void {
    this.bone = value;
  }

  public set_angles(vector: vector): void {
    this.angles = vector;
  }

  public set_sound_type(type: TXR_snd_type): void {
    this.soundType = type;
  }

  public completed(): boolean {
    return this.isCompleted;
  }
}

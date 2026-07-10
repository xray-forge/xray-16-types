import type { game_object, look, TXR_SightType, vector } from "xray16";

/**
 * Mock of the X-Ray engine `look` action enumeration.
 */
export class MockLook implements look {
  public static readonly cur_dir = 0 as const;
  public static readonly danger = 5 as const;
  public static readonly direction = 2 as const;
  public static readonly fire_point = 10 as const;
  public static readonly path_dir = 1 as const;
  public static readonly point = 3 as const;
  public static readonly search = 6 as const;

  public __name: string = "look";

  public args: Array<unknown>;
  public isCompleted: boolean = false;
  public sightType: TXR_SightType | null = null;
  public targetObject: game_object | null = null;
  public boneId: string | null = null;
  public direction: Readonly<vector> | null = null;

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }

  public completed(): boolean {
    return this.isCompleted;
  }

  public type(sightType: TXR_SightType): void {
    this.sightType = sightType;
  }

  public object(gameObject: game_object): void {
    this.targetObject = gameObject;
  }

  public bone(boneId: string): void {
    this.boneId = boneId;
  }

  public direct(vector: Readonly<vector>): void {
    this.direction = vector;
  }
}

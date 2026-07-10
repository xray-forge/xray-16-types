import type { game_object, TXR_object_action, XR_object } from "xray16";

/**
 * Mock of the X-Ray engine `object` action/state enumeration.
 */
export class MockObject implements XR_object {
  public static create(...args: Array<unknown>): MockObject {
    return new MockObject(...args);
  }

  public static mock(...args: Array<unknown>): XR_object {
    return new MockObject(...args);
  }

  public static readonly activate = 16 as const;
  public static readonly aim1 = 4 as const;
  public static readonly aim2 = 5 as const;
  public static readonly deactivate = 17 as const;
  public static readonly drop = 11 as const;
  public static readonly dummy = -1 as const;
  public static readonly fire1 = 6 as const;
  public static readonly fire2 = 8 as const;
  public static readonly hide = 22 as const;
  public static readonly idle = 9 as const;
  public static readonly reload = 2 as const;
  public static readonly reload1 = 2 as const;
  public static readonly reload2 = 3 as const;
  public static readonly show = 21 as const;
  public static readonly strap = 10 as const;
  public static readonly switch1 = 0 as const;
  public static readonly switch2 = 1 as const;
  public static readonly take = 23 as const;
  public static readonly turn_off = 20 as const;
  public static readonly turn_on = 19 as const;
  public static readonly use = 18 as const;

  public __name: string = "object";

  public args: Array<unknown>;
  public isCompleted: boolean = false;
  public objectAction: TXR_object_action | null = null;
  public targetObject: game_object | string | null = null;

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }

  public action(action: TXR_object_action): void {
    this.objectAction = action;
  }

  public object(object: game_object | string): void {
    this.targetObject = object;
  }

  public completed(): boolean {
    return this.isCompleted;
  }
}

import type { cond } from "xray16";

/**
 * Mock of the X-Ray engine `cond` action-completion enumeration.
 */
export class MockCond implements cond {
  public static create(...args: Array<unknown>): MockCond {
    return new MockCond(...args);
  }

  public static mock(...args: Array<unknown>): cond {
    return new MockCond(...args);
  }

  public static readonly move_end = 1 as const;
  public static readonly look_end = 2 as const;
  public static readonly anim_end = 4 as const;
  public static readonly sound_end = 8 as const;
  public static readonly object_end = 32 as const;
  public static readonly time_end = 64 as const;
  public static readonly act_end = 128 as const;

  public __name: string = "cond";

  public args: Array<unknown>;

  public constructor(...args: Array<unknown>) {
    this.args = args;
  }
}

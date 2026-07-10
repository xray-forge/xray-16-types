import { jest } from "@jest/globals";
import { type login_operation_cb, type profile } from "xray16";

export class MockLoginOperationCb implements login_operation_cb {
  public static mock(
    object: object = {},
    cb: (this: object, profile: profile | null | undefined, description: string) => void = () => {}
  ): login_operation_cb {
    return new this(object, cb) as unknown as login_operation_cb;
  }

  public static create(
    object: object = {},
    cb: (this: object, profile: profile | null | undefined, description: string) => void = () => {}
  ): MockLoginOperationCb {
    return new this(object, cb);
  }

  public object: object | null;
  public cb: ((this: object, profile: profile | null | undefined, description: string) => void) | null;

  public constructor(
    object: object = {},
    cb: (this: object, profile: profile | null | undefined, description: string) => void = () => {}
  ) {
    this.object = object;
    this.cb = cb;
  }

  public bind = jest.fn(
    (object: object, cb: (this: object, profile: profile | null | undefined, description: string) => void) => {
      this.object = object;
      this.cb = cb;
    }
  );

  public clear = jest.fn(() => {
    this.object = null;
    this.cb = null;
  });
}

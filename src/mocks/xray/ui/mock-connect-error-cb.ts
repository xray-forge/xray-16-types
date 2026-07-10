import { jest } from "@jest/globals";
import { type connect_error_cb } from "xray16";

export class MockConnectErrorCb implements connect_error_cb {
  public static mock(
    object: object = {},
    cb: (this: object, code: number, description: string) => void = () => {}
  ): connect_error_cb {
    return new this(object, cb) as unknown as connect_error_cb;
  }

  public static create(
    object: object = {},
    cb: (this: object, code: number, description: string) => void = () => {}
  ): MockConnectErrorCb {
    return new this(object, cb);
  }

  public object: object | null;
  public cb: ((this: object, code: number, description: string) => void) | null;

  public constructor(object: object = {}, cb: (this: object, code: number, description: string) => void = () => {}) {
    this.object = object;
    this.cb = cb;
  }

  public bind = jest.fn((object: object, cb: (this: object, code: number, description: string) => void) => {
    this.object = object;
    this.cb = cb;
  });

  public clear = jest.fn(() => {
    this.object = null;
    this.cb = null;
  });
}

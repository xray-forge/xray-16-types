import { type game_object } from "xray16";

import { type MockPropertyStorage } from "./mock-property-storage";

/**
 * Mock of the X-Ray engine AI property evaluator.
 */
export class MockPropertyEvaluator {
  public object!: game_object;
  public storage!: MockPropertyStorage;
  public __name: string;

  public constructor(object: game_object | null = null, name: string) {
    this.__name = name || this.constructor.name;
  }

  public setup(object: game_object, storage: MockPropertyStorage | null = null): void {
    this.object = object;
    this.storage = storage as MockPropertyStorage;
  }
}

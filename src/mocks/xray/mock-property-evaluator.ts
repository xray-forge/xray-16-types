import { type game_object, type property_evaluator, type property_storage } from "xray16";

/**
 * Mock of the X-Ray engine AI property evaluator.
 */
export class MockPropertyEvaluator implements property_evaluator {
  public static create(object: game_object | null = null, name: string = ""): MockPropertyEvaluator {
    return new MockPropertyEvaluator(object, name);
  }

  public static mock(object: game_object | null = null, name: string = ""): property_evaluator {
    return new MockPropertyEvaluator(object, name);
  }

  public object!: game_object;
  public storage!: property_storage;
  public __name: string;

  public constructor(object: game_object | null = null, name: string = "") {
    if (object) {
      this.object = object;
    }

    this.__name = name || this.constructor.name;
  }

  public setup(object: game_object, storage: property_storage): void {
    this.object = object;
    this.storage = storage;
  }

  public evaluate(): boolean {
    return false;
  }
}

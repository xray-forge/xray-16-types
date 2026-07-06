import { type game_object, type property_evaluator } from "xray16";

import { MockPropertyEvaluator } from "./mock-property-evaluator";

/**
 * Mock of a constant-value AI property evaluator.
 */
export class MockPropertyEvaluatorConst extends MockPropertyEvaluator {
  public constructor(public readonly value: boolean) {
    super(null as unknown as game_object, "const_evaluator");
  }

  public evaluate(): boolean {
    return this.value;
  }

  public asMock(): property_evaluator {
    return this as unknown as property_evaluator;
  }
}

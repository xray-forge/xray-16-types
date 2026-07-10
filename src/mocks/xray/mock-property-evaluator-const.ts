import { type game_object, type property_evaluator, type property_evaluator_const } from "xray16";

import { MockPropertyEvaluator } from "./mock-property-evaluator";

/**
 * Mock of a constant-value AI property evaluator.
 */
export class MockPropertyEvaluatorConst extends MockPropertyEvaluator implements property_evaluator_const {
  public static override create(
    valueOrObject: boolean | game_object | null = false,
    _name?: string
  ): MockPropertyEvaluatorConst {
    return new MockPropertyEvaluatorConst(typeof valueOrObject === "boolean" ? valueOrObject : false);
  }

  public static override mock(
    valueOrObject: boolean | game_object | null = false,
    _name?: string
  ): property_evaluator_const {
    return new MockPropertyEvaluatorConst(typeof valueOrObject === "boolean" ? valueOrObject : false);
  }

  public constructor(public readonly value: boolean) {
    super(null as unknown as game_object, "const_evaluator");
  }

  public override evaluate(): boolean {
    return this.value;
  }

  public asMock(): property_evaluator {
    return this as unknown as property_evaluator;
  }
}

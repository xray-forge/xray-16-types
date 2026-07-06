import { type action_base, type game_object } from "xray16";

import { MockLuabindClass } from "./mock-luabind";
import { type MockWorldProperty } from "./mock-world-property";

/**
 * Mock of the X-Ray engine GOAP action base class.
 */
export class MockActionBase extends MockLuabindClass {
  public static mock(object: game_object | null = null, name?: string): action_base {
    return new MockActionBase(object, name) as unknown as action_base;
  }

  public object: game_object | null;
  public name: string;

  public preconditions: Array<MockWorldProperty> = [];
  public effects: Array<MockWorldProperty> = [];

  public constructor(object: game_object | null = null, name?: string) {
    super();

    this.object = object;
    this.name = name ?? this.constructor.name;
  }

  public initialize(): void {}

  public execute(): void {}

  public finalize(): void {}

  public setup(object: game_object): void {
    this.object = object;
  }

  public add_precondition(property: MockWorldProperty): void {
    this.preconditions.push(property);
  }

  public add_effect(property: MockWorldProperty): void {
    this.effects.push(property);
  }

  public getPrecondition(id: number): MockWorldProperty | null {
    return this.preconditions.find((it) => it.condition() === id) ?? null;
  }

  public getEffect(id: number): MockWorldProperty | null {
    return this.effects.find((it) => it.condition() === id) ?? null;
  }
}

/**
 * Mock action base factory.
 */
export function mockActionBase(object: game_object | null = null, name: string = "generic"): action_base {
  return new MockActionBase(object, name) as unknown as action_base;
}

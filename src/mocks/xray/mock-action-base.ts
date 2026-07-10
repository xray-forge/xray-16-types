import { type property_storage, type u16, type u32, type action_base, type game_object } from "xray16";

import { MockLuabindClass } from "./mock-luabind";
import { MockPropertyStorage } from "./mock-property-storage";
import { type MockWorldProperty } from "./mock-world-property";

/**
 * Mock of the X-Ray engine GOAP action base class.
 */
export class MockActionBase extends MockLuabindClass implements action_base {
  public static override create(object: game_object, name?: string): MockActionBase {
    return new MockActionBase(object, name);
  }

  public static override mock(object: game_object, name?: string): action_base {
    return new MockActionBase(object, name);
  }

  public object!: game_object;
  public name: string;

  public preconditions: Array<MockWorldProperty> = [];
  public effects: Array<MockWorldProperty> = [];
  public storage: property_storage;

  public constructor(object: game_object, name?: string) {
    super();

    this.object = object;
    this.storage = MockPropertyStorage.mock();
    this.name = name ?? this.constructor.name;
  }

  public set_weight(weight: u16): void {
    throw new Error("Method not implemented.");
  }

  public remove_effect(id: u32): void {
    throw new Error("Method not implemented.");
  }

  public remove_precondition(id: u32): void {
    throw new Error("Method not implemented.");
  }

  public show(prefix?: string): void {
    throw new Error("Method not implemented.");
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
export function mockActionBase(object: game_object, name: string = "generic"): action_base {
  return new MockActionBase(object, name) as unknown as action_base;
}

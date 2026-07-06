import { jest } from "@jest/globals";
import {
  type action_base,
  type action_planner,
  type game_object,
  type property_evaluator,
  type property_storage,
  type world_state,
} from "xray16";

import { type MockActionBase, mockActionBase } from "./mock-action-base";
import { MockLuabindClass } from "./mock-luabind";
import { type MockPropertyEvaluator } from "./mock-property-evaluator";
import { mockStalkerIds } from "./mock-stalker-ids";

/**
 * Mock of the X-Ray engine GOAP action planner.
 */
export class MockActionPlanner extends MockLuabindClass {
  public static mock(): action_planner {
    return new MockActionPlanner() as unknown as action_planner;
  }

  public static mockDefault(): action_planner {
    const actionPlanner: MockActionPlanner = new MockActionPlanner();

    actionPlanner.add_action(mockStalkerIds.action_alife_planner, mockActionBase());
    actionPlanner.add_action(mockStalkerIds.action_gather_items, mockActionBase());
    actionPlanner.add_action(mockStalkerIds.action_anomaly_planner, mockActionBase());
    actionPlanner.add_action(mockStalkerIds.action_danger_planner, mockActionBase());
    actionPlanner.add_action(mockStalkerIds.action_accomplish_task, mockActionBase());
    actionPlanner.add_action(mockStalkerIds.action_combat_planner, mockActionBase());
    actionPlanner.add_action(194 /* EActionId.STATE_TO_IDLE_ALIFE */, mockActionBase());

    return actionPlanner as unknown as action_planner;
  }

  public object!: game_object;
  public storage!: property_storage;

  public evaluators: Record<number, property_evaluator> = {};
  public actions: Record<number, action_base> = {};
  public goalWorldState: world_state | null = null;
  public currentActionId: number | null = null;

  public isInitialized: boolean = false;

  public initialized(): boolean {
    return this.isInitialized;
  }

  public update(): void {}

  public setup(object: game_object): void {
    this.object = object;
  }

  public add_evaluator = jest.fn((id: number, evaluator: property_evaluator) => {
    if (!id) {
      throw new Error("Unexpected id.");
    }

    this.evaluators[id] = evaluator;
  });

  public add_action = jest.fn((id: number, actionBase: action_base) => {
    if (!id) {
      throw new Error("Unexpected id.");
    }

    this.actions[id] = actionBase;
  });

  public remove_action = jest.fn((id: number) => {
    if (!id) {
      throw new Error("Unexpected id.");
    }

    delete this.actions[id];
  });

  public current_action_id(): number | null {
    return this.currentActionId;
  }

  public set_goal_world_state(state: world_state): void {
    this.goalWorldState = state;
  }

  public remove_evaluator = jest.fn((id: number) => {
    if (!id) {
      throw new Error("Unexpected id.");
    }

    delete this.evaluators[id];
  });

  public action = jest.fn((id: number): MockActionBase | null => {
    return (this.actions[id] as unknown as MockActionBase) || null;
  });

  public evaluator = jest.fn((id: number): MockPropertyEvaluator | null => {
    return (this.evaluators[id] as unknown as MockPropertyEvaluator) || null;
  });

  public show = jest.fn();

  public asMock(): action_planner {
    return this as unknown as action_planner;
  }
}

/**
 * Mock action planner factory.
 */
export function mockActionPlanner(): action_planner {
  return new MockActionPlanner() as unknown as action_planner;
}

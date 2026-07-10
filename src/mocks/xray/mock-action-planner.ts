import { jest } from "@jest/globals";
import {
  type action_base,
  type action_planner,
  type game_object,
  type property_evaluator,
  type property_storage,
  type world_state,
} from "xray16";

import { mockActionBase } from "./mock-action-base";
import { type MockGameObject } from "./mock-game-object";
import { MockLuabindClass } from "./mock-luabind";
import { mockStalkerIds } from "./mock-stalker-ids";

/**
 * Mock of the X-Ray engine GOAP action planner.
 */
export class MockActionPlanner extends MockLuabindClass implements action_planner {
  public static override create(): MockActionPlanner {
    return new MockActionPlanner();
  }

  public static override mock(): action_planner {
    return new MockActionPlanner();
  }

  public static mockDefault(object: game_object | MockGameObject): action_planner {
    const actionPlanner: MockActionPlanner = new MockActionPlanner();

    actionPlanner.add_action(mockStalkerIds.action_alife_planner, mockActionBase(object as game_object));
    actionPlanner.add_action(mockStalkerIds.action_gather_items, mockActionBase(object as game_object));
    actionPlanner.add_action(mockStalkerIds.action_anomaly_planner, mockActionBase(object as game_object));
    actionPlanner.add_action(mockStalkerIds.action_danger_planner, mockActionBase(object as game_object));
    actionPlanner.add_action(mockStalkerIds.action_accomplish_task, mockActionBase(object as game_object));
    actionPlanner.add_action(mockStalkerIds.action_combat_planner, mockActionBase(object as game_object));
    actionPlanner.add_action(194 /* EActionId.STATE_TO_IDLE_ALIFE */, mockActionBase(object as game_object));

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

  public actual(): boolean {
    return this.isInitialized;
  }

  public clear(): void {
    this.evaluators = {};
    this.actions = {};
    this.goalWorldState = null;
    this.currentActionId = null;
    this.isInitialized = false;
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

  public current_action(): action_base {
    return (this.currentActionId === null ? null : this.actions[this.currentActionId]) as action_base;
  }

  public current_action_id(): number {
    return this.currentActionId as number;
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

  public action = jest.fn((id: number): action_base => {
    return this.actions[id] ?? (null as unknown as action_base);
  });

  public evaluator = jest.fn((id: number): property_evaluator => {
    return this.evaluators[id] ?? (null as unknown as property_evaluator);
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

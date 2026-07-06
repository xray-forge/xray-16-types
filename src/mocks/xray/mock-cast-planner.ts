import { type action_base, type action_planner } from "xray16";

import { MockActionPlanner } from "./mock-action-planner";

/**
 * Mock of the engine cast-planner behaviour: lazily create a hidden planner on the action.
 */
export function mockCastPlanner(action: action_base): action_planner {
  const actionContainer = action as unknown as { planner?: action_planner };

  if (actionContainer.planner) {
    return actionContainer.planner;
  }

  const planner: action_planner = MockActionPlanner.mock();

  actionContainer.planner = planner;

  return planner;
}

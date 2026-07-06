import { jest } from "@jest/globals";

/**
 * Mock of the X-Ray engine `entity_action` class.
 */
export class MockEntityAction {
  public set_action = jest.fn();
}

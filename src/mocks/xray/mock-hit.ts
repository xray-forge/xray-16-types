import { jest } from "@jest/globals";

/**
 * Mock of the X-Ray engine `hit` object for jest/node.
 */
export class MockHit {
  public bone = jest.fn();
}

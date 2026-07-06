import { jest } from "@jest/globals";

/**
 * Mock of the X-Ray engine C++ `properties_helper` class.
 */
export class MockPropertiesHelper {
  public create_bool = jest.fn((...args: Array<unknown>) => args);
}

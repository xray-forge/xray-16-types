import { jest } from "@jest/globals";

import { MockCMainMenu } from "./mock-main-menu";

/**
 * Mock of the X-Ray engine `main_menu` namespace (subset).
 */
export const mockMainMenuInterface = {
  get_main_menu: jest.fn(() => MockCMainMenu.getInstance()),
};

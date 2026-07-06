/**
 * Mock lua debug library.
 */
export const mockDebug = {
  traceback: jest.fn(() => "[mock] traceback"),
  sethook: jest.fn(),
  getinfo: jest.fn(),
};

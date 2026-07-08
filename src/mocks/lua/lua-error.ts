/**
 * Mock lua `error` global.
 * Mirrors the engine behaviour of raising an exception with the provided message.
 */
export const mockError = jest.fn((message: string): never => {
  throw new Error(message);
});

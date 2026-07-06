/**
 * Mock of the engine `command_line` global.
 */
export const mockCommandLine = jest.fn((): string => {
  return "--arg-example";
});

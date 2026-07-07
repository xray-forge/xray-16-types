/**
 * Check whether a string contains a case-insensitive Lua pattern.
 *
 * @remarks
 * `substring` is passed to Lua `string.gsub`, so Lua pattern characters are interpreted rather than matched literally.
 *
 * @param target - Text to search.
 * @param substring - Lua pattern to find.
 * @returns Whether `target` contains `substring`.
 */
export function containsSubstring(target: string, substring: string): boolean {
  target = string.lower(target);
  substring = string.lower(substring);

  return target !== string.gsub(target, substring, "")[0];
}

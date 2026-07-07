/**
 * Preserve acronym boundaries after the first decamelize pass.
 *
 * @param decamelized - Partially converted text.
 * @param separator - Separator inserted between words.
 * @returns Text with consecutive uppercase runs split at word boundaries.
 */
function handlePreserveConsecutiveUppercase(decamelized: string, separator: string): string {
  decamelized = decamelized.replace(
    /((?<![\p{Uppercase_Letter}\d])[\p{Uppercase_Letter}\d](?![\p{Uppercase_Letter}\d]))/gu,
    ($0) => $0.toLowerCase()
  );

  return decamelized.replace(
    /(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
    (_, $1, $2) => $1 + separator + $2.toLowerCase()
  );
}

/**
 * Convert camelCase or PascalCase text to separated lowercase text.
 *
 * @remarks
 * When `preserveConsecutiveUppercase` is enabled, acronym runs such as `URL` keep their original casing unless the last
 * uppercase letter starts the following lowercase word.
 *
 * @param text - Text to convert.
 * @param options - Conversion options.
 * @param options.separator - Separator inserted between words. Defaults to `_`.
 * @param options.preserveConsecutiveUppercase - Whether consecutive uppercase runs keep their casing. Defaults to
 * `false`.
 * @returns Converted text.
 */
export function decamelize(
  text: string,
  options: { separator?: string; preserveConsecutiveUppercase?: boolean } = {}
): string {
  const { separator = "_", preserveConsecutiveUppercase = false } = options;

  if (text.length < 2) {
    return preserveConsecutiveUppercase ? text : text.toLowerCase();
  }

  const replacement = `$1${separator}$2`;

  // Split lowercase sequences followed by uppercase character.
  // `dataForUSACounties` -> `data_For_USACounties`
  // `myURLstring` -> `my_URLstring`
  const decamelized = text.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, replacement);

  if (preserveConsecutiveUppercase) {
    return handlePreserveConsecutiveUppercase(decamelized, separator);
  }

  // Split multiple uppercase characters followed by one or more lowercase characters.
  // `my_URLstring` -> `my_ur_lstring`
  return decamelized
    .replace(/(\p{Uppercase_Letter})(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu, replacement)
    .toLowerCase();
}

/**
 * Converts a string, number, or boolean to a boolean.
 * @param value - The value to convert.
 * @returns For strings, `'true'` will be converted to `true`. For numbers, `1` will be converted to `true`.
 */
export function toBoolean(value: string | number | boolean): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return !!value;
}

/**
 * Transforms an array of strings into an array of objects,
 * each containing an `id` and a `value` property.
 *
 * @param {string[]} array - The input array of strings.
 * @returns {Array<{id: number; value: string}>} An array of objects where each object has
 * an `id` (number) and a `value` (string), corresponding to the index and value from the input array.
 */
export function fromArrayStringToArrayObjectWithIdAndValue(
  array: string[],
): Array<{id: number; value: string}> {
  return array.map((item, index) => ({
    id: index, // 'id' is set to the current index of the string in the array
    value: item, // 'value' is set to the string itself
  }));
}

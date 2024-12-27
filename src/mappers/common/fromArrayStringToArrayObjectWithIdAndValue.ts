export function fromArrayStringToArrayObjectWithIdAndValue(
  array: string[],
): Array<{id: number; value: string}> {
  return array.map((item, index) => ({
    id: index,
    value: item,
  }));
}

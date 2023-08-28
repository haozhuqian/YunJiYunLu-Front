export default function getNumericEnumValues<R = any>(
  enumObj: Record<string, number | string>,
) {
  return Object.keys(enumObj)
    .filter((key) => typeof enumObj[key] === 'number')
    .map((key) => enumObj[key] as number) as R[];
}

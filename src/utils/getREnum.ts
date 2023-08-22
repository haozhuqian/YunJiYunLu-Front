export default function <T extends Record<string, number | string>>(
  enumObj: T,
) {
  let enumValues = Object.keys(enumObj);
  enumValues = enumValues.filter((key) => isNaN(Number(key)));

  return () => {
    return enumObj[enumValues[Math.floor(Math.random() * enumValues.length)]];
  };
}

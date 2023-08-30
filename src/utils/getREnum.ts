export default function <R = any>(enumObj: Record<string, number | string>) {
  let enumValues = Object.keys(enumObj);
  enumValues = enumValues.filter((key) => isNaN(Number(key)));

  return () => {
    return enumObj[
      enumValues[Math.floor(Math.random() * enumValues.length)]
    ] as R;
  };
}

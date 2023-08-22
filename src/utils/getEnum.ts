export default function <T extends Record<string, number | string>>(
  enumObj: T,
) {
  return (key: keyof T) => {
    return enumObj[key];
  };
}

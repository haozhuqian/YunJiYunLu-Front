import getREnum from '@/utils/getREnum';

export default function <R extends object>(
  row: string[],
  clumn: string[],
  enumObj: Record<string, number | string>,
  name: keyof R,
  state: keyof R,
  defaultState: R[keyof R],
) {
  const table: R[][] = [];
  const randomEnum = getREnum(enumObj);
  for (let i = 0; i < row.length; i++) {
    table[i] = [];
    for (let j = 0; j < clumn.length + 1; j++) {
      table[i][j] = { state: randomEnum() } as unknown as R;
    }
  }
  row.forEach((day, index) => {
    table[index][0][name] = day as R[keyof R];
    table[index][0][state] = defaultState;
  });
  clumn.forEach((day, index) => {
    table[0][index + 1][name] = day as R[keyof R];
    table[0][index + 1][state] = defaultState;
  });
  return reactive(table);
}

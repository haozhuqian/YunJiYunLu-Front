import getREnum from '@/utils/getREnum';

function generateRandomString(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export default function <R extends object>(conf: {
  name: {
    row: string[]; //第一行填充的内容
    column: string[]; //第一列填充的内容
  };
  state: {
    enumObj: Record<string, number | string>; //状态值
  };
}) {
  const { name, state } = conf;
  const width = name.row.length;
  const heigh = name.column.length + 1;
  //一个表格雏形
  const table: { name: string; content: R[] }[][] = [];
  //随机获取一个状态值
  const randomEnum = getREnum(state.enumObj);
  //根据第一行与第一列的长度填充状态与坐标
  for (let i = 0; i < width; i++) {
    table[i] = [];
    for (let j = 1; j < heigh; j++) {
      table[i][j] = { name: '', content: [] };
      for (let k = 0; k < heigh; k++) {
        table[i][j].content.push({
          name: generateRandomString(),
          status: randomEnum(),
          x: i,
          y: j,
          z: k,
        } as R);
      }
    }
  }
  // 填充第一行与第一列的内容
  name.row.forEach((row, index) => {
    table[index][0] = { name: row, content: [] };
  });
  name.column.forEach((column, index) => {
    table[0][index + 1] = { name: column, content: [] };
  });

  return reactive(table);
}

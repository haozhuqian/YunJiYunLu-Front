import getREnum from '@/utils/getREnum';

export default function <R extends object>(conf: {
  name: {
    key: keyof R; //第一行与第一列字符串数组填充的内容字段
    row: string[]; //第一行填充的内容
    column: string[]; //第一列填充的内容
  };
  state: {
    key: keyof R; //状态字段
    enumObj: Record<string, number | string>; //状态值
  };
  time: {
    key: keyof R; //时间字段
    now: number; //标识当前时间的值
    old: number; //标识过去时间的值
  };
}) {
  const { name, state, time } = conf;
  //一个表格雏形
  const table: R[][] = [];
  //随机获取一个状态值
  const randomEnum = getREnum(state.enumObj);
  //根据第一行与第一列的长度填充状态与坐标
  for (let i = 0; i < name.row.length; i++) {
    table[i] = [];
    for (let j = 0; j < name.column.length + 1; j++) {
      table[i][j] = { state: randomEnum(), x: i, y: j } as unknown as R;
    }
  }
  //填充第一行与第一列的内容
  name.row.forEach((day, index) => {
    table[index][0][name.key] = day as R[keyof R];
    table[index][0][state.key] = -1 as R[keyof R];
  });
  name.column.forEach((day, index) => {
    table[0][index + 1][name.key] = day as R[keyof R];
    table[0][index + 1][state.key] = -1 as R[keyof R];
  });
  //获取当前时间
  const now = new Date();
  const day = ((now.getDay() + 6) % 7) + 1;
  //将小时转换为对应的日程时间段
  const hour = Math.floor(now.getHours() / 2 - 4);
  //如果此时在工作时间段内，则将对应时间的状态改为now
  if (hour >= 8 && hour < 22) {
    table[day][hour][time.key] = time.now as R[keyof R];
  }
  //将过去的时间状态改为old
  for (let i = 1; i < name.row.length; i++) {
    if (i < day) {
      for (let j = 1; j < name.column.length + 1; j++) {
        table[i][j][time.key] = time.old as R[keyof R];
      }
    } else if (i === day) {
      for (let j = 1; j < hour; j++) {
        table[i][j][time.key] = time.old as R[keyof R];
      }
    }
  }
  return reactive(table);
}

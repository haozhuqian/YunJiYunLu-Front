//这个hook用于对用户对象列表的生成进行封装，导出了用于生成对应格式的表格数据的函数

import getREnum from '@/utils/getREnum';
import { Ref } from 'vue';

//随机生成一个三位字符串
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

//这个函数用于生成对应格式的表格数据，在与后端对接时可以在此基础上修改
export default function <R extends object>(conf: {
  name: {
    row: string[]; //第一行填充的内容
    column: string[]; //第一列填充的内容
  };
  state: {
    enumObj: Record<string, number | string>; //状态可选枚举值
  };
}) {
  const { name, state } = conf; //解构参数
  const width = name.row.length; //表格的宽
  const heigh = name.column.length + 1; //表格的高
  //一个表格雏形，因为没有必要对一级数组和二级数组做响应式追踪，所以仅仅在content数组中使用ref
  const table: { name: string; content: Ref<R>[] }[][] = [];
  //随机获取一个状态值
  const randomEnum = getREnum(state.enumObj);
  //根据第一行与第一列的长度填充状态与坐标
  for (let i = 0; i < width; i++) {
    table[i] = [];
    for (let j = 1; j < heigh; j++) {
      table[i][j] = { name: '', content: [] };
      for (let k = 0; k < heigh; k++) {
        table[i][j].content.push(
          ref({
            name: generateRandomString(), //随机的用户名
            status: randomEnum(), //随机的用户状态
            x: i,
            y: j,
            z: k,
          }) as Ref<R>,
        );
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

  return table;
}

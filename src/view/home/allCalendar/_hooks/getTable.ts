//这个hook用于对用户对象列表的生成进行封装，导出了生成的对应格式的表格数据

import getREnum from '@/utils/getREnum';
import { contentType, status } from '../_type/status';
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
//第一行填充的内容
const row = ['java', 'ai', 'fullstack', 'cpu'];
//第一列填充的内容
const column = ['1', '2', '3', '1', '1'];
//表格的宽
const width = row.length;
//表格的高
const heigh = column.length + 1;
//一个表格雏形，因为没有必要对一级数组和二级数组做响应式追踪，所以仅仅在content数组中使用ref
const table: { name: string; content: Ref<contentType>[] }[][] = [];
//随机获取一个状态值
const randomEnum = getREnum(status);
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
        }) as Ref<contentType>,
      );
    }
  }
}
// 填充第一行与第一列的内容
row.forEach((row, index) => {
  table[index][0] = { name: row, content: [] };
});
column.forEach((column, index) => {
  table[0][index + 1] = { name: column, content: [] };
});

export { table };

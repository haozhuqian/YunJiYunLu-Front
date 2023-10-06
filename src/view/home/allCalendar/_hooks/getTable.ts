//这个hook用于对用户对象列表的生成进行封装，导出了生成的对应格式的表格数据

import getREnum from '@/utils/getREnum';
import { contentType, status } from '../_type/status';
import { Ref } from 'vue';
import { tableGetSomeday } from '@/service/http/modules/arrange';

console.log(114514);
console.log();

//第一行填充的内容
const row = [
  '今日全体研学日程',
  '开发一组',
  '开发二组',
  '开发三组',
  '开发四组',
  '开发五组',
  '开发六组',
  '开发七组',
  '开发八组',
  '开发九组',
  '开发十组',
  '秘书处',
  '设计',
];
//第一列填充的内容
const column = ['1', '2', '3', '4'];
//表格的宽
const width = row.length;
//表格的高
const heigh = column.length + 1;
//一个表格雏形，因为没有必要对一级数组和二级数组做响应式追踪，所以仅仅在content数组中使用ref
const table = ref<{ name: string; content: Ref<contentType>[] }[][]>([]);
//随机获取一个状态值
const randomEnum = getREnum(status);
//根据第一行与第一列的长度填充状态与坐标
for (let i = 0; i < width; i++) {
  table.value[i] = [];
  for (let j = 1; j < heigh; j++) {
    table.value[i][j] = { name: '', content: [] };
    //发送请求获取小组排课情况
    tableGetSomeday(j, i).then((res) => {
      for (let k = 0; k < res.data.data.length; k++) {
        for (const item in res.data.data[k].studentInfoDTOList) {
          table.value[i][j].content.push(
            ref({
              name: res.data.data[k].studentInfoDTOList[item]?.studentName, //随机的用户名
              status: randomEnum(), //随机的用户状态
              isCheck: false, //是否被选中
              x: i,
              y: j,
              z: k,
            }) as Ref<contentType>,
          );
        }
      }
    });
  }
}
// 填充第一行与第一列的内容
row.forEach((row, index) => {
  table.value[index][0] = {
    name: row,
    content: [
      ref({
        name: '', //随机的用户名
        status: 0, //随机的用户状态
        isCheck: false, //是否被选中
        x: index,
        y: 0,
        z: 0,
      }),
    ],
  };
});
column.forEach((column, index) => {
  table.value[0][index + 1] = {
    name: column,
    content: [
      ref({
        name: '', //随机的用户名
        status: 0, //随机的用户状态
        isCheck: false, //是否被选中
        x: 0,
        y: index + 1,
        z: 0,
      }),
    ],
  };
});

export { table };

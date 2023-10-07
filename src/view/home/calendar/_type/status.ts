//日程状态
export enum status {
  outside, //表示该日程为表头
  study, //表示该日程为已请假
  nothing, //表示该日程无安排
  leave, //表示该日程为研学
}
//日期映射
export enum weekStatus {
  'firstDay' = 1,
  'secondDay',
  'thirdDay',
  'fourthDay',
  'fifthDay',
  'sixthDay',
  'seventhDay',
}
//时间状态
export enum times {
  past, //已结束
  now, //进行中
  future, //未开始
}
//content组件参数
export type contentType = {
  name: string; //表格填充的文字内容，为空字符串则，在组件内根据状态填充
  time: times; //事件
  state: status; //日程状态
  x: number; //横坐标
  y: number; //纵坐标
  checked: boolean; //纵坐标
};
//选项列表对象的类型
export type eventMeun = { [key in status]: [string, () => void][] };

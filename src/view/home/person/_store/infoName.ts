import { userInfo } from '@/types/userInfo';

export const infoName: { [key in (typeof userInfo)[number]]: string } = {
  name: '姓名',
  gender: '性别',
  age: '年龄',
  birthday: '生日',
  number: '学号',
  phone: '电话',
  grade: '期数',
  direction: '方向',
  major: '专业',
  class: '班级',
  email: '邮箱',
};

export const baseInfo: Array<(typeof userInfo)[number]> = [
  'name',
  'gender',
  'grade',
  'age',
  'direction',
  'major',
  'class',
];

export const chouseInfo: Array<(typeof userInfo)[number]> = [
  'name',
  'gender',
  'number',
  'grade',
  'direction',
];

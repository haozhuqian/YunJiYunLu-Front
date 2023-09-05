import { userInfo } from '@/types/userInfo';

export default {
  name: { name: '姓名', readonly: true },
  email: {
    name: '邮箱',
    verifys: [
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '邮箱格式不正确!' },
    ],
  },
  phone: {
    name: '电话',
    verifys: [
      (value) =>
        /^\d{11}$/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '手机号格式应当为11位数字!' },
    ],
  },
  class: { name: '班级', verifys: [] },
  grade: { name: '期数', readonly: true },
  direction: { name: '方向', readonly: true },
  gender: { name: '性别', option: ['男', '女'] },
  major: { name: '专业', verifys: [] },
  number: { name: '学号', readonly: true },
  birthday: {
    name: '生日',
    verifys: [
      (value) =>
        /^\d{4}[-.]\d{2}[-.]\d{2}$/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '日期格式应当为YYYY-MM-DD或YYYY.MM.DD!' },
    ],
  },
  age: {
    name: '年龄',
    verifys: [
      (value) =>
        /^\d{1,3}$/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '请输入适当的整数!' },
    ],
  },
} as {
  [key in (typeof userInfo)[number]]: { name: string } & (
    | { readonly: true }
    | { option: string[] }
    | {
        verifys: ((value: string) => {
          reasult: boolean;
          value: string;
        })[];
      }
  );
};

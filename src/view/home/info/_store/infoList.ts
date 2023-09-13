import { userInfo } from '@/types/userInfo';

export default {
  user_name: { name: '姓名', readonly: true },
  study_num: { name: '研学次数', readonly: true },
  absent_num: { name: '缺勤次数', readonly: true },
  leave_num: { name: '请假次数', readonly: true },
  late_num: { name: '迟到次数', readonly: true },
  early_num: { name: '早退次数', readonly: true },
  user_period: { name: '期数', readonly: true },
  user_group: { name: '方向', readonly: true },
  user_gender: { name: '性别', readonly: true },
  user_id: { name: '学号', readonly: true },
  user_academy: { name: '学院', readonly: true },
  user_email: {
    name: '邮箱',
    verifys: [
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '邮箱格式不正确!' },
    ],
  },
  user_phone: {
    name: '电话',
    verifys: [
      (value) =>
        /^\d{11}$/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '手机号格式应当为11位数字!' },
    ],
  },
  user_class: { name: '班级', verifys: [] },
  user_major: { name: '专业', verifys: [] },
  user_introduction: { name: '个性签名', verifys: [] },
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

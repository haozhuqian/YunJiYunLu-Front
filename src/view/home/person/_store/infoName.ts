import { userInfo } from '@/types/userInfo';

export const infoName: { [key in (typeof userInfo)[number]]: string } = {
  study_num: '研学次数',
  late_num: '迟到次数',
  early_num: '早退次数',
  absent_num: '缺勤次数',
  leave_num: '请假次数',
  user_name: '姓名',
  user_gender: '性别',
  user_id: '学号',
  user_phone: '电话',
  user_period: '期数',
  user_group: '方向',
  user_major: '专业',
  user_class: '班级',
  user_academy: '学院',
  user_email: '邮箱',
  user_introduction: '个性签名',
};

export const baseInfo: Array<(typeof userInfo)[number]> = [
  'user_name',
  'user_gender',
  'user_period',
  'user_id',
  'user_group',
  'user_major',
  'user_class',
];

export const chouseInfo: Array<(typeof userInfo)[number]> = [
  'user_name',
  'user_gender',
  'user_id',
  'user_period',
  'user_group',
];

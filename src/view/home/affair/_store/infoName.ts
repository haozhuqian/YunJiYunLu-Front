import { affairInfo } from '@/types/affair';

export const infoName: { [key in (typeof affairInfo)[number]]: string } = {
  student_name: '姓名',
  student_id: '学号',
  type: '类型',
  semester: '学期',
  week_num: '周数',
  day_of_week: '星期',
  class_num: '节数',
  reason: '原因',
  study_date: '日期',
};

export const baseInfo: Array<(typeof affairInfo)[number]> = [
  'student_name',
  'student_id',
  'type',
  'semester',
  'week_num',
  'day_of_week',
  'class_num',
  'reason',
  'study_date',
];

export const chouseInfo: Array<(typeof affairInfo)[number]> = [
  'student_name',
  'student_id',
  'type',
  'semester',
  'week_num',
  'day_of_week',
  'class_num',
  'study_date',
];

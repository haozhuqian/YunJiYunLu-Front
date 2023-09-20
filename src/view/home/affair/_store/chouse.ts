import { textInputPropsType, selectInputPropsType } from '../_type/comProps';
import { chouseInfo } from './infoName';
export default {
  student_name: {
    name: '姓名',
    verifys: [
      (value: string) =>
        !/^\s*$/.test(value)
          ? { reasult: true, value: value }
          : { reasult: true, value: '' },
    ],
  },
  student_id: {
    name: '学号',
    verifys: [
      (value: string) => {
        return !value || /^\d{10}/.test(value)
          ? { reasult: true, value: value }
          : { reasult: false, value: '学号必须是10位数字' };
      },
    ],
  },
  type: {
    name: '类型',
    option: ['请假', '迟到', '早退', '缺勤'],
  },
  semester: {
    name: '学期',
    option: ['2022 spring', '2022 autumn', '2023 spring', '2023 autumn'],
  },
  week_num: {
    name: '周数',
    verifys: [
      (value: string) => {
        const num = Number(value);
        return num || (num > 0 && num <= 18)
          ? { reasult: true, value: value }
          : { reasult: false, value: '周数应当是1~18之间的整数' };
      },
    ],
  },
  day_of_week: {
    name: '星期',
    option: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  class_num: {
    name: '节数',
    option: ['上午第一节', '上午第二节', '下午第一节', '下午第二节'],
  },
  study_date: {
    name: '日期',
    option: ['设计', '秘书处', '全栈', 'Java', 'AI', 'CPU&OS', '适应期'],
  },
} as {
  [name in (typeof chouseInfo)[number]]:
    | textInputPropsType
    | selectInputPropsType;
};

import { detailInfoDescriptions, searchInputPropsType } from '../_type/status';
export default {
  name: {
    name: '姓名',
    verifys: [
      (value: string) =>
        /^\s*$/.test(value)
          ? { reasult: true, value }
          : { reasult: true, value: '' },
    ],
  },
  gender: {
    name: '性别',
    option: ['男', '女'],
  },
  number: {
    name: '学号',
    verifys: [
      (value: string) =>
        /^\d{10}/.test(value)
          ? { reasult: true, value }
          : { reasult: false, value: '学号必须是10位数字' },
    ],
  },
  grade: {
    name: '期数',
    option: ['五期', '六期', '七期', '八期'],
  },
  direction: {
    name: '方向',
    option: ['设计', '秘书处', '全栈', 'Java', 'AI', 'CPU&OS', '适应期'],
  },
  major: {
    name: '专业',
    option: ['软件', '别的'],
  },
} as { [key in keyof detailInfoDescriptions]?: searchInputPropsType };

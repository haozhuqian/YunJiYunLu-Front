import { searchInputPropsType } from '../_type/status';
import { chouseInfo } from './infoName';
export default [
  [
    'name',
    {
      name: '姓名',
      verifys: [
        (value: string) =>
          !/^\s*$/.test(value)
            ? { reasult: true, value: value }
            : { reasult: true, value: '' },
      ],
    },
  ],
  [
    'number',
    {
      name: '学号',
      verifys: [
        (value: string) => {
          return !value || /^\d{10}/.test(value)
            ? { reasult: true, value: value }
            : { reasult: false, value: '学号必须是10位数字' };
        },
      ],
    },
  ],
  [
    'gender',
    {
      name: '性别',
      option: ['男', '女'],
    },
  ],
  [
    'grade',
    {
      name: '期数',
      option: ['五期', '六期', '七期', '八期'],
    },
  ],
  [
    'direction',
    {
      name: '方向',
      option: ['设计', '秘书处', '全栈', 'Java', 'AI', 'CPU&OS', '适应期'],
    },
  ],
] as [name: (typeof chouseInfo)[number], props: searchInputPropsType][];

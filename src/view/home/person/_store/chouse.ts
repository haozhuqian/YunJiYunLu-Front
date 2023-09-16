import { textInputPropsType, selectInputPropsType } from '../_type/comProps';
import { chouseInfo } from './infoName';
export default [
  [
    'user_name',
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
    'user_id',
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
    'user_gender',
    {
      name: '性别',
      option: ['男', '女'],
    },
  ],
  [
    'user_period',
    {
      name: '期数',
      option: ['五期', '六期', '七期', '八期'],
    },
  ],
  [
    'user_group',
    {
      name: '方向',
      option: ['设计', '秘书处', '全栈', 'Java', 'AI', 'CPU&OS', '适应期'],
    },
  ],
] as [
  name: (typeof chouseInfo)[number],
  props: textInputPropsType | selectInputPropsType,
][];

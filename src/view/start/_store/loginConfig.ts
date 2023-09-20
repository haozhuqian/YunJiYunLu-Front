import { textInputPropsType } from '@/components/textInput/_type';
const loginInputConfig: (textInputPropsType & { realName: string })[] = [
  {
    name: '账号',
    realName: 'id',
    verifys: [
      (value: string) =>
        value
          ? { reasult: true, value }
          : { reasult: false, value: '账号不能为空' },
    ],
  },
  {
    name: '密码',
    realName: 'password',
    verifys: [
      (value: string) =>
        value
          ? { reasult: true, value }
          : { reasult: false, value: '密码不能为空' },
    ],
  },
];
export default loginInputConfig;

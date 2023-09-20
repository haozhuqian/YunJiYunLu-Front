import { textInputPropsType } from '@/components/textInput/_type';

const Pwdconfig: (textInputPropsType & { realName: string })[] = [
  {
    name: '旧密码',
    realName: 'oldPassword',
    verifys: [
      (value) =>
        value
          ? { value, reasult: true }
          : { value: '不能为空', reasult: false },
    ],
  },
  {
    name: '新密码',
    realName: 'newPassword',
    verifys: [
      (value) =>
        value
          ? { value, reasult: true }
          : { value: '不能为空', reasult: false },
    ],
  },
  {
    name: '重复新密码',
    realName: 'reNewPassword',
    verifys: [
      (value) =>
        value
          ? { value, reasult: true }
          : { value: '不能为空', reasult: false },
    ],
  },
];

export default Pwdconfig;

import { defineStore } from 'pinia';
import { role } from '@/types/route';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    role: role.visitor,
    info: {
      user_name: '郝祝乾',
      user_email: 'good-money@foxmail.com',
      user_phone: '15034281331',
      user_class: '软件2110',
      user_period: '6期',
      user_group: '全栈',
      user_gender: '男',
      user_major: '软件工程',
      user_id: '2021005381',
      user_academy: '软件学院',
      user_introduction: 'I am good-money!',
      study_num: '0',
      late_num: '0',
      early_num: '0',
      absent_num: '0',
      leave_num: '0',
    },
  }),
  actions: {
    //鉴权方法，用户具有该权限则返回true
    accessable(role: role): boolean {
      return Boolean(role & this.role);
    },
  },
  getters: {},
  persist: true,
});

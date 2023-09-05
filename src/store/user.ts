import { defineStore } from 'pinia';
import { role } from '@/types/route';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    token: '',
    role: role.visitor,
    info: {
      name: '郝祝乾',
      email: 'good-money@foxmail.com',
      phone: '15034281331',
      class: '软件2110',
      grade: '6期',
      direction: '全栈',
      gender: '男',
      major: '软件工程',
      number: '2021005381',
      birthday: '2003.01.09',
      age: '20',
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

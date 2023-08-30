import { defineStore } from 'pinia';
import { role } from '@/types/route';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    token: '',
    role: role.visitor,
    info: [
      {
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
      {
        name: '马荣臻',
        email: 'RongSCM@gmail.com',
        phone: '15035601353',
        class: '软件2247',
        grade: '7期',
        direction: '全栈',
        gender: '男',
        major: '软件工程',
        number: '2022006340',
        birthday: '2004.06.25',
        age: '19',
      },
    ],
  }),
  actions: {
    accessable(role: role): boolean {
      return Boolean(role & this.role);
    },
  },
  getters: {},
  persist: true,
});

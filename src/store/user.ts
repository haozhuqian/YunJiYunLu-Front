import { defineStore } from 'pinia';
import { role } from '@/router/type';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    token: '',
    role: role.visitor,
    info: {
      name: '',
    },
  }),
  actions: {
    accessable(role: role): boolean {
      return Boolean(role & this.role);
    },
  },
  getters: {},
  persist: true,
});

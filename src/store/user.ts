import { defineStore } from 'pinia';
import { role } from '@/types/route';

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

import { defineStore } from 'pinia';

export const useStore = defineStore('user', {
  state: () => {
    return {
      id: '',
      token: '',
      permission: '',
      info: {
        name: '',
      },
    };
  },
  actions: {},
  getters: {},
  persist: true,
});

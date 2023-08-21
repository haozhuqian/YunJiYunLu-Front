import { defineStore } from 'pinia';
import { site, theme } from '@/types/setting';

export const useSetStore = defineStore('setting', {
  state: () => ({
    theme: theme.day,
    menuSite: site.left,
  }),
  actions: {},
  getters: {},
  persist: true,
});

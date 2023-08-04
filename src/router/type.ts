import { RouteRecordRaw } from 'vue-router';

export type RouterInfo = Partial<RouteRecordRaw> & {
  routes?: RouteRecordRaw[];
};

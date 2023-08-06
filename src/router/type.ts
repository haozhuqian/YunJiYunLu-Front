import { RouteComponent, RouteRecordRaw } from 'vue-router';

export type RouterInfo = Partial<RouteRecordRaw> & {
  routes?: RouteRecordRaw[];
};

export const view = Symbol('view');
export const rInf = Symbol('rInf');
export interface IModule {
  [propName: string]: IModule;
  [view]?: RouteComponent | (() => Promise<RouteComponent>);
  [rInf]?: RouteRecordRaw;
}

export const routeValue = Symbol('route');
export interface RModule {
  [propName: string]: RModule;
  [routeValue]?: RouteRecordRaw;
}

import { RouteComponent, RouteRecordRaw } from 'vue-router';

import 'vue-router';
//定义路由配置文件对象的类型，实际上只是将原有的所有路由配置选项设置为可选
export type RouterInfo = Partial<RouteRecordRaw>;
//设置symbol类型，分别在路由对象中表示页面组件与路由配置
export const view = Symbol('view');
export const rInf = Symbol('rInf');
//定义路由对象类型，这个对象的会将文件结构梳理为树状模型，
//它的普通(字符串)属性就是子路由，子路由类型与IMondule相同，
//它的符号属性只能有view与rInf，值分别是页面组件与路由配置对象，
export interface IModule {
  [propName: string]: IModule;
  [view]?: RouteComponent | (() => Promise<RouteComponent>);
  [rInf]?: RouteRecordRaw;
}
//定义插件中使用的路由对象
export const routeValue = Symbol('route');
export interface RModule {
  [propName: string]: RModule;
  [routeValue]?: RouteRecordRaw;
}

//定义路由元信息的类型，增加了必选的role属性
declare module 'vue-router' {
  interface RouteMeta {
    role: role;
    intro?: string;
  }
}

// 权限枚举量
export enum role {
  Total = 1 << 0,
  Department = 1 << 1,
  Admin = 1 << 2,
  Normal = 1 << 3,
  visitor = 1 << 4,
  dev = 1 << 5,
}

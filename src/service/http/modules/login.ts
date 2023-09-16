import request from '@/service/http';

//后台管理系统登录
export const login = (data: any) => request.post({ url: '/user/login' }, data);
//研学签到界面登录
export const home = (data: any) =>
  request.post({ url: '/arrange/signLogin' }, data);

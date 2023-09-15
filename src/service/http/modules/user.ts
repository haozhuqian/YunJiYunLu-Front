import request from '@/service/http/request';
export const login = (data: { password: string; userIdOrPhone: string }) =>
  request.post({ url: '/user/login' }, data);
export const logout = () => request.post({ url: '/user/logout' });
export const register = (data: any) =>
  request.post({ url: '/user/register' }, data);
export const select = (data: any) =>
  request.get({ url: '/user/selectUserInfo' }, data);
export const showSelf = () => request.post({ url: '/user/showMyself' });
export const updatePwd = (data: any) =>
  request.post({ url: '/user/updatePwd' }, data);
export const updateInfo = (data: any) =>
  request.post({ url: '/user/updateUserInfo' }, data);

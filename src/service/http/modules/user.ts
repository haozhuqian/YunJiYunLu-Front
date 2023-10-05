import request from '@/service/http';

//获得学院和专业
export const getAcademyAndMajors = () =>
  request.get({ url: '/user/getAcademyAndMajors' });
//获得期数列表
export const getPeriods = () => request.get({ url: '/user/getPeriods' });
//excel表导入小组账号
export const importGroups = (data: any) =>
  request.post({ url: '/user/importGroups' }, data);
//excel表导入极客和学员信息
export const importUsers = (data: any) =>
  request.post({ url: '/user/importUsers' }, data);
//登录
export const login = (data: any) => request.post({ url: '/user/login' }, data);
//登出
export const logout = (data: any) =>
  request.post({ url: '/user/logout' }, data);
//注册
export const register = (data: any) =>
  request.post({ url: '/user/register' }, data);
//删除用户
export const removeUser = () => request.delete({ url: '/user/removeUser' });
//重置密码
export const resetPwd = (data: any) =>
  request.post({ url: '/user/resetPwd' }, data);
//搜索用户信息
export const selectUserInfo = (data: any) =>
  request.get({ url: '/student/selectUserInfo' }, data);
//展示用户个人信息
export const showMyself = (data: any) =>
  request.post({ url: '/user/showMyself' }, data);
//修改密码
export const updatePwd = (data: any) =>
  request.post({ url: '/user/updatePwd' }, data);
//修改个人信息
export const updateUserInfo = (data: any) =>
  request.post({ url: '/user/updateUserInfo' }, data);

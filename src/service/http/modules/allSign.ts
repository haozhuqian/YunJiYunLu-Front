import request from '@/service/http';

//设置会议,将总表复制到全员列表中
export const setConference = () => request.get({ url: '/allSign/all/copy' });
//结算本次签到
export const settlement = () => request.get({ url: '/allSign/settlement' });
//显示学生信息
export const showInfo = () => request.get({ url: '/allSign/showInfo' });
//根据组来返回学生信息
export const showStudent = () => request.get({ url: '/allSign/showStudent' });
//签到接口
export const signIn = (data: any) =>
  request.post({ url: '/allSign/sign/in' }, data);
//请假接口
export const signLeave = (data: any) =>
  request.post({ url: '/allSign/sign/leave' }, data);
//签退接口
export const signOut = (data: any) =>
  request.post({ url: '/allSign/sign/out' }, data);
//返回初始状态
export const signReturn = signIn;

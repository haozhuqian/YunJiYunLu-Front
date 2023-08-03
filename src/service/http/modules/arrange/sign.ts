import request from '@/service/http/request';
//签到
export const signIn = (data: any) => {
  request.post({ url: '/arrange/sign/in' }, data);
};
//签退
export const signOut = (data: any) => {
  request.post({ url: '/arrange/sign/out' }, data);
};
//请假
export const signLeave = (data: any) => {
  request.post({ url: '/arrange/sign/leave' }, data);
};
//返回初始状态
export const signReturn = (data: any) => {
  request.post({ url: '/arrange/sign/return' }, data);
};

import request from '@/service/http/request';

//设置会议
export const setConference = () => {
  request.get({ url: '/allSign/all/copy' });
};
//大会成员信息获取
export const conGet = () => {
  request.get({ url: '/allSign/showInfo' });
};
//大会签到
export const signIn = (data: any) => {
  request.post({ url: '/allSign/sign/in' }, data);
};
//大会签退
export const signOut = (data: any) => {
  request.post({ url: '/allSign/sign/out' }, data);
};
//大会请假
export const signLeave = (data: any) => {
  request.post({ url: '/allSign/sign/leave' }, data);
};
//返回初始状态
export const signReturn = signIn;

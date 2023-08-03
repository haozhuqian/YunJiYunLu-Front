import request from '@/service/http/request';

//请求今日晚自习安排
export const showNightStudent = (data: any) => {
  request.get({ url: '/showNightStudent' }, data);
};
//晚自习签到
export const signNight = (data: any) => {
  request.post({ url: '/sign' }, data);
};
//晚自习签退
export const signOutNight = (data: any) => {
  request.post({ url: '/signOut' }, data);
};
//晚自习请假
export const leaveNight = (data: any) => {
  request.post({ url: '/leave' }, data);
};
//新生晚自习安排按钮
export const arrageNightStudent = (data: any) => {
  request.get({ url: '/arrageNigthClass' }, data);
};

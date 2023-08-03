import request from '@/service/http/request';

//极创客今日排班
export const classJi = () => {
  request.get({ url: '/duty/todayduty' });
};
//极创客拖拽修改排班
export const jiChuange = (data: any) => {
  request.post({ url: '/duty/angeDutyClass' }, data);
};
//极创客签到
export const signIn = (data: any) => {
  request.post({ url: '/duty/sign/in' }, data);
};
//极创客签退
export const signOut = (data: any) => {
  request.post({ url: '/duty/sign/out' }, data);
};
//极创客请假
export const signLeave = (data: any) => {
  request.post({ url: '/duty/sign/leave' }, data);
};
//返回初始状态
export const signReturn = (data: any) => {
  request.post({ url: '/duty/sign/return' }, data);
};
//极创客第二天排班
export const dutyGroupGet = () => {
  request.get({ url: '/duty/tomorrowduty' });
};
//有空课但未安排（极创客）
export const dutyGetTomorrow = (data: any) => {
  request.get({ url: '/duty/todayduty' }, data);
};
//添加极创客至明日研学名单
export const dutyAdd = (data: any) => {
  request.post({ url: '/duty/dutyAdd' }, data);
};
//取消极创客明天研学安排
export const dutyDel = (data: any) => {
  request.get({ url: '/duty/cancel' }, data);
};

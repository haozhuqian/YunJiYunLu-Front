import request from '@/service/http';

// type groupInfo = { groupId: number; place: string };

//增加研学
export const addStudy = (data: any) =>
  request.post({ url: '/arrange/StudyAdd' }, data);
//返回当前小组有空课但未安排的名单
export const studentAddList = () =>
  request.get({ url: '/arrange/StudyAddList' });
//取消学生某日研学安排
export const studentDel = () => request.get({ url: '/arrange/cancel' });
//研学签到接口
export const studySignIn = (data: any) =>
  request.post({ url: '/arrange/sign/in' }, data);
//请今日的假
export const studySignLeave = (data: any) =>
  request.post({ url: '/arrange/sign/leave' }, data);
//签退接口
export const studySignOut = (data: any) =>
  request.post({ url: '/arrange/sign/out' }, data);
//返回初始状态接口
export const studySignReturn = (data: any) =>
  request.post({ url: '/arrange/sign/return' }, data);
//按照小组获取今日排课信息
export const tableGetToday = () =>
  request.get({ url: '/arrange/todayStudy/group' });
//按照小组获取本周某日排课信息
export const tableGetSomeday = (dayNum: number, groupId: number) =>
  request.get({ url: '/arrange/whichDayStudy/group' }, { dayNum, groupId });

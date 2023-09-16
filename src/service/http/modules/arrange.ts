import request from '@/service/http';

type groupInfo = { groupId: number; place: string };

//按照小组获取今日排课信息
export const tableGetToday = (data: groupInfo) =>
  request.get({ url: '/arrange/todayStudy/group' }, data);
//按照小组获取明日排课信息
export const tableGetTomorrow = (data: groupInfo) =>
  request.get({ url: '/arrange/tomorrowStudy/group' }, data);

//获取分组
export const groupGet = () => request.get({ url: '/group/getGroup' });

//返回当前小组有空课但未安排的名单
export const studentAddList = (data: any) =>
  request.get({ url: '/arrange/StudyAddList' }, data);
//添加学生至明日研学名单
export const studentAdd = (data: any) =>
  request.post({ url: '/arrange/StudyAdd' }, data);
//取消学生明天研学安排
export const studentDel = (data: any) =>
  request.get({ url: '/arrange/cancel' }, data);

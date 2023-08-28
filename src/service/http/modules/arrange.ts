import request from '@/service/http/request';

type groupInfo = { groupId: number; place: string };

//按照小组获取今日排课信息
export const tableGetToday = (data: groupInfo) =>
  request.get({ url: '/arrange/todayStudy/group' }, data);
//按照小组获取明日排课信息
export const tableGetTomorrow = (data: groupInfo) => {
  request.get({ url: '/arrange/tomorrowStudy/group' }, data);
};

//获取分组
export const groupGet = () => request.get({ url: '/group/getGroup' });

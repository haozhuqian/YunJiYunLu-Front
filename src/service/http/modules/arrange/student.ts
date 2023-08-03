import request from '@/service/http/request';

//返回当前小组有空课但未安排的名单
export const studentAddList = (data: any) => {
  request.get({ url: '/arrange/StudyAddList' }, data);
};
//添加学生至明日研学名单
export const studentAdd = (data: any) => {
  request.post({ url: '/arrange/StudyAdd' }, data);
};
//取消学生明天研学安排
export const studentDel = (data: any) => {
  request.get({ url: '/arrange/cancel' }, data);
};

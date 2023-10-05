import request from '@/service/http';

//调研学
export const change = (data: any) => request.post({ url: '/change' }, data);
//排课
export const newArrange = () => request.get({ url: '/newArrange' });
//请假
export const newLeave = (data: any) => request.post({ url: '/newLeave' }, data);
//获取个人日程表
export const newPersonSchedule = () =>
  request.get({ url: '/newPersonSchedule' });
//取消请假
export const newReLeave = (data: any) =>
  request.post({ url: '/newReLeave' }, data);
//每天更新todayStudy表
export const updateTodayStudy = () => request.get({ url: '/updateTodayStudy' });

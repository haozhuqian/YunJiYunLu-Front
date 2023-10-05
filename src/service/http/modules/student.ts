import request from '@/service/http';

//通过excel添加学生,录课
export const importExcel = (data: any) =>
  request.post({ url: '/student/importExcel' }, data);
//所有人研学次数
export const signCount = () => request.get({ url: '/student/signCount' });

//事务管理

//主动早退
export const applyForEarlyLeave = (data: any) =>
  request.post({ url: '/student/applyForEarlyLeave' }, data);
//查看异常签到情况
export const getAffair = (data: any) =>
  request.post({ url: '/student/getAffair' }, data);
//获取用户当前状态
export const getCurrentState = () =>
  request.get({ url: '/student/getCurrentState' });
//获得学期列表
export const getSemesters = (data: any) =>
  request.get({ url: '/student/getSemesters' }, data);
//获取用户本周内指定时间的研学状态
export const getStudyState = () =>
  request.get({ url: '/student/getStudyState' });
//填写迟到原因
export const lateReason = (data: any) =>
  request.post({ url: '/student/lateReason' }, data);
//结算（每节课签退时间结束后）
export const settleClass = (data: any) =>
  request.post({ url: '/student/settleClass' }, data);

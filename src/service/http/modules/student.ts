import request from '@/service/http';
export const addToGroup = (data: any) =>
  request.post({ url: '/student/addToGroup' }, data);
export const changeGroup = (data: any) =>
  request.put({ url: '/student/changeGroup' }, data);
export const deleteFromGroup = (data: any) =>
  request.delete({ url: '/student/deleteFromGroup' }, data);
export const getAffair = (data: any) =>
  request.get({ url: '/student/getAffair' }, data);
export const getStudentInfo = (data: any) =>
  request.get({ url: '/student/getStudentInfo' }, data);
export const importExcel = (data: any) =>
  request.post({ url: '/student/importExcel' }, data);
export const remove = (data: any) =>
  request.delete({ url: '/student/removeStudent' }, data);
export const select = (data: any) =>
  request.post({ url: '/student/selectStudent' }, data);
export const signCount = (data: any) =>
  request.get({ url: '/student/signCount' }, data);

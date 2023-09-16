import request from '@/service/http';

//饼状图数据获取 & 所有签到学生信息获取
export const getAllStudents = (data: string) =>
  request.get({ url: `/infor/showSignInfo/${data}` });
// 获取后台总人数
export const statisticsGet = () =>
  request.get({ url: '/infor/showSignInfo/today' });
//删除新生
export const delateStudent = (data: any) =>
  request.delete({ url: `/infor/deleteStudentInformation${data}` });
//搜索新生
export const searchStudent = () =>
  request.post({ url: '/student/selectStudent' });
//添加新生（通过Excel）
export const importExcel = (data: any) =>
  request.post({ url: '/student/importExcel' }, data);

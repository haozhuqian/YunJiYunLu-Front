import request from '@/service/http';

//饼状图，返回签到信息
export const getAllStudents = (data: string) =>
  request.get({ url: `/infor/showSignInfo/${data}` });

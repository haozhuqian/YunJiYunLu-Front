import request from '@/service/http';

//修改空课信息
export const classUpdate = (data: any) =>
  request.put({ url: '/class/update' }, data);

//上传空课信息
export const classUpload = (data: any) =>
  request.post({ url: 'class/register' }, data);
//查询空课
export const classCheck = (data: any) =>
  request.get({ url: '/class/getClass' }, data);

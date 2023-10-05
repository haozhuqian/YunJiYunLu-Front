import request from '@/service/http';

//获取分组
export const getGroup = () => request.get({ url: '/group/getGroup' });
//显示组的名称和一句话
export const showGroupInfo = () => request.get({ url: '/group/showGroupInfo' });
//更换签到分组
export const updateGroup = (data: any, type: any) =>
  request.post({ url: `/group/updateGroup/${type}` }, data);

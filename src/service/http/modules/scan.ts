import request from '@/service/http';

//扫码
export const scan = (data: any) =>
  request.post({ url: '/scan/scanQRCode' }, data);
//总账号展示二维码
export const show = (data: any) =>
  request.post({ url: '/scan/showQRCode' }, data);

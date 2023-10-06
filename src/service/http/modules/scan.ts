import request from '@/service/http';

//扫码
export const scan = (classNum: number, qrcode: string) =>
  request.post({ url: '/scan/scanQRCode' }, { classNum, qrcode });
//总账号展示二维码
export const show = () => request.post({ url: '/scan/showQRCode' });

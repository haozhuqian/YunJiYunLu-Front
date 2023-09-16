import request from '@/service/http';
export const show = () => request.post({ url: '/scan/showQRCode' });
export const signIn = (data: any) =>
  request.post({ url: '/scan/signIn' }, data);
export const signOut = (data: any) =>
  request.post({ url: '/scan/signOut' }, data);
export const state = (data: any) => request.post({ url: '/scan/state' }, data);

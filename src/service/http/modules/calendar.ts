import request from '@/service/http';
export const change = (data: any) => request.post({ url: '/change' }, data);
export const get = () => request.post({ url: '/getCalendar' });
export const leave = (data: any) => request.post({ url: '/leave2' }, data);
export const releave = (data: any) => request.post({ url: '/releave' }, data);

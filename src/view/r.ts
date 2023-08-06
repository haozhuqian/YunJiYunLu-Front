import type { RouterInfo } from '@/router/type';

export default {
  meta: {
    role: ['common', 'admin'],
  },
  path: '/',
  children: [
    {
      path: '',
      name: 'index',
      redirect: 'start',
    },
  ],
} as RouterInfo;

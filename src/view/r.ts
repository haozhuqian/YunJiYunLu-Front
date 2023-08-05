import type { RouterInfo } from '@/router/type';

export default {
  meta: {
    role: ['common', 'admin'],
  },
  routes: [
    {
      path: '',
      redirect: 'start',
    },
  ],
} as RouterInfo;

import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.visitor,
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

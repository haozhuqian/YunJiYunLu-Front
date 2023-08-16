import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Normal | role.Admin,
    intro: '个人',
  },
  props: true,
} as RouterInfo;

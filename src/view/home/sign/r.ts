import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Normal | role.Admin,
    intro: '打卡',
  },
  props: true,
} as RouterInfo;

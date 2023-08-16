import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Dapartment | role.Total,
    intro: '被打卡',
  },
  props: true,
} as RouterInfo;

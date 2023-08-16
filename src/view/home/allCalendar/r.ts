import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Dapartment | role.Total,
    intro: '全体日程',
  },
  props: true,
} as RouterInfo;

import type { RouterInfo } from '@/types/route';
import { role } from '@/types/route';

export default {
  meta: {
    role: role.Department | role.Total,
    intro: '全体日程',
  },
  props: true,
} as RouterInfo;

import type { RouterInfo } from '@/types/route';
import { role } from '@/types/route';

export default {
  meta: {
    role: role.Normal | role.Admin,
    intro: '日程',
  },
  props: true,
} as RouterInfo;

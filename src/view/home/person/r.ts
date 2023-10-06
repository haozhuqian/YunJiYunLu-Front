import type { RouterInfo } from '@/types/route';
import { role } from '@/types/route';

export default {
  meta: {
    role: role.Admin | role.Department | role.Total,
    intro: '人员管理',
  },
  props: true,
} as RouterInfo;

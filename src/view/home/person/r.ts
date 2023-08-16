import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Admin | role.Dapartment | role.Total,
    intro: '人员管理',
  },
  props: true,
} as RouterInfo;

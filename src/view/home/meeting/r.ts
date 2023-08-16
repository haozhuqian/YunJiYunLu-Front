import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Admin | role.Dapartment | role.Total,
    intro: '会议',
  },
  props: true,
} as RouterInfo;

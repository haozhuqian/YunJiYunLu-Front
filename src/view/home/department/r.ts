import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: role.Total,
    intro: '部门',
  },
  props: true,
} as RouterInfo;

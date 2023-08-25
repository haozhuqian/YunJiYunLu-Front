import type { RouterInfo } from '@/types/route';
import { role } from '@/types/route';

export default {
  meta: {
    // role: role.Total,
    role: role.dev,
    intro: '部门',
  },
  props: true,
} as RouterInfo;

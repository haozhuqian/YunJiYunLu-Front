import type { RouterInfo } from '@/router/type';
import { role } from '@/router/type';

export default {
  meta: {
    role: ~role.visitor,
  },
  props: true,
} as RouterInfo;

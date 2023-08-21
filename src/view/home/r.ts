import type { RouterInfo } from '@/types/route';
import { role } from '@/types/route';

export default {
  meta: {
    role: ~role.visitor,
  },
  props: true,
} as RouterInfo;

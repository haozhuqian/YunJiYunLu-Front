import type { RouterInfo } from '@/types/route';
import { role } from '@/types/route';
import { useUserStore } from '@/store/user';
export default {
  meta: {
    role: ~role.visitor,
  },
  props: true,
  beforeEnter: (from) => {
    const user = useUserStore();
    let redirect = 'calendar';
    switch (user.role) {
      case role.Normal:
      case role.Admin:
        break;
      case role.visitor:
        redirect = 'start';
        break;
      case role.Dapartment:
        redirect = 'person';
        break;
      case role.Total:
        redirect = 'toSign';
        break;
      case role.dev:
        redirect = 'meeting';
    }
    if (from.name === redirect) return;
    return { name: redirect };
  },
} as RouterInfo;

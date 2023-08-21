import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './autoImport';
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';

console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const user = useUserStore();

  if (!user.accessable(to.meta.role)) {
    ElMessage.error('您没有权限访问');

    if (user.token) {
      console.log(Boolean(user.token));
      return { name: 'home' };
    }
    return false;
  }
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

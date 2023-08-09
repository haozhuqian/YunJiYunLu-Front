import { createRouter, createWebHistory } from 'vue-router';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
import routes from './autoImport';
console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (_to, _from) => {
//   NProgress.start();
// });

// router.afterEach((_to) => {
//   NProgress.done();
// });

export default router;

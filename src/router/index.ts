import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      component: () => import('@/view/login/Login.vue'),
    },
    {
      path: '/home',
      component: () => import('@/view/home/Home.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/view/default/Default.vue'),
    },
  ],
});

export default router;

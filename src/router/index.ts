import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/start',
    },
    {
      path: '/start',
      component: () => import('@/view/start/Start.vue'),
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

import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/home/layout/HomeLayout.vue'),
    children: [{ path: '', component: () => import('src/home/pages/HomePage.vue') }],
  },
];

import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/home/layout/HomeLayout.vue'),
    children: [
      { path: 'home', name: 'home.page', component: () => import('src/home/pages/HomePage.vue') },
      { path: '', name: 'home.redirect', redirect: { name: 'home.page' } },
    ],
  },
];

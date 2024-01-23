import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layout/AuthLayout.vue'),
    children: [
      { path: '', name: 'auth.redirect', redirect: { name: 'auth.login' } },
      { path: 'login', name: 'auth.login', component: () => import('../pages/LoginPage.vue') },
    ],
  },
];

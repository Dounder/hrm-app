import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('../layout/AuthLayout.vue'),
    children: [
      { path: '', name: '', redirect: { name: 'auth.login' } },
      { path: 'login', name: 'login', component: () => import('../pages/LoginPage.vue') },
    ],
  },
];

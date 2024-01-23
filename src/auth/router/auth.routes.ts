import { RouteRecordRaw } from 'vue-router';
import { useAuth } from '../composables';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layout/AuthLayout.vue'),
    beforeEnter: (_, __, next) => {
      const { isAuthenticated } = useAuth();

      isAuthenticated ? next({ name: 'home.page' }) : next();
    },
    children: [
      { path: '', name: 'auth.redirect', redirect: { name: 'auth.login' } },
      { path: 'login', name: 'auth.login', component: () => import('../pages/LoginPage.vue') },
    ],
  },
];

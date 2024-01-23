import { useAuth } from 'src/auth';
import { RouteRecordRaw } from 'vue-router';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/home/layout/HomeLayout.vue'),
    beforeEnter: (_, __, next) => {
      const { isAuthenticated } = useAuth();

      isAuthenticated ? next() : next({ name: 'auth.login' });
    },
    children: [{ path: '', name: 'home.page', alias: 'home', component: () => import('src/home/pages/HomePage.vue') }],
  },
];

import { authRoutes } from 'src/auth/router';
import { homeRoutes } from 'src/home';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  ...homeRoutes,
  ...authRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/shared/pages/ErrorNotFound.vue'),
  },
];

export default routes;

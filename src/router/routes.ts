import { authRoutes } from 'src/auth/router';
import { employeeRoutes } from 'src/employee/router/employee.routes';
import { homeRoutes } from 'src/home';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  ...homeRoutes,
  ...authRoutes,
  ...employeeRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/shared/pages/ErrorNotFound.vue'),
  },
];

export default routes;

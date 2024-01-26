import { RouteRecordRaw } from 'vue-router';

import { adminRoutes } from 'src/modules/admin';
import { authRoutes } from 'src/modules/auth/router';
import { employeeRoutes } from 'src/modules/employee';

const routes: RouteRecordRaw[] = [
  ...adminRoutes,
  ...authRoutes,
  ...employeeRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/common/pages/ErrorNotFound.vue'),
  },
];

export default routes;

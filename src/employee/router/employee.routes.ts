import { useAuth } from 'src/auth';
import { UserRole } from 'src/users';
import { RouteRecordRaw } from 'vue-router';

export const employeeRoutes: RouteRecordRaw[] = [
  {
    path: '/employee',
    name: 'employee.page',
    component: () => import('../layout/EmployeeLayout.vue'),
    beforeEnter: (_, __, next) => {
      const { isAuthenticated, userHasRoles } = useAuth();

      const isEmployee = userHasRoles([UserRole.Employee]);

      isAuthenticated && isEmployee ? next() : next({ name: 'auth.login' });
    },
    children: [
      {
        path: '',
        name: 'employee.home',
        component: () => import('../pages/EmployeePage.vue'),
      },
    ],
  },
];

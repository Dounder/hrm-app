import { RouteRecordRaw } from 'vue-router';

import { useAuth } from 'src/auth';
import { UserRole } from 'src/users';

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/home/layout/HomeLayout.vue'),
    beforeEnter: (_, __, next) => {
      const { isAuthenticated, userHasRoles } = useAuth();

      if (!isAuthenticated) return next({ name: 'auth.login' }); //* Redirect to login page if not authenticated

      const hasValidRoles = userHasRoles([UserRole.Admin, UserRole.Manager]);
      if (hasValidRoles.value) return next(); //* Continue if user has valid roles (Admin or Manager)

      const isEmployee = userHasRoles([UserRole.Employee]);
      if (isEmployee.value) return next({ name: 'employee.page' }); //* Redirect to employee page if user is an Employee

      next({ name: 'auth.login' }); //* Redirect to an unauthorized page or some other fallback
    },
    children: [
      { path: '', name: 'home.page', alias: 'home', component: () => import('src/home/pages/HomePage.vue') },

      //? Users
      {
        path: 'users',
        name: 'users.page',
        component: () => import('src/users/pages/UsersPage.vue'),
      },

      //? Employees
      { path: 'employees', name: 'employees.page', component: () => import('src/employees/pages/EmployeesPage.vue') },
    ],
  },
];

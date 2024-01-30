import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { api } from 'src/boot';
import { useDialog } from 'src/modules/common';
import { AddEmployeeResponse, Employee, EmployeeToUpdate, NewEmployee } from '..';

const { alertDialog } = useDialog();

const addEmployee = async (employee: NewEmployee) => {
  try {
    const { data } = await api.post<AddEmployeeResponse>('/employee', {
      ...employee,
      salary: parseFloat((employee.salary as string).replace(',', '')),
      extraHourRate: parseFloat(employee.extraHourRate as string),
    });

    alertDialog({
      title: 'Empleado creado',
      html: true,
      message: `<span> El empleado <b>${employee.name}</b> ha sido creado correctamente</span>
      <br>
      <span>Las credenciales de acceso son:</span>
      <br>
      <span><b>Usuario:</b> ${data.data.user.username}</span>
      <br>
      <span><b>Contraseña:</b> ${data.data.user.password}</span>
      `,
    });

    return data;
  } catch (error) {
    alertDialog({ title: 'Error', message: 'No se pudo crear el empleado' });

    throw error;
  }
};

const updateEmployee = async (employee: EmployeeToUpdate) => {
  try {
    await api.put(`/employee/${employee.id}`, {
      ...employee,
      salary: parseFloat((employee.salary as string).replace(',', '')),
      extraHourRate: parseFloat(employee.extraHourRate as string),
    });
  } catch (error) {
    alertDialog({ title: 'Error', message: 'No se pudo actualizar el empleado' });
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    await api.delete(`/employee/${id}`);

    return id;
  } catch (error) {
    useDialog().alertDialog({ title: 'Error', message: 'No se pudo eliminar el empleado' });
    throw error;
  }
};

const restoreUser = async (id: number) => {
  try {
    await api.put(`/employee/${id}/restore`);

    return id;
  } catch (error) {
    useDialog().alertDialog({ title: 'Error', message: 'No se pudo restaurar el empleado' });
    throw error;
  }
};

export const useEmployeeMutation = () => {
  const queryClient = useQueryClient();
  type EmployeeData = { pages: { items: Employee[]; nextPage?: number }[] } | undefined;

  const updateData = (employee: void | AddEmployeeResponse) => {
    queryClient.cancelQueries({ queryKey: ['employees'], exact: false });

    queryClient.setQueryData(['employees'], (oldQueryData: EmployeeData) => {
      // Use optional chaining and nullish coalescing for cleaner code
      const pages = oldQueryData?.pages ?? [{ items: [], nextPage: 1 }];

      // Directly create the new first page and update the array
      const updatedFirstPage = { ...pages[0], items: [employee, ...pages[0].items] };

      return { pages: [updatedFirstPage, ...pages.slice(1)] };
    });
  };

  const deleteData = (deletedUserId: number) => {
    queryClient.invalidateQueries({ queryKey: ['employees'], exact: false });

    queryClient.setQueryData(['employees'], (oldQueryData?: { pages: { items: Employee[]; nextPage?: number }[] }) => {
      // Use optional chaining and nullish coalescing for cleaner code
      const pages = oldQueryData?.pages ?? [{ items: [], nextPage: 1 }];

      // Update the first page by filtering out the deleted user
      const updatedFirstPage = { ...pages[0], items: pages[0].items.filter((employee) => employee.id !== deletedUserId) };

      return { pages: [updatedFirstPage, ...pages.slice(1)] };
    });
  };

  const createEmployeeMutation = useMutation({ mutationFn: addEmployee, onSuccess: updateData });

  const updateEmployeeMutation = useMutation({ mutationFn: updateEmployee, onSuccess: updateData });

  const deleteUserMutation = useMutation({ mutationFn: deleteUser, onSuccess: deleteData });

  const restoreUserMutation = useMutation({ mutationFn: restoreUser, onSuccess: deleteData });

  return {
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteUserMutation,
    restoreUserMutation,
  };
};

export default useEmployeeMutation;

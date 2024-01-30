<script setup lang="ts">
import { CardLayout, formatCurrency, useNotify } from 'src/modules/common';
import { useEmployee, useEmployeeMutation } from '../composable';
import { type Employee } from '../interfaces/employee.interface';

interface Props {
  employee: Employee;
}

const props = defineProps<Props>();
const { name, code, createdAt, email, salary, phone } = props.employee;
const { setEmployeeToUpdate, setShowUpdateEmployee } = useEmployee();
const { deleteUserMutation, restoreUserMutation } = useEmployeeMutation();
const { notify } = useNotify();

const onEdit = () => {
  setEmployeeToUpdate(props.employee);
  setShowUpdateEmployee(true);
};

const onDelete = async () => {
  await deleteUserMutation.mutateAsync(props.employee.id);

  if (deleteUserMutation.isSuccess.value) {
    notify({ message: 'Empleado eliminado correctamente', type: 'positive', position: 'top-right' });
  }
};

const onRestore = async () => {
  await restoreUserMutation.mutateAsync(props.employee.id);

  if (restoreUserMutation.isSuccess.value) {
    notify({ message: 'Empleado restaurado correctamente', type: 'positive', position: 'top-right' });
  }
};
</script>

<template>
  <CardLayout @on:delete="onDelete" @on:restore="onRestore" @on:edit="onEdit" :deleted="!!employee.deletedAt">
    <div class="text-h6">{{ name }}</div>
    <div class="text-subtitle2">{{ email }}</div>
    <div class="text-subtitle2">Code: {{ code }}</div>
    <div class="text-subtitle2">Salary: {{ formatCurrency(salary) }}</div>
    <div class="text-subtitle2">Phone: {{ phone }}</div>
    <div class="text-grey-6 text-overline">Created At: {{ new Date(createdAt).toLocaleDateString() }}</div>
  </CardLayout>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>

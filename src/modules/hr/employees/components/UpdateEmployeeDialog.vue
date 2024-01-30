<script setup lang="ts">
import { ref } from 'vue';

import { DialogLayout, useNotify } from 'src/modules/common';
import { EmployeeForm, useEmployee, useEmployeeMutation } from '..';

const { showUpdateEmployee, setEmployeeToUpdate, setShowUpdateEmployee, employeeToUpdate } = useEmployee();
const { updateEmployeeMutation } = useEmployeeMutation();
const { notify } = useNotify();
const isLoading = ref(false);

const onSubmit = async () => {
  if (!employeeToUpdate.value) return;

  isLoading.value = true;

  await updateEmployeeMutation.mutateAsync(employeeToUpdate.value);

  if (updateEmployeeMutation.isSuccess.value) {
    isLoading.value = false;
    notify({ message: 'Empleado actualizado correctamente', type: 'positive', position: 'top-right' });
    onReset();
  }
};

const onReset = () => {
  setShowUpdateEmployee(false);
  setEmployeeToUpdate(null);
  updateEmployeeMutation.reset();
};
</script>

<template>
  <DialogLayout :show="showUpdateEmployee" @on:hide="onReset">
    <q-inner-loading :showing="isLoading" dark>
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <EmployeeForm type="update" v-if="employeeToUpdate" :form-data="employeeToUpdate" @on:submit="onSubmit" @on:reset="onReset" />
  </DialogLayout>
</template>

<style lang="scss" scoped></style>

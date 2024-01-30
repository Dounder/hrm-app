<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import { DialogLayout } from 'src/modules/common';
import { EmployeeForm, NewEmployee, useEmployee, useEmployeeExtensions, useEmployeeMutation } from '..';

const { showAddEmployee, setShowAddEmployee } = useEmployee();
const { departmentId } = useEmployeeExtensions();
const { createEmployeeMutation } = useEmployeeMutation();

const form: NewEmployee = reactive({
  name: '',
  email: '',
  phone: '',
  dateHired: '',
  salary: '0.00',
  extraHourRate: '0.0',
  departmentId: null,
  positionId: null,
});
const isLoading = ref(false);

const onSubmit = async () => {
  isLoading.value = true;

  await createEmployeeMutation.mutateAsync(form);

  if (createEmployeeMutation.isSuccess.value) onReset();

  isLoading.value = false;
};

const onReset = () => {
  setShowAddEmployee(false);
  createEmployeeMutation.reset();
  form.name = '';
  form.email = '';
  form.phone = '';
  form.dateHired = new Date().toLocaleDateString('en-CA');
  form.salary = '0.00';
  form.extraHourRate = '0.0';
  form.departmentId = null;
  form.positionId = null;
};

watch(
  () => form.departmentId,
  (newId) => {
    if (newId) departmentId.value = newId;
  }
);
</script>

<template>
  <DialogLayout :show="showAddEmployee" @on:hide="onReset">
    <q-inner-loading :showing="isLoading" dark>
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <EmployeeForm type="create" :form-data="form" ref="employeeForm" @on:submit="onSubmit" @on:reset="onReset" />
  </DialogLayout>
</template>

<style lang="scss" scoped></style>

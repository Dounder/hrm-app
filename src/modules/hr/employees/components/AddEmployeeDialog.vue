<script setup lang="ts">
import { QForm } from 'quasar';
import { reactive, ref, watch } from 'vue';

import { DialogLayout, dateValidation, emailValidation, rangeValidation, requiredField } from 'src/modules/common';
import { NewEmployee, useEmployee, useEmployeeExtensions, useEmployeeMutation } from '..';

const { showAddEmployee, setShowAddEmployee } = useEmployee();
const { getDepartmentsQuery, getPositionsQuery, departmentId } = useEmployeeExtensions();
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
const employeeForm = ref<QForm | null>(null);
const isLoading = ref(false);

const onSubmit = async () => {
  if (!employeeForm.value || !employeeForm.value.validate()) return;

  isLoading.value = true;

  await createEmployeeMutation.mutateAsync(form);

  isLoading.value = false;

  if (createEmployeeMutation.isSuccess.value) onReset();
};

const onReset = () => {
  employeeForm.value?.resetValidation();
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

    <QForm ref="employeeForm" v-model="form" @submit="onSubmit" class="q-gutter-y-md">
      <p class="text-h6 q-mb-lg flex justify-between items-end">
        Agregar empleado
        <small class="text-body2 text-overline text-grey-6">Requerido*</small>
      </p>

      <q-input filled v-model="form.name" type="text" label="Nombre*" :rules="[requiredField]" lazy-rules />
      <q-input filled v-model="form.email" type="email" label="Correo electrónico*" :rules="[requiredField, emailValidation]" lazy-rules />
      <q-input filled v-model="form.phone" type="text" label="Teléfono*" mask="####-####" unmasked-value :rules="[requiredField]" lazy-rules />
      <q-input v-model="form.dateHired" filled type="date" label="Fecha de contratación*" :rules="[requiredField, dateValidation]" lazy-rules />
      <section class="fit row justify-between">
        <q-input
          filled
          v-model="form.salary"
          label="Salario*"
          mask="#.##"
          fill-mask="#"
          reverse-fill-mask
          input-class="text-right"
          :rules="[requiredField, (val) => rangeValidation(val, 1, 100000)]"
          lazy-rules
          @focus="form.salary = form.salary === '0.00' ? '' : form.salary"
          class="col-6 q-col-gutter-sm"
          hint="Quetzales (Q)"
        />
        <q-input
          filled
          v-model="form.extraHourRate"
          label="Tarifa de horas extra*"
          mask="#.#"
          fill-mask="#"
          reverse-fill-mask
          input-class="text-right"
          :rules="[requiredField, (val) => rangeValidation(val, 1, 100000)]"
          lazy-rules
          @focus="form.extraHourRate = form.extraHourRate === '0.0' ? '' : form.extraHourRate"
          class="col-6 q-col-gutter-sm"
          hint="Porcentaje (%)"
        />
      </section>
      <section class="fit row justify-between">
        <q-select
          filled
          v-model="form.departmentId"
          :options="getDepartmentsQuery.data.value || []"
          :option-value="(position) => position.id"
          :option-label="(position) => position.name"
          :loading="getDepartmentsQuery.isLoading.value"
          emit-value
          map-options
          label="Departamento*"
          :rules="[requiredField]"
          lazy-rules
          class="col-6 q-col-gutter-sm"
        />
        <q-select
          filled
          v-model="form.positionId"
          :options="getPositionsQuery.data.value || []"
          :option-value="(position) => position.id"
          :option-label="(position) => position.name"
          :loading="getPositionsQuery.isLoading.value"
          emit-value
          map-options
          label="Puesto*"
          :rules="[requiredField]"
          :disable="!form.departmentId || getPositionsQuery.isLoading.value"
          lazy-rules
          class="col-6 q-col-gutter-sm"
        />
      </section>

      <div class="flex justify-end q-gutter-sm">
        <q-btn no-caps label="Cancelar" type="button" color="negative" flat @click="onReset" />
        <q-btn no-caps label="Crear" type="submit" color="primary" />
      </div>
    </QForm>
  </DialogLayout>
</template>

<style lang="scss" scoped></style>

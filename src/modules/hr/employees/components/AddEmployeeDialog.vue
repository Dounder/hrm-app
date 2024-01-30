<script setup lang="ts">
import { QForm } from 'quasar';
import { reactive, ref } from 'vue';

import { DialogLayout, dateValidation, emailValidation, rangeValidation, requiredField, useNotify } from 'src/modules/common';
import { NewEmployee, useEmployee } from '..';

const { showAddEmployee, setShowAddEmployee } = useEmployee();
const { notify } = useNotify();

const form: NewEmployee = reactive({
  name: '',
  email: '',
  phone: '',
  dateHired: new Date().toLocaleDateString('en-CA'),
  salary: null,
  extraHourRate: null,
  departmentId: 0,
  positionId: 0,
});
const employeeForm = ref<QForm | null>(null);

const onSubmit = async () => {
  console.log(form);

  // if (!employeeForm.value || !employeeForm.value.validate()) return;

  // notify({ type: 'positive', message: `El empleado ${form.name} ha sido creado exitosamente`, position: 'top-right' });

  // onReset();
};

const onReset = () => {
  employeeForm.value?.resetValidation();
  setShowAddEmployee(false);
};
</script>

<template>
  <DialogLayout :show="showAddEmployee" @on:hide="onReset">
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
          class="col-6 q-col-gutter-sm"
          hint="Quetzales (Q)"
        />
        <q-input
          filled
          v-model="form.extraHourRate"
          label="Tarifa de horas extra"
          mask="#.#"
          fill-mask="#"
          reverse-fill-mask
          input-class="text-right"
          :rules="[requiredField, (val) => rangeValidation(val, 1, 100000)]"
          lazy-rules
          class="col-6 q-col-gutter-sm"
          hint="Porcentaje (%)"
        />
      </section>
      <section class="fit row justify-between">
        <q-select filled v-model="form.departmentId" :options="[]" label="Departamento" :rules="[]" lazy-rules class="col-6 q-col-gutter-sm" />
        <q-select
          filled
          v-model="form.positionId"
          :options="[]"
          label="Puesto"
          :rules="[]"
          :disable="!form.departmentId"
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

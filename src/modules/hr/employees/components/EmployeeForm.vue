<script setup lang="ts">
import { QForm } from 'quasar';
import { onMounted, reactive, ref, watch } from 'vue';

import { currencyValidation, dateValidation, emailValidation, rangeValidation, requiredField } from 'src/modules/common';
import { EmployeeToUpdate, NewEmployee, useEmployeeExtensions } from '..';

interface Props {
  formData: NewEmployee | EmployeeToUpdate;
  type: 'create' | 'update';
}
interface Emits {
  (e: 'on:submit', formData: NewEmployee | EmployeeToUpdate): void;
  (e: 'on:reset'): void;
  (e: 'on:change-department', departmentId: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { getDepartmentsQuery, getPositionsQuery, departmentId } = useEmployeeExtensions();

const formData = reactive(props.formData);
const form = ref<QForm | null>(null);

const onSubmit = () => {
  if (!form.value || !form.value.validate()) return;

  emit('on:submit', formData);
};

const onReset = () => {
  emit('on:reset');
  form.value?.resetValidation();
};

onMounted(() => {
  if (props.formData.departmentId) departmentId.value = props.formData.departmentId;
});

watch(
  () => formData.departmentId,
  (newId) => {
    if (!!newId) formData.positionId = null;
  }
);
</script>

<template>
  <QForm ref="form" @submit="onSubmit" class="q-gutter-y-md">
    <p class="text-h6 q-mb-lg flex justify-between items-end">
      Agregar empleado
      <small class="text-body2 text-overline text-grey-6">Requerido*</small>
    </p>

    <q-input filled v-model="formData.name" type="text" label="Nombre*" :rules="[requiredField]" lazy-rules />
    <q-input filled v-model="formData.email" type="email" label="Correo electrónico*" :rules="[requiredField, emailValidation]" lazy-rules />
    <q-input filled v-model="formData.phone" type="text" label="Teléfono*" mask="####-####" unmasked-value :rules="[requiredField]" lazy-rules />
    <q-input v-model="formData.dateHired" filled type="date" label="Fecha de contratación*" :rules="[requiredField, dateValidation]" lazy-rules />
    <section class="fit row justify-between">
      <q-input
        filled
        v-model="formData.salary"
        label="Salario*"
        mask="#,###,###.##"
        reverse-fill-mask
        input-class="text-right"
        :rules="[requiredField, (val) => currencyValidation(val, 1, 100000)]"
        lazy-rules
        class="col-6 q-col-gutter-sm"
        hint="Quetzales (Q)"
      />
      <q-input
        filled
        v-model="formData.extraHourRate"
        label="Tarifa de horas extra*"
        mask="#.#"
        fill-mask="#"
        input-class="text-right"
        :rules="[requiredField, (val) => rangeValidation(val, 1, 2)]"
        lazy-rules
        class="col-6 q-col-gutter-sm"
        hint="Porcentaje (%)"
      />
    </section>
    <section class="fit row justify-between">
      <q-select
        filled
        v-model="formData.departmentId"
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
        @update:model-value="departmentId = formData.departmentId ?? 0"
      />
      <q-select
        filled
        v-model="formData.positionId"
        :options="getPositionsQuery.data.value || []"
        :option-value="(position) => position.id"
        :option-label="(position) => position.name"
        :loading="getPositionsQuery.isLoading.value"
        emit-value
        map-options
        label="Puesto*"
        :rules="[requiredField]"
        :disable="!formData.departmentId || getDepartmentsQuery.isLoading.value"
        lazy-rules
        class="col-6 q-col-gutter-sm"
      />
    </section>

    <div class="flex justify-end q-gutter-sm">
      <q-btn no-caps label="Cancelar" type="button" color="negative" flat @click="onReset" />
      <q-btn no-caps :label="type === 'create' ? 'Agregar' : 'Actualizar'" type="submit" color="primary" />
    </div>
  </QForm>
</template>

<style lang="scss" scoped></style>

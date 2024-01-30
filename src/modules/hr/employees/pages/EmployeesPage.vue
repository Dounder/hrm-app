<script setup lang="ts">
import { PageLayout } from 'src/modules/common';
import { AddEmployeeDialog, EmployeeCard, useEmployee, useEmployees } from '../';
import UpdateEmployeeDialog from '../components/UpdateEmployeeDialog.vue';

const { isFetchingNextPage, isLoading, employees, loadMore } = useEmployees();
const { setShowAddEmployee } = useEmployee();

const onLoad = () => {
  if (isFetchingNextPage.value) return;

  loadMore();
};
</script>

<template>
  <PageLayout :loading-more="isFetchingNextPage || isLoading" @load:more="onLoad">
    <template v-slot:header>
      <h1 class="text-h4 q-ma-none">Empleados</h1>
      <q-btn outline dense color="primary" icon="sym_o_add" padding=".5rem 1rem" @click="setShowAddEmployee(true)">
        <q-tooltip anchor="center left" self="center end" class="bg-transparent text-primary text-overline">Agregar empleado</q-tooltip>
      </q-btn>
    </template>

    <template v-slot:body>
      <article class="full-grid" v-if="employees?.length === 0">
        <span class="text-h4 text-grey-6">No hay empleados registrados...</span>
      </article>

      <template v-else>
        <EmployeeCard v-for="employee in employees" :key="employee.id" :employee="employee" />
      </template>
    </template>
  </PageLayout>
  <AddEmployeeDialog />
  <UpdateEmployeeDialog />
</template>

<style lang="scss" scoped></style>

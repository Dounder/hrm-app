<script setup lang="ts">
import { PageLayout } from 'src/shared';
import { useEmployees } from '../composable';
import EmployeeCard from '../components/EmployeeCard.vue';

const { isFetchingNextPage, hasNextPage, employees, loadMore } = useEmployees();

const onLoad = () => {
  if (isFetchingNextPage.value) return;

  loadMore();
};
</script>

<template>
  <PageLayout :has-more="hasNextPage" :loading-more="isFetchingNextPage" @load:more="onLoad">
    <template v-slot:header>
      <h1 class="text-h4 q-ma-none">Employees</h1>
      <q-btn outline dense color="primary" icon="sym_o_add" padding=".5rem 1rem" @click="() => {}">
        <q-tooltip anchor="center left" self="center end" class="bg-transparent text-primary text-overline"> Create Employee </q-tooltip>
      </q-btn>
    </template>

    <template v-slot:body>
      <article class="flex flex-center q-py-xl" v-if="employees?.length === 0">
        <span class="text-h4 text-grey-6">There are no employees yet...</span>
      </article>

      <template v-else>
        <EmployeeCard v-for="employee in employees" :key="employee.id" :employee="employee" />
      </template>
    </template>
  </PageLayout>
</template>

<style lang="scss" scoped></style>

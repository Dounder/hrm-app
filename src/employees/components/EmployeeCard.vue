<script setup lang="ts">
import { type Employee } from '../interfaces/employee.interface';

interface Props {
  employee: Employee;
}

const props = defineProps<Props>();
const { name, code, createdAt, email, salary, phone } = props.employee;
</script>

<template>
  <q-card class="card">
    <q-card-section class="flex column q-gutter-y-sm">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ email }}</div>
      <div class="text-subtitle2">Code: {{ code }}</div>
      <div class="text-subtitle2">Salary: {{ salary }}</div>
      <div class="text-subtitle2">Phone: {{ phone }}</div>
      <div class="text-grey-6 text-overline">Created At: {{ new Date(createdAt).toLocaleDateString() }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>

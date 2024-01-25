<script setup lang="ts">
import { User } from '../interfaces/user.interface';
interface Props {
  user: User;
}

defineProps<Props>();
</script>

<template>
  <q-card class="card">
    <q-card-section class="flex column q-gutter-y-sm">
      <div class="text-h6">{{ user.username }}</div>
      <div class="text-subtitle2">{{ user.email }}</div>
      <div>Roles: {{ user.roles.map((role) => role.name).join(', ') }}</div>
      <div class="text-grey-6">Created At: {{ new Date(user.createdAt).toLocaleDateString() }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>

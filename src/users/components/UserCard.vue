<script setup lang="ts">
import { User } from '../interfaces/user.interface';
interface Props {
  user: User;
}

defineProps<Props>();
</script>

<template>
  <q-card class="card">
    <q-card-section>
      <div class="text-h6">{{ user.username }}</div>
      <div class="text-subtitle2">{{ user.email }}</div>
    </q-card-section>
    <q-card-section> {{ user.roles.map((role) => role.name) }} </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>

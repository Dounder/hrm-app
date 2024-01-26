<script setup lang="ts">
import { PageLayout } from 'src/shared';
import { UserCard, useUsers } from '../';

const { users, isFetchingNextPage, loadMore } = useUsers();

const onLoad = () => {
  if (isFetchingNextPage.value) return;

  loadMore();
};
</script>

<template>
  <PageLayout :loading-more="isFetchingNextPage" @load:more="onLoad">
    <template v-slot:header>
      <h1 class="text-h4 q-ma-none">Usuarios</h1>
      <q-btn outline dense color="primary" icon="sym_o_add" padding=".5rem 1rem" @click="() => {}">
        <q-tooltip anchor="center left" self="center end" class="bg-transparent text-primary text-overline">Agregar Usuario</q-tooltip>
      </q-btn>
    </template>

    <template v-slot:body>
      <article class="full-grid" v-if="users?.length === 0">
        <span class="text-h4 text-grey-6">No hay usuarios registrados...</span>
      </article>

      <template v-else>
        <UserCard v-for="user in users" :key="user.id" :user="user" />
      </template>
    </template>
  </PageLayout>
</template>

<style lang="scss" scoped></style>
.. ..

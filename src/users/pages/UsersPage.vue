<script setup lang="ts">
import { PagePlaceholder } from 'src/shared';
import { UserCard, useUsers } from '../';

const { usersQuery, nextPage } = useUsers();

const onLoad = () => {
  console.log('load', usersQuery.isRefetching.value, usersQuery.isFetching.value, usersQuery.isLoading.value);
  if (usersQuery.isFetching.value || usersQuery.isLoading.value) return;

  // nextPage();
};
</script>

<template>
  <PagePlaceholder :loading="usersQuery.isFetching.value || usersQuery.isLoading.value" @on:load="onLoad">
    <template v-slot:header>
      <h1 class="text-h4 q-ma-none">Users</h1>
      <q-btn outline dense color="primary" icon="sym_o_add" padding=".5rem 1rem" @click="() => {}">
        <q-tooltip anchor="center left" self="center end" class="bg-transparent text-primary text-overline"> Create User </q-tooltip>
      </q-btn>
    </template>

    <template v-slot:body>
      <article class="flex flex-center q-py-xl" v-if="usersQuery.data.value?.length === 0">
        <span class="text-h4 text-grey-6">There are no users yet...</span>
      </article>

      <section class="grid" v-else>
        <UserCard v-for="user in usersQuery.data.value" :key="user.id" :user="user" />
      </section>
    </template>
  </PagePlaceholder>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
}
</style>

<script setup lang="ts">
import { PageLayout } from 'src/modules/common';
import { UserCard, UserRole, useUsers, useUser, AddUserDialog, UpdateUserDialog } from '../';
import { useAuth } from 'src/modules/auth';

const { userHasRoles, accessToken } = useAuth();
const { users, isFetchingNextPage, loadMore } = useUsers();
const { store } = useUser();

const onLoad = () => {
  if (isFetchingNextPage.value) return;

  loadMore();
};
</script>

<template>
  <PageLayout :loading-more="isFetchingNextPage" @load:more="onLoad">
    <template v-slot:header>
      <h1 class="text-h4 q-ma-none">Usuarios</h1>
      <template v-if="userHasRoles([UserRole.Admin])">
        <q-btn outline dense color="primary" icon="sym_o_add" padding=".5rem 1rem" @click="store.setAddDialog(true)">
          <q-tooltip anchor="center left" self="center end" class="bg-transparent text-primary text-overline">Agregar Usuario</q-tooltip>
        </q-btn>
      </template>
    </template>

    <template v-slot:body>
      <article class="full-grid" v-if="users?.length === 0">
        <span class="text-h4 text-grey-6">No hay usuarios registrados...</span>
      </article>

      <template v-else>
        <div>{{ accessToken?.split('.')[2] }}</div>
        <UserCard v-for="user in users" :key="user.id" :user="user" />
      </template>
    </template>
  </PageLayout>
  <AddUserDialog />
  <UpdateUserDialog />
</template>

<style lang="scss" scoped></style>

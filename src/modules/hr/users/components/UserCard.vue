<script setup lang="ts">
import { CardLayout, useNotify } from 'src/modules/common';
import { User, useUpdateUser, useUser } from '..';

interface Props {
  user: User;
}

const props = defineProps<Props>();
const { store } = useUser();
const { deleteUserMutation, restoreUserMutation } = useUpdateUser();
const { notify } = useNotify();

const onEdit = () => {
  store.setUser({ ...props.user, password: null });
  store.setUpdateDialog(true);
};

const onDelete = async () => {
  await deleteUserMutation.mutateAsync(props.user.id);
  notify({ type: 'warning', message: `El usuario ${props.user.username} ha sido eliminado exitosamente`, position: 'top-right' });
};

const onRestore = async () => {
  await restoreUserMutation.mutateAsync(props.user.id);
  notify({ type: 'info', message: `El usuario ${props.user.username} ha sido restaurado exitosamente`, position: 'top-right' });
};
</script>

<template>
  <CardLayout @on:delete="onDelete" @on:restore="onRestore" @on:edit="onEdit" :deleted="!!user.deletedAt">
    <div class="text-h6">@{{ user.username }}</div>
    <div class="text-subtitle2">{{ user.email }}</div>
    <div class="text-subtitle2">Roles: {{ user.roles.map((role) => role.name).join(', ') }}</div>
    <div class="text-grey-6 text-overline flex justify-between">
      <span>Creado: {{ new Date(user.createdAt).toLocaleDateString() }}</span>
      <span v-if="user.deletedAt">Eliminado: {{ new Date(user.deletedAt).toLocaleDateString() }}</span>
    </div>
  </CardLayout>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>

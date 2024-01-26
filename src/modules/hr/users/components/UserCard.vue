<script setup lang="ts">
import { useNotify, useDialog } from 'src/modules/common';
import { User, useUpdateUser, useUser } from '..';
import { ref } from 'vue';

interface Props {
  user: User;
}

const props = defineProps<Props>();
const { store } = useUser();
const { deleteUserMutation, restoreUserMutation } = useUpdateUser();
const { warning, info } = useNotify();
const { confirmDialog } = useDialog();
const isUpdating = ref(false);
const isDeleting = ref(false);
const isRestoring = ref(false);

const onEdit = () => {
  isUpdating.value = true;
  store.setUser({ ...props.user, password: null });
  store.setUpdateDialog(true);
  setTimeout(() => (isUpdating.value = false), 200);
};

const onDelete = async () => {
  const result = confirmDialog({
    title: 'Eliminar usuario',
    message: `¿Está seguro que desea eliminar el usuario ${props.user.username}?`,
    isDelete: true,
    position: 'top',
  });

  result.onCancel(() => {
    warning({ message: 'La operación ha sido cancelada', position: 'top-right' });
  });

  result.onOk(async () => {
    isDeleting.value = true;
    await deleteUserMutation.mutateAsync(props.user.id);
    warning({ message: `El usuario ${props.user.username} ha sido eliminado exitosamente`, position: 'top-right' });
    setTimeout(() => (isDeleting.value = false), 200);
  });
};

const onRestore = async () => {
  isRestoring.value = true;
  await restoreUserMutation.mutateAsync(props.user.id);
  info({ message: `El usuario ${props.user.username} ha sido restaurado exitosamente`, position: 'top-right' });
  setTimeout(() => (isRestoring.value = false), 200);
};
</script>

<template>
  <q-card class="card" :class="user.deletedAt && 'deleted'">
    <q-card-section class="flex column q-gutter-y-sm">
      <div class="text-h6">@{{ user.username }}</div>
      <div class="text-subtitle2">{{ user.email }}</div>
      <div class="text-subtitle2">Roles: {{ user.roles.map((role) => role.name).join(', ') }}</div>
      <div class="text-grey-6 text-overline flex justify-between">
        <span>Creado: {{ new Date(user.createdAt).toLocaleDateString() }}</span>
        <span v-if="user.deletedAt">Eliminado: {{ new Date(user.deletedAt).toLocaleDateString() }}</span>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat round color="primary" icon="sym_o_edit" @click="onEdit">
        <q-tooltip anchor="top middle" self="bottom middle">Editar</q-tooltip>
      </q-btn>
      <q-btn flat round color="secodary" icon="sym_o_restart_alt" @click="onRestore" v-if="user.deletedAt">
        <q-tooltip anchor="top middle" self="bottom middle">Restaurar</q-tooltip>
      </q-btn>
      <q-btn flat round color="negative" icon="sym_o_delete" @click="onDelete" v-if="!user.deletedAt">
        <q-tooltip anchor="top middle" self="bottom middle">Eliminar</q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
.deleted {
  background: rgba($negative, 0.1);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useDialog, useNotify } from '../composables';

interface Props {
  deleted: boolean;
  deleteMessage?: string;
  deleteTitle?: string;
}

interface Emits {
  (e: 'on:edit'): void;
  (e: 'on:delete'): void;
  (e: 'on:restore'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { confirmDialog } = useDialog();
const { notify } = useNotify();

const isUpdating = ref(false);
const isDeleting = ref(false);
const isRestoring = ref(false);

const onEdit = () => {
  isUpdating.value = true;
  emits('on:edit');
  setTimeout(() => (isUpdating.value = false), 200);
};

const onDelete = async () => {
  const result = confirmDialog({
    title: props.deleteTitle || 'Eliminar',
    message: props.deleteMessage || '¿Está seguro que desea eliminar este registro?',
    isDelete: true,
    position: 'top',
  });

  result.onCancel(() => {
    notify({ type: 'warning', message: 'La operación ha sido cancelada', position: 'top-right' });
  });

  result.onOk(async () => {
    isDeleting.value = true;
    emits('on:delete');
    setTimeout(() => (isDeleting.value = false), 200);
  });
};

const onRestore = async () => {
  isRestoring.value = true;
  emits('on:restore');
  setTimeout(() => (isRestoring.value = false), 200);
};
</script>

<template>
  <q-card class="card" :class="{ deleted: deleted }">
    <q-card-section class="flex column q-gutter-y-sm">
      <slot />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat round color="primary" icon="sym_o_edit" @click="onEdit" :loading="isUpdating" v-if="!deleted">
        <q-tooltip anchor="top middle" self="bottom middle">Editar</q-tooltip>
      </q-btn>
      <q-btn flat round color="secodary" icon="sym_o_restart_alt" @click="onRestore" :loading="isRestoring" v-if="deleted">
        <q-tooltip anchor="top middle" self="bottom middle">Restaurar</q-tooltip>
      </q-btn>
      <q-btn flat round color="negative" icon="sym_o_delete" @click="onDelete" :loading="isDeleting" v-if="!deleted">
        <q-tooltip anchor="top middle" self="bottom middle">Eliminar</q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>

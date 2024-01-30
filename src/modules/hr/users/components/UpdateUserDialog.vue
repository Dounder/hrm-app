<script setup lang="ts">
import { QForm } from 'quasar';
import { ref, watch } from 'vue';

import { DialogLayout, emailValidation, passwordValidation, requiredField, requiredOption, useNotify } from 'src/modules/common';
import { useRoles, useUpdateUser, useUser } from '../';

const { store, showUpdateDialog, userToUpdate } = useUser();
const { updateUserMutation } = useUpdateUser();
const { rolesQuery } = useRoles();
const { notify } = useNotify();

const userForm = ref<QForm | null>(null);

const onSubmit = async () => {
  if (!userForm.value || !userForm.value.validate() || !userToUpdate.value) return;

  await updateUserMutation.mutateAsync(userToUpdate.value);

  notify({ type: 'positive', message: `El usuario ${userToUpdate.value.username} ha sido actualizado exitosamente`, position: 'top-right' });

  onReset();
};

const onReset = () => {
  userForm.value?.resetValidation();
  store.setUpdateDialog(false);
  store.setUser(null);
};

watch(
  () => updateUserMutation.isError,
  (hasError) => {
    if (!updateUserMutation.error.value) return;

    if (hasError) notify({ type: 'negative', message: updateUserMutation.error.value.message, position: 'top-right' });
  }
);
</script>

<template>
  <DialogLayout :show="showUpdateDialog" @on:hide="onReset">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="userForm" v-if="userToUpdate">
      <p class="text-h6 q-mb-lg flex justify-between items-end">
        Editar usuario
        <small class="text-body2 text-overline text-grey-6">Requerido*</small>
      </p>
      <q-input filled v-model="userToUpdate.username" label="Nombre de usuario*" :rules="[requiredField]" lazy-rules autofocus />
      <q-input filled v-model="userToUpdate.email" label="Correo*" :rules="[requiredField, emailValidation]" lazy-rules />
      <q-input
        filled
        v-model="userToUpdate.password"
        label="Contraseña*"
        type="text"
        :rules="[
          (val) => {
            if (val) return passwordValidation(val);
            return true;
          },
        ]"
        lazy-rules
      />

      <q-select
        filled
        v-model="userToUpdate.roles"
        multiple
        :options="rolesQuery.data.value || []"
        :loading="rolesQuery.isLoading.value"
        :readonly="rolesQuery.isLoading.value"
        :option-label="(role) => role.name"
        transition-show="jump-up"
        transition-hide="jump-up"
        emit-value
        map-options
        :rules="[requiredOption]"
        lazy-rules
        use-chips
        stack-label
        label="Roles*"
      />

      <div class="flex justify-end q-gutter-sm">
        <q-btn no-caps label="Cancelar" type="button" color="negative" flat @click="onReset" />
        <q-btn no-caps label="Actualizar" type="submit" color="primary" />
      </div>
    </q-form>
  </DialogLayout>
</template>

<style lang="scss" scoped></style>

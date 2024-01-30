<script setup lang="ts">
import { QForm } from 'quasar';
import { reactive, ref } from 'vue';

import { DialogLayout, emailValidation, passwordValidation, requiredField, requiredOption, useNotify } from 'src/modules/common';
import { useCreateUser, useRoles, useUser, type NewUser } from '../';

const { store, showAddDialog } = useUser();
const { createUserMutation } = useCreateUser();
const { rolesQuery } = useRoles();
const { notify } = useNotify();

const user: NewUser = reactive({ username: '', email: '', password: '', roles: ['User'] });
const userForm = ref<QForm | null>(null);

const onSubmit = async () => {
  if (!userForm.value || !userForm.value.validate()) return;

  await createUserMutation.mutateAsync(user);

  if (createUserMutation.isSuccess.value) {
    notify({ type: 'positive', message: `El usuario ${user.username} ha sido creado exitosamente`, position: 'top-right' });

    onReset();
  }
};

const onReset = () => {
  userForm.value?.resetValidation();
  createUserMutation.reset();
  user.username = '';
  user.email = '';
  user.password = '';
  user.roles = ['User'];
  store.setAddDialog(false);
};
</script>

<template>
  <DialogLayout :show="showAddDialog" @on:hide="onReset">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="userForm">
      <p class="text-h6 q-mb-lg flex justify-between items-end">
        Agregar usuario
        <small class="text-body2 text-overline text-grey-6">Requerido*</small>
      </p>
      <q-input filled v-model="user.username" label="Nombre de usuario*" :rules="[requiredField]" lazy-rules autofocus />
      <q-input filled v-model="user.email" label="Correo*" :rules="[requiredField, emailValidation]" lazy-rules />
      <q-input filled v-model="user.password" label="Contraseña*" type="text" :rules="[requiredField, passwordValidation]" lazy-rules />

      <q-select
        filled
        v-model="user.roles"
        multiple
        :options="rolesQuery.data.value || []"
        :loading="rolesQuery.isLoading.value"
        :readonly="rolesQuery.isLoading.value"
        :option-value="(role) => role.name"
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
        <q-btn no-caps label="Crear" type="submit" color="primary" />
      </div>
    </q-form>
  </DialogLayout>
</template>

<style lang="scss" scoped></style>

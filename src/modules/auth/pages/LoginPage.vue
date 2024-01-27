<script setup lang="ts">
import { QForm } from 'quasar';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { requiredField, useNotify } from 'src/modules/common';
import { useAuth, LoginIcon } from '..';

const { login } = useAuth();
const { notifyCustom } = useNotify();
const router = useRouter();

const loginForm = reactive({ username: 'admin', password: 'Admin@1234' });
const formRef = ref<QForm | null>(null);
const viewPassword = ref(false);
const isLoading = ref(false);

const onSubmit = async () => {
  if (formRef.value === null || !formRef.value.validate()) return;

  isLoading.value = true;

  const message = await login(loginForm);

  notifyCustom({ message: message, color: 'secondary', position: 'top' });

  router.replace({ name: 'dashboard.page' });

  isLoading.value = false;
};

const onReset = () => {
  if (formRef.value === null) return;

  formRef.value.resetValidation();
  loginForm.username = '';
  loginForm.password = '';
};
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="card q-pa-lg">
      <q-card-section horizontal>
        <q-card-section class="col-6 flex flex-center">
          <LoginIcon />
        </q-card-section>
        <q-card-section class="q-pt-xs flex flex-center full-width">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width" ref="formRef">
            <div class="text-h2 q-mb-md">Log In</div>
            <q-separator spaced />
            <q-input
              v-model="loginForm.username"
              label="Username"
              :loading="isLoading"
              :readonly="isLoading"
              lazy-rules
              :rules="[requiredField]"
              autofocus
            />
            <q-input
              v-model="loginForm.password"
              label="Password"
              :type="viewPassword ? 'text' : 'password'"
              :loading="isLoading"
              :readonly="isLoading"
              lazy-rules
              :rules="[requiredField]"
            >
              <template v-slot:append>
                <q-icon :name="viewPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="viewPassword = !viewPassword" />
              </template>
            </q-input>
            <div class="flex justify-end">
              <q-btn label="Reset" type="reset" color="primary" flat class="q-mr-sm" />
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  background-image: linear-gradient(to right bottom, #1976d2, #4773ce, #606fc8, #726cc2, #8169bb);
}
.card {
  width: min(100%, 65rem);
  height: 35rem;
}
</style>
src/modules/common

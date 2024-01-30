<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from 'src/modules/auth';
import { LateralMenu } from '../components';

const { replace } = useRouter();
const drawer = ref(false);
const loading = ref(false);

const handleLogout = () => {
  loading.value = true;
  setTimeout(() => {
    replace({ name: 'auth.login' });
    useAuth().logout();
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title> Human Resource Management </q-toolbar-title>
        <q-btn flat color="white" icon="sym_o_logout" @click="handleLogout()" :loading="loading">
          <q-tooltip anchor="center left" self="center end" class="bg-transparent text-white text-overline">Cerrar sesión</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawer" side="left" bordered :breakpoint="1000">
      <LateralMenu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
src/modules/auth

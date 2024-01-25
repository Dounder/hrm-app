<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { EmployeeLateralMenu } from '../components';
import { useAuth } from 'src/auth';

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
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Header</q-toolbar-title>
        <q-btn flat color="white" icon="sym_o_logout" @click="handleLogout()" :loading="loading">
          <q-tooltip anchor="center left" self="center end" class="bg-transparent text-white text-overline"> Log Out </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="400">
      <EmployeeLateralMenu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>

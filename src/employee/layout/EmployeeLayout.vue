<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { EmployeeLateralMenu } from '../components';
import { useAuth } from 'src/auth';

const { replace } = useRouter();
const drawer = ref(false);

const handleLogout = () => {
  replace({ name: 'auth.login' });
  useAuth().logout();
};
</script>

<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-toolbar-title>Header</q-toolbar-title>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-btn color="primary" icon="check" label="OK" @click="handleLogout()" />
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

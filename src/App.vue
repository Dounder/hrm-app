<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from './modules/auth';

useAuth().loadDataFromLocalStorage();
</script>
./modules/auth

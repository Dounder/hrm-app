<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from './auth';

useAuth().loadDataFromLocalStorage();
</script>

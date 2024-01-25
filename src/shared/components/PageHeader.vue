<script setup lang="ts"></script>

<template>
  <section class="page-header">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

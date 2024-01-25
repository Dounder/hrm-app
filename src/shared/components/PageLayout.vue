<script setup lang="ts">
import PageBody from './PageBody.vue';
import PageHeader from './PageHeader.vue';

interface Props {
  loadingMore: boolean;
  hasMore: boolean;
}
interface Emits {
  (e: 'load:more'): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const pageTweak = (offset: number) => ({ height: `calc(100vh - ${offset}px)` });
</script>

<template>
  <q-page padding class="page" :style-fn="pageTweak">
    <PageHeader>
      <slot name="header" />
    </PageHeader>

    <q-separator spaced />

    <PageBody :loading="loadingMore" :has-more="hasMore" @load:more="emits('load:more')">
      <slot name="body" />
    </PageBody>
  </q-page>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

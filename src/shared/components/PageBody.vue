<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { ref, watch } from 'vue';

interface Props {
  loading: boolean;
  hasMore: boolean;
}

interface Emits {
  (e: 'load:more'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const scrollAreaRef = ref<QScrollArea | null>(null);
const thumbStyle: Partial<CSSStyleDeclaration> = { right: '4px', borderRadius: '5px', backgroundColor: '#027be3', width: '5px', opacity: '0.75' };
const barStyle: Partial<CSSStyleDeclaration> = { right: '2px', borderRadius: '9px', backgroundColor: '#027be3', width: '9px', opacity: '0.2' };

watch(
  () => scrollAreaRef.value?.getScrollPercentage().top,
  (top) => {
    if (!top || props.loading) return;

    if (top > 0.9) emits('load:more');
  }
);
</script>

<template>
  <section class="page-body">
    <q-scroll-area class="full-height full-width" :thumb-style="thumbStyle" :bar-style="barStyle" ref="scrollAreaRef">
      <section class="page-grid">
        <slot />

        <article class="page-no-data" v-if="!hasMore">
          <span class="text-h4 text-grey-6">No more data to load...</span>
        </article>

        <article class="flex flex-center q-py-lg page-loading" v-if="loading">
          <q-spinner-facebook color="primary" size="3rem" :thickness="5" />
        </article>
      </section>
    </q-scroll-area>
  </section>
</template>

<style lang="scss" scoped>
.page {
  &-body {
    flex: 1;
  }
  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    padding: 1rem;
  }
  &-loading {
    grid-column: 1 / -1;
    height: 15rem;
  }
  &-no-data {
    grid-column: 1 / -1;
    height: 5rem;
    display: grid;
    place-items: center;
  }
}
</style>

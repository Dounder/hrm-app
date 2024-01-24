<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { computed, onMounted, onUnmounted, ref } from 'vue';
interface Props {
  loading: boolean;
}
interface Emits {
  (e: 'on:load'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const scrollContainer = ref<QScrollArea | null>(null);
const scrollTarget = computed(() => scrollContainer.value?.getScrollTarget());
const thumbStyle: Partial<CSSStyleDeclaration> = { right: '4px', borderRadius: '5px', backgroundColor: '#027be3', width: '5px', opacity: '0.75' };
const barStyle: Partial<CSSStyleDeclaration> = { right: '2px', borderRadius: '9px', backgroundColor: '#027be3', width: '9px', opacity: '0.2' };

const pageTweak = (offset: number) => ({ height: `calc(100vh - ${offset}px)` });

const onScroll = () => {
  if (!scrollTarget.value) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollTarget.value;
  const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100; // 10px offset

  if (isNearBottom && !props.loading) emits('on:load');
};

onMounted(() => {
  if (!scrollTarget.value) return;

  scrollTarget.value.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  if (!scrollTarget.value) return;

  scrollTarget.value.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <q-page padding class="page" :style-fn="pageTweak">
    <section class="page-header">
      <slot name="header" />
    </section>

    <q-separator spaced />

    <section class="page-body">
      <q-scroll-area class="full-height full-width" :thumb-style="thumbStyle" :bar-style="barStyle" ref="scrollContainer">
        <section class="q-pa-sm">
          <slot name="body" />
        </section>

        <article class="flex flex-center q-py-lg" v-if="loading">
          <q-spinner-facebook color="primary" size="3rem" :thickness="5" />
        </article>
      </q-scroll-area>
    </section>
  </q-page>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-body {
    flex: 1;
  }
}
</style>

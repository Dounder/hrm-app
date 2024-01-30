z
<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  show: boolean;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'standard' | undefined;
}
interface Emits {
  (e: 'on:hide'): void;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
});
const emits = defineEmits<Emits>();
const isShowing = ref(false);

watch(
  () => props.show,
  (value) => {
    isShowing.value = value;
  }
);
</script>

<template>
  <q-dialog v-model="isShowing" :position="props.position" @hide="emits('on:hide')" persistent>
    <q-card class="card">
      <slot />
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.card {
  width: 30rem;
  padding: 1rem;
}
</style>

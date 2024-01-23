<script setup lang="ts">
const options = [
  { label: 'Home', icon: 'sym_o_home', to: { name: 'home.page' } },
  { label: 'Users', icon: 'sym_o_person', to: { name: 'users.page' } },
  { label: 'Employees', icon: 'sym_o_badge', to: { name: 'employees.page' } },
];
</script>

<template>
  <q-list>
    <template v-for="(item, index) in options" :key="index">
      <q-item clickable v-ripple :to="item.to" exact exact-active-class="active">
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
          {{ item.label }}
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<style lang="scss" scoped>
.active {
  background-color: rgba(#000, 0.2);
}
</style>

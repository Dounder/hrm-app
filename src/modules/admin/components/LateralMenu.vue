<script setup lang="ts">
interface MenuSections {
  label: string;
  icon: string;
  options: MenuOptions[];
}
interface MenuOptions {
  label: string;
  icon: string;
  to: { name: string };
}

const sections: MenuSections[] = [
  { label: 'Inicio', icon: 'home', options: [{ label: 'DashBoard', icon: 'sym_o_dashboard', to: { name: 'dashboard.page' } }] },
  {
    label: 'Recursos Humanos',
    icon: 'home',
    options: [
      { label: 'Usuarios', icon: 'sym_o_group', to: { name: 'users.page' } },
      { label: 'Empleados', icon: 'sym_o_badge', to: { name: 'employees.page' } },
    ],
  },
  { label: 'Planificación', icon: 'home', options: [{ label: 'Horarios', icon: 'sym_o_schedule', to: { name: 'schedules.page' } }] },
  { label: 'Nómina', icon: 'home', options: [{ label: 'Cálculo de nómina', icon: 'sym_o_payments', to: { name: 'payrolls.page' } }] },
];
</script>

<template>
  <q-list>
    <template v-for="(section, i) in sections" :key="i">
      <q-item-label header>{{ section.label }}</q-item-label>

      <q-item clickable v-ripple v-for="option in section.options" :key="option.label" :to="option.to" exact exact-active-class="active">
        <q-item-section avatar top>
          <q-avatar :icon="option.icon" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ option.label }}</q-item-label>
        </q-item-section>

        <q-separator spaced inset v-if="sections.length === i" />
      </q-item>
    </template>
  </q-list>
</template>

<style lang="scss" scoped>
.active {
  background-color: rgba(#000, 0.2);
}
</style>

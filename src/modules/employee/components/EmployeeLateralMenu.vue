<script setup lang="ts"></script>

<template>
  <q-scroll-area style="height: calc(100% - 10rem); margin-top: 10rem; border-right: 1px solid #ddd">
    <q-list padding>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="inbox" />
        </q-item-section>

        <q-item-section> Inbox </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>

  <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 10rem">
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="56px" class="q-mb-sm">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
      <div class="text-weight-bold">Employee name</div>
      <div>@username</div>
    </div>
  </q-img>
</template>

<style lang="scss" scoped></style>

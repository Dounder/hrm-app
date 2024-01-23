import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const users = ref([]);

  return {
    //? Props
    users,

    //* Getters

    //! Actions
  };
});

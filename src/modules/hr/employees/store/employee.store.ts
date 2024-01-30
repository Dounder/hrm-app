import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEmployeeStore = defineStore('employee', () => {
  const showAddEmployee = ref(false);
  const showUpdateEmployee = ref(false);

  return {
    //? Props
    showAddEmployee,
    showUpdateEmployee,

    //* Getters

    //! Actions
    setShowAddEmployee: (value: boolean) => (showAddEmployee.value = value),
    setShowUpdateEmployee: (value: boolean) => (showUpdateEmployee.value = value),
  };
});

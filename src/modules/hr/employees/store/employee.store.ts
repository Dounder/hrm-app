import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Employee, EmployeeToUpdate } from '..';

export const useEmployeeStore = defineStore('employee', () => {
  const employeeToUpdate = ref<EmployeeToUpdate | null>(null);
  const showAddEmployee = ref(false);
  const showUpdateEmployee = ref(false);

  return {
    //? Props
    employeeToUpdate,
    showAddEmployee,
    showUpdateEmployee,

    //* Getters

    //! Actions
    setEmployeeToUpdate: (value: Employee | null) => {
      if (!value) return (employeeToUpdate.value = null);

      employeeToUpdate.value = {
        id: value.id,
        name: value.name,
        email: value.email,
        phone: value.phone,
        salary: value.salary.toFixed(2),
        dateHired: new Date(value.dateHired).toLocaleDateString('en-CA'),
        extraHourRate: value.extraHourRate.toFixed(1),
        departmentId: value.department.id,
        positionId: value.position.id,
      };
    },
    setShowAddEmployee: (value: boolean) => (showAddEmployee.value = value),
    setShowUpdateEmployee: (value: boolean) => (showUpdateEmployee.value = value),
  };
});

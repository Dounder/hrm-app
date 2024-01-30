import { storeToRefs } from 'pinia';
import { useEmployeeStore } from '..';

export const useEmployee = () => {
  const store = useEmployeeStore();
  const { showAddEmployee, showUpdateEmployee, employeeToUpdate } = storeToRefs(store);

  return {
    //* Props
    employeeToUpdate,
    showAddEmployee,
    showUpdateEmployee,

    //! Getters

    //? Methods
    setShowAddEmployee: store.setShowAddEmployee,
    setShowUpdateEmployee: store.setShowUpdateEmployee,
    setEmployeeToUpdate: store.setEmployeeToUpdate,
  };
};

export default useEmployee;

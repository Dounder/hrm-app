import { storeToRefs } from 'pinia';
import { useEmployeeStore } from '..';

export const useEmployee = () => {
  const store = useEmployeeStore();
  const { showAddEmployee, showUpdateEmployee } = storeToRefs(store);
  return {
    //* Props
    showAddEmployee,
    showUpdateEmployee,

    //! Getters

    //? Methods
    setShowAddEmployee: store.setShowAddEmployee,
    setShowUpdateEmployee: store.setShowUpdateEmployee,
  };
};

export default useEmployee;

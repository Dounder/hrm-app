import { storeToRefs } from 'pinia';
import { useUsersStore } from '../store/users.store';

const useUser = () => {
  const store = useUsersStore();
  const { showAddDialog, showUpdateDialog, userToUpdate, roles } = storeToRefs(store);

  return {
    //* Props
    showAddDialog,
    showUpdateDialog,
    userToUpdate,
    roles,
    store,

    //! Getters

    //? Methods
  };
};

export default useUser;

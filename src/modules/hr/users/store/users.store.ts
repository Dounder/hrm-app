import { defineStore } from 'pinia';
import { ref } from 'vue';

import { type UserRole, type UserToUpdate } from '../interfaces/user.interface';

export const useUsersStore = defineStore('users', () => {
  const userToUpdate = ref<UserToUpdate | null>(null);
  const roles = ref<UserRole[]>([]);
  const showAddDialog = ref(false);
  const showUpdateDialog = ref(false);

  return {
    //? Props
    userToUpdate,
    showAddDialog,
    showUpdateDialog,
    roles,

    //! Actions
    setUser(user: UserToUpdate | null) {
      userToUpdate.value = user;
    },
    setRoles(newRoles: UserRole[]) {
      roles.value = newRoles;
    },
    setAddDialog(show: boolean) {
      showAddDialog.value = show;
    },
    setUpdateDialog(show: boolean) {
      showUpdateDialog.value = show;
    },
  };
});

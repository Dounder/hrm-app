import { defineStore } from 'pinia';
import { User, UserRole } from 'src/users';
import { computed, ref } from 'vue';

interface AuthStoreProps {
  user: User | null;
  refreshToken: string | null;
  accessToken: string | null;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const refreshToken = ref<string | null>(null);
  const accessToken = ref<string | null>(null);

  return {
    //? Props
    user,
    refreshToken,
    accessToken,

    //* Getters
    isAuthenticated: computed(() => !!refreshToken.value && !!accessToken.value && !!user.value),
    userHasRoles: (roleIds: UserRole[]) =>
      computed(() => {
        if (!user.value || !user.value.roles) return false;
        const userRoleIds = user.value.roles.map((role) => role.id);
        return roleIds.some((roleId) => userRoleIds.includes(roleId));
      }),

    //! Actions
    saveInLocalStorage() {
      localStorage.setItem('refreshToken', refreshToken.value || 'no-refresh-token');
      localStorage.setItem('accessToken', accessToken.value || 'no-access-token');
      localStorage.setItem('user', JSON.stringify(user.value) || 'no-user');
    },
    loadFromLocalStorage() {
      refreshToken.value = localStorage.getItem('refreshToken') || null;
      accessToken.value = localStorage.getItem('accessToken') || null;
      user.value = JSON.parse(localStorage.getItem('user') || 'null');
    },
    setData(props: AuthStoreProps) {
      user.value = props.user;
      refreshToken.value = props.refreshToken;
      accessToken.value = props.accessToken;
      this.saveInLocalStorage();
    },
    logout() {
      user.value = null;
      refreshToken.value = null;
      accessToken.value = null;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
  };
});

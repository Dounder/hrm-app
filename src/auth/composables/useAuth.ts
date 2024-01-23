import { storeToRefs } from 'pinia';
import { api } from 'src/boot';
import { LoginResponse } from '../interfaces';
import { useAuthStore } from '../store/auth.store';

interface LoginProps {
  username: string;
  password: string;
}

const useAuth = () => {
  const store = useAuthStore();
  const { user, accessToken, refreshToken } = storeToRefs(store);

  return {
    //* Props
    user,
    accessToken,
    refreshToken,

    //! Getters
    isAuthenticated: store.isAuthenticated,
    userHasRoles: store.userHasRoles,

    //? Methods
    loadDataFromLocalStorage: store.loadFromLocalStorage,
    logout: store.logout,
    login: async ({ username, password }: LoginProps) => {
      try {
        console.log('login', username, password);
        const { data } = await api.post<LoginResponse>('/auth/login', { username, password });

        store.setData({
          user: data.user,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        });

        return `Welcome ${data.user.username}!`;
      } catch (error) {
        console.error(error);
        return 'Error logging in';
      }
    },
  };
};

export default useAuth;

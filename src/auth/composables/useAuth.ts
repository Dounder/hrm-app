import { api } from 'src/boot';
import { useAuthStore } from '../store/auth.store';
import { storeToRefs } from 'pinia';
import { LoginResponse } from '../interfaces';

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

    //? Methods
    loadDataFromLocalStorage: store.loadFromLocalStorage,
    login: async ({ username, password }: LoginProps) => {
      try {
        console.log('login', username, password);
        const { data } = await api.post<LoginResponse>('/auth/login', { username, password });

        store.setData({
          user: data.user,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
};

export default useAuth;

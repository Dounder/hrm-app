import axios, { AxiosInstance } from 'axios';
import { useAuth } from 'src/modules/auth';
import { useConfig, useDialog } from 'src/modules/common';
import Router from 'src/router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const { apiUrl } = useConfig();

const api = axios.create({ baseURL: apiUrl });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  }
  // (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { user, refreshToken, logout } = useAuth();
    const { alertDialog } = useDialog();
    const originalRequest = error.config;

    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${apiUrl}/auth/renew_access_token`, {
          username: user.value?.username,
          refreshToken: refreshToken.value,
        });

        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;

          return api(originalRequest);
        }
      } catch (error) {
        // TODO: implement remember me with cookies encrypted
        Router.push({ name: 'auth.login' });
        alertDialog({ title: 'Error', message: 'La sesión ha expirado, por favor inicia sesión nuevamente' });
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export { api };

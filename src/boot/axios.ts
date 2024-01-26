import axios, { AxiosInstance } from 'axios';
import { useAuth } from 'src/modules/auth';
import { useConfig } from 'src/shared';

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
    const { accessToken } = useAuth();

    config.headers.Authorization = `Bearer ${accessToken.value}`;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { api };

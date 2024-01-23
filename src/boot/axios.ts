import axios, { AxiosInstance } from 'axios';
import { useAuth } from 'src/auth';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuth();

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export { api };

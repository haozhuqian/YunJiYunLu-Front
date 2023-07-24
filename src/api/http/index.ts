import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err) => {
    return err;
  },
);

export default service;

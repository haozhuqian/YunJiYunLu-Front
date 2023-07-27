import { baseURL, timeout } from './config';
import Request from './request';

const defaultRequest = new Request({
  baseURL: baseURL,
  timeout: timeout,
  interceptors: {
    requestSuccess: (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.accessToken = token;
        config.headers['content-type'] = 'application/json;charset=UTF-8';
      }
      return config;
    },
  },
});

export default defaultRequest;

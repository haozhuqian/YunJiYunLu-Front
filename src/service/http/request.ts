import Request from './request/index';

const defaultRequest = new Request({
  baseURL: 'https:/api',
  timeout: 5000,
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

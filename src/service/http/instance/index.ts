import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import { RePromise } from './type';

export default class Request {
  instance: AxiosInstance;
  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    //默认拦截器
    this.instance.interceptors.response.use(
      (config) => config,
      (err) => {
        if (axios.isCancel(err)) {
          console.log('请求已取消:', err.message);
        } else {
          console.log('请求发生错误:', err.message);
        }
        return err;
      },
    );
  }
  //用泛型T约束返回的data类型
  request<T = any>(config: AxiosRequestConfig) {
    //添加取消请求控制
    const source = axios.CancelToken.source();
    return new RePromise<T>(
      () => {
        //添加取消请求控制
        config.cancelToken = source.token;
        this.instance.request<T>(config);
      },
      (reason) => source.cancel(reason),
    );
  }
  get<P, T = any>(config: AxiosRequestConfig, params?: P) {
    config.params = params ? params : config.params;
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<D, T = any>(config: AxiosRequestConfig, data?: D) {
    config.data = data ? data : config.data;
    return this.request<T>({ ...config, method: 'POST' });
  }
  put<D, T = any>(config: AxiosRequestConfig, data?: D) {
    config.data = data ? data : config.data;
    return this.request<T>({ ...config, method: 'PUT' });
  }
  delete<D, T = any>(config: AxiosRequestConfig, data?: D) {
    config.data = data ? data : config.data;
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

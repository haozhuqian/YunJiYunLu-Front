import axios from 'axios';
import type { AxiosInstance } from 'axios';
import {
  RePromise,
  type DefaultAxiosConfig,
  type InstanceAxiosConfig,
} from './type';

export default class Request {
  instance: AxiosInstance;
  constructor(config: DefaultAxiosConfig) {
    this.instance = axios.create(config);

    //添加自定义实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailure,
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailure,
    );
    //可以添加默认拦截器
    this.instance.interceptors.request.use(
      (config) => config,
      (err) => err,
    );
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
  request<T = any>(config: InstanceAxiosConfig) {
    //添加取消请求控制
    const source = axios.CancelToken.source();

    //单次请求的成功拦截
    if (config.interceptors?.requestSuccess) {
      config.interceptors.requestSuccess(config);
    }
    return new RePromise<T>(
      (resolve, reject) => {
        //添加取消请求控制
        config.cancelToken = source.token;
        this.instance
          .request<T>(config)
          .then((res) => {
            //单次响应的成功拦截
            if (config.interceptors?.responseSuccess) {
              config.interceptors?.responseSuccess(res);
            }
            resolve(res.data);
          })
          .catch((err) => {
            //单次响应的失败拦截
            if (config.interceptors?.responseFailure) {
              config.interceptors?.responseFailure(err);
            }
            reject(err);
          });
      },
      (reason) => source.cancel(reason),
    );
  }
  get<P, T = any>(config: InstanceAxiosConfig, params?: P) {
    config.params = params ? params : config.params;
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<D, T = any>(config: InstanceAxiosConfig, data?: D) {
    config.data = data ? data : config.data;
    return this.request<T>({ ...config, method: 'POST' });
  }
  put<D, T = any>(config: InstanceAxiosConfig, data?: D) {
    config.data = data ? data : config.data;
    return this.request<T>({ ...config, method: 'PUT' });
  }
  delete<D, T = any>(config: InstanceAxiosConfig, data?: D) {
    config.data = data ? data : config.data;
    return this.request<T>({ ...config, method: 'DELETE' });
  }
}

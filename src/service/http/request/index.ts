import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { RePromise, type DefaultAxiosConfig } from './type';

//封装第三方库，便于后期维护时切换第三方库，
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
      (config) => {
        return config;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      },
    );
  }
  //用泛型T约束返回的data类型
  request<T = any>(config: DefaultAxiosConfig) {
    //添加取消请求控制
    const controller = new AbortController();

    //单次请求的成功拦截
    if (config.interceptors?.requestSuccess) {
      config.interceptors?.requestSuccess(config);
    }
    return new RePromise<T>(
      (resolve, reject) => {
        //添加取消请求控制
        config.signal = controller.signal;
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
      () => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      },
    );
  }

  get<T = any, P = any>(config: DefaultAxiosConfig, params: P) {
    config.params = params;
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T = any, D = any>(config: DefaultAxiosConfig, data: D) {
    config.data = data;
    return this.request<T>({ ...config, method: 'POST' });
  }
}

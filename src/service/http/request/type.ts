import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

type RFn<T> = (T) => T;
interface Interceptors {
  requestSuccess?: RFn<InternalAxiosRequestConfig>;
  requestFailure?: RFn<any>;
  responseSuccess?: RFn<AxiosResponse>;
  responseFailure?: RFn<any>;
}

export interface DefaultAxiosConfig extends AxiosRequestConfig {
  interceptors?: Interceptors;
}

type ResolveFn<T> = (value: T | PromiseLike<T>) => void;
type RejectFn = (reason?: any) => void;
type ExecutorFn<T> = (resolve: ResolveFn<T>, reject: RejectFn) => void;

interface AbortablePromise<T> extends Promise<T> {
  abort?: (reason?: string) => void;
}

export class RePromise<T> extends Promise<T> {
  constructor(executor: ExecutorFn<T>, abort?: (reason?: string) => void) {
    super(executor);
    this.abort = abort ? abort : () => {};
  }
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): Promise<TResult1 | TResult2> {
    const pro: AbortablePromise<TResult1 | TResult2> = super.then(
      onfulfilled,
      onrejected,
    );
    pro.abort = this.abort;
    return pro as RePromise<TResult1 | TResult2>;
  }
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | null
      | undefined,
  ): Promise<T | TResult> {
    const pro: AbortablePromise<T | TResult> = super.catch(onrejected);
    pro.abort = this.abort;
    return pro as RePromise<T | TResult>;
  }
  finally(onfinally?: (() => void) | null | undefined): Promise<T> {
    const pro: AbortablePromise<T> = super.finally(onfinally);
    pro.abort = this.abort;
    return pro as RePromise<T>;
  }
  abort: (reason?: string) => void;
}

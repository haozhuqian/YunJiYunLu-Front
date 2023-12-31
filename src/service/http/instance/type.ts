//promise的resolve函数类型
type ResolveFn<T> = (value: T | PromiseLike<T>) => void;
//promise的reject函数类型
type RejectFn = (reason?: any) => void;
//promise的参数类型
type ExecutorFn<T> = (resolve: ResolveFn<T>, reject: RejectFn) => void;
//添加了可选的取消请求函数的promise类型
export class RePromise<T = any> extends Promise<T> {
  constructor(executor: ExecutorFn<T>, abort?: (reason?: string) => void) {
    super(executor);
    this.abort = abort ? abort : () => {};
  }
  addAbort<T>(pro: Promise<T>): RePromise<T> {
    return { ...pro, abort: this.abort } as RePromise<T>;
  }
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
    onrejected?: (reason: any) => TResult2 | PromiseLike<TResult2>,
  ): RePromise<TResult1 | TResult2> {
    return this.addAbort(super.then(onfulfilled, onrejected));
  }
  catch<TResult = never>(
    onrejected: (reason: any) => TResult | PromiseLike<TResult>,
  ): RePromise<T | TResult> {
    return this.addAbort(super.catch(onrejected));
  }
  finally(onfinally: () => void): RePromise<T> {
    return this.addAbort(super.finally(onfinally));
  }
  abort: (reason?: string) => void;
}

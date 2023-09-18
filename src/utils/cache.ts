export default function cache<T extends (...args: any[]) => any>(
  fn: T,
  cacheCount: number = 1,
) {
  //存储缓存的结果
  const result = new Map<string, ReturnType<T>>();
  //存储缓存的参数
  const params: string[] = [];
  return {
    cacheFn(...args: Parameters<T>) {
      //将参数序列化
      const _args = JSON.stringify(args);
      //如果之前没有计算过该参数的结果，运行函数并将结果加入缓存
      if (!result.get(_args)) {
        //如果缓存已满，删除使用频率最低或者最早的结果
        if (params.length === cacheCount) {
          result.delete(params.shift()!);
        }
        //运行函数并将结果加入缓存
        params.push(_args);
        result.set(_args, fn(...args));
      } else {
        //如果结果已经计算过，将对应的序列化后的参数，移动到最新位置
        params.push(...params.splice(params.indexOf(_args), 1));
      }
      //返回结果
      return result.get(_args);
    },
    uncacheFn(...args: Parameters<T> | []) {
      if (args.length === 0) {
        //如果没有传入参数，清空缓存
        result.clear();
      } else {
        //如果传入参数，将对应的序列化后的参数及其运行结果从缓存中删除
        const _args = JSON.stringify(args);
        result.delete(_args);
        params.splice(params.indexOf(_args), 1);
      }
    },
  };
}

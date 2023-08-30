export default function cache<T>(
  fn: (...args: any[]) => T,
  cacheCount: number = 1,
): () => T {
  //存储缓存的结果
  const result: { [key: string]: T } = {};
  //存储缓存的参数
  const params: string[] = [];
  //缓存是否已满
  let isFull = false;
  return function (...args: any[]) {
    //将参数序列化
    const _args = JSON.stringify(args);
    //如果之前没有计算过该参数的结果，运行函数并将结果加入缓存
    if (!result[_args]) {
      //如果缓存已满，删除使用频率最低或者最早的结果
      if (isFull) delete result[params.shift()!];
      //运行函数并将结果加入缓存
      params.push(_args);
      result[_args] = fn(...args);
      //判断缓存是否已满
      if (!isFull && params.length === cacheCount) isFull = true;
    } else {
      //如果结果已经计算过，将对应的序列化后的参数，移动到最新位置
      params.push(...params.splice(params.indexOf(_args), 1));
    }
    //返回结果
    return result[_args];
  };
}

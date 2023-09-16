export default function (
  reFn: (data: any) => Promise<any>,
  maxTry: number = 3,
  delayTime: number = 1000,
) {
  let tryIndex = 1;
  return function retry(data: any) {
    return reFn(data).catch((err: any) => {
      if (tryIndex < maxTry) {
        tryIndex++;
        setTimeout(() => {
          return retry(data);
        }, delayTime * tryIndex);
      }
      console.log(err);
      return err;
    });
  };
}

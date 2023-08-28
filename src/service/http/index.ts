//迭代地导入所有modules文件夹下模块并以文件名命名
const ms: Record<string, any> = import.meta.glob(['./modules/**/!(*.d).ts'], {
  eager: true,
});

const modules: any = {};
interface IModule {
  [propName: string]: IModule;
}
Object.keys(ms).forEach((item) => {
  //去掉根目录路径
  const names = item.split('/').splice(2, Infinity);
  //取出模块名
  const moduleName = names.pop()?.slice(0, -3) as string;
  //迭代地根据文件结构嵌套模块对象
  const lowest = names.reduce<IModule>((upper, name) => {
    return upper[name] ? upper[name] : (upper[name] = {});
  }, modules);
  //将模块添加到对应文件夹对象下
  lowest[moduleName] = ms[item];
});
console.log(modules);

export default modules;

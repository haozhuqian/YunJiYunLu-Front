//迭代地导入所有modules文件夹下模块并以文件名命名
const ms: Record<string, any> = import.meta.glob(['./modules/**/!(*.d).ts'], {
  eager: true,
});

const modules = {};
Object.keys(ms).forEach((item) => {
  const names = item.slice(0, -3).split('/').toSpliced(0, 2);
  const moduleName = names.pop() as string;
  const lowest = names.reduce((upper, name) => {
    return upper[name] ? upper[name] : (upper[name] = {});
  }, modules);
  lowest[moduleName] = ms[item].default;
});

export default modules;

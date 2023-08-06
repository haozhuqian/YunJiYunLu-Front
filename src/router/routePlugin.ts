import { type PluginOption } from 'vite';
import { RModule, routeValue } from './type';
import { RouteRecordRaw } from 'vue-router';

//试图写一个插件导入并自动生成路由，暂时放弃 2023.8.6

// 将字符串转换为对象
function parseStringToObject(str: string) {
  const formattedStr = `(${str})`;
  return (0, eval)(formattedStr);
}
// 转换成数组之前的树状路由对象
let modules: RModule;
// 最终的路由数组
// const routes = [];
export default function markdownPlugin(): PluginOption {
  if (!modules) {
    modules = {};
  }
  return {
    // 插件名称
    name: 'vite:route',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    async transform(code, id) {
      // 不是vue文件不管
      if (!/\.vue$/.test(id)) {
        return code;
      }
      // 转换为相对路径
      const path = id.replace(process.cwd().split('\\').join('/'), '');
      // 不在目标文件夹下不管
      if (!/^\/src\/view/.test(path)) {
        return code;
      }
      // 获取路径数组
      const names = path.split('/').splice(2, Infinity);
      // 获取组件名
      const componentName = (names.pop() as string).split('.')[0].toLowerCase();
      // 是路由子组件不管
      if (names.some((item, index) => item === names[index + 1])) {
        return code;
      }
      // 获取路由名
      const routerName = names.slice(-1)[0] as string;
      // 不是路由组件不管
      if (componentName !== routerName) {
        return code;
      }

      // 根据文件结构产生树状对象的一支
      const lowest = names.reduce<RModule>((upper, name) => {
        return upper[name] ? upper[name] : (upper[name] = {});
      }, modules);
      const realPath = path.replace('/src/view/', '').replace('.vue', '');
      // 准备加入路由数组的路由对象
      const route: RouteRecordRaw = {
        path: routerName,
        name: routerName,
        component: async () => {
          await import(`./src/view/${realPath}.vue`);
        },
        children: [],
      };
      // 用于匹配的<route>与</route>之间内容的正则
      const regex = /<route [^>]*>(.*?)<\/route>/gs;
      // 存储可能存在的多个匹配内容
      const matches: RouteRecordRaw[] = [];
      // 临时存储匹配到的exec对象
      let match;
      // 取出匹配到的字符串
      while ((match = regex.exec(code)) !== null) {
        // 转换为对象存入数组
        matches.push(parseStringToObject(match[1]));
        // 将匹配到的route标签从vue文件中删除，防止vue解析错误
        code = code.replace(match[0], '');
      }
      //如果有多个配置对象，后添加的会覆盖之前的
      matches.reduce<RouteRecordRaw>((config, newconfig) => {
        // 如果在多个配置都在routes中添加了子路由，则不会互相覆盖，而是逐个添加到原数组中
        const routes = newconfig.children ? newconfig.children : [];
        config.children?.push(...routes);
        // 删除后添加的配置对象的routes对象，防止覆盖原有的数组
        delete newconfig.children;
        // 将后添加的配置对象覆盖之前的配置
        return Object.assign(config, newconfig);
      }, route);
      //将当前路由加入
      lowest[routeValue] = route as RouteRecordRaw;

      return code;
    },
    generateBundle() {},
  };
}
export { modules };
// module.exports = markdownPlugin//适应不同模块类型
// markdownPlugin['default'] = markdownPlugin//适应不同模块类型

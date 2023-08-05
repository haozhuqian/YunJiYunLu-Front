import {
  RouteComponent,
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import { RouterInfo } from './type';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

const ms: Record<string, any> = import.meta.glob(['../view/**/*.{vue,ts}'], {
  eager: true,
});
const modules: IModule = {};
const view = Symbol('view');
const rInf = Symbol('rInf');
interface IModule {
  [propName: string]: IModule;
  [view]?: RouteComponent | (() => Promise<RouteComponent>);
  [rInf]?: RouterInfo;
}

//将收集到的文件模块按照文件嵌套结构整理成树状结构对象
Object.keys(ms).forEach((item) => {
  //去掉根目录路径，获取路径数组
  const names = item.split('/').splice(2, Infinity);
  //取出组件名
  const componentName = (names.pop() as string).split('.')[0].toLowerCase();
  let component;
  //如果仍存在相邻且重复的两项说明,这个文件是页面的子组件而非页面组件本身
  if (names.some((item, index) => item === names[index + 1])) return;
  //取出路由名
  const routerName = names.slice(-1)[0] as string;
  //判断文件类型
  if (componentName === routerName) {
    //标识为组件
    component = view;
  } else if (componentName === 'r') {
    //标识为路由配置文件
    component = rInf;
  } else {
    //其他文件模块不收集
    return;
  }
  //迭代地根据文件结构嵌套模块对象
  const lowest = names.reduce<IModule>((upper, name) => {
    return upper[name] ? upper[name] : (upper[name] = {});
  }, modules);
  //将文件模块挂载
  lowest[component] = ms[item].default;
  return;
});
console.log(modules);
let routes: Array<RouteRecordRaw> = [];
const OToR = (
  obj: IModule, //要解析的对象
  routes: Array<RouteRecordRaw>, //要转换的目标数组
  name = '', //路由名
) => {
  let route: RouteRecordRaw = {
    path: name,
    name,
    component: obj[view],
    children: [],
  };
  if (obj[rInf]) {
    obj[rInf].routes?.forEach((rout: RouteRecordRaw) => {
      route.children?.push(rout);
    });
  }
  route = {
    ...route,
    ...(obj[rInf] as RouteRecordRaw[]),
  };
  routes.push(route);
  Object.keys(obj).forEach((item) => {
    OToR(obj[item], route.children as RouteRecordRaw[], item);
  });
};
OToR(modules, routes);
routes = routes[0].children as unknown as RouteRecordRaw[];
routes.forEach((item) => {
  item.path = '/' + item.path;
});
console.log(routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(async (_to, _from) => {
//   NProgress.start();
// });

// router.afterEach((_to) => {
//   NProgress.done();
// });

export default router;

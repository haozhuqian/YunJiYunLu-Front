import {
  RouteComponent,
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
// import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { RouterInfo } from '@/router/type';

const ms: Record<string, any> = import.meta.glob(['../view/**/*.{vue,ts}'], {
  eager: true,
});
const modules: IModule = {};
interface IModule {
  [propName: string]: IModule;
  [isRoute]?: boolean;
}
const isRoute = Symbol('isRoute');

//将收集到的文件模块按照文件嵌套结构整理成树状结构对象
Object.keys(ms).forEach((item) => {
  // console.log(item);

  //去掉根目录路径，获取路径数组
  const names = item.split('/').splice(2, Infinity);
  // console.log(names);

  //取出组件名
  let componentName = (names.pop() as string).split('.')[0];
  // console.log(componentName);
  //如果仍存在相邻且重复的两项说明,这个文件是页面的子组件而非页面组件本身
  if (names.some((item, index) => item === names[index + 1])) return;
  //取出路由名
  const routerName = names.pop() as string;
  // console.log(routerName);

  //判断文件类型
  if (componentName === routerName) {
    //标识为组件
    componentName = 'v';
  } else if (componentName === 'r') {
    //标识为路由配置文件
  } else {
    //其他文件模块不收集
    return;
  }
  //迭代地根据文件结构嵌套模块对象
  const lowest = names.reduce<IModule>((upper, name) => {
    return upper[name] ? upper[name] : (upper[name] = {});
  }, modules);

  // if(routerName === undefined){
  //   lowest[componentName] = ms[item].default;
  //   return
  // }
  // console.log(modules);
  if (!lowest[routerName]) {
    lowest[routerName] = {};
  }
  //标识为路由
  lowest[routerName][isRoute] = true;
  //将文件模块收集
  lowest[routerName][componentName] = ms[item].default;
  return;
});

const routes: Array<RouteRecordRaw> = [];
const OToR = (
  obj: IModule,
  routes: Array<RouteRecordRaw>,
  pathSign = '/',
): void => {
  Object.keys(obj).forEach((item) => {
    let route: any = {
      path: '/',
      name: '',
      component: {} as RouteComponent,
      children: [],
    };
    let routeInfo: RouterInfo | undefined;
    if (obj[item][isRoute]) {
      route.path = pathSign + item;
      route.name = item;
      route.component = obj[item].v;
      routeInfo = obj[item].r as RouterInfo | undefined;
      // console.log(obj[item].r);

      routeInfo?.routes?.forEach((route: RouteRecordRaw) => {
        routes.push(route);
      });
      delete routeInfo?.routes;
      route = {
        ...route,
        ...(routeInfo as RouteRecordRaw),
      };
    } else {
      OToR(obj[item], route.children, '');
    }
    routes.push(route);
  });
};
OToR(modules, routes);

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

import type { RouteRecordRaw } from 'vue-router';
import { view, rInf, IModule, role } from '@/types/route';
//完整加载路由配置对象（就是eager选项为true）
const rs: Record<string, any> = import.meta.glob(['../view/**/r.ts'], {
  eager: true,
});
//懒加载页面组件本身（否则首屏就会加载所有页面组件，会有很长的白屏时间）
const ms: Record<string, any> = import.meta.glob(['../view/**/v.vue']);
const modules: IModule = {}; //这就是模块对象
//首先加载页面组件，因为只有路由下存在页面组件时，路由配置文件才有意义，
//如果一个文件夹下没有页面组件，将不会读取这个文件夹下的路由配置文件
//匹配规则是这样的：
//1.从view文件夹开始匹配
//2.匹配文件夹名为默认的路由路径与路由名(比如home文件夹下的路由配置默认为path:'home',name:'home')
//  文件夹下的v.vue文件作为页面组件，
//  文件夹下的r.ts文件为路由配置文件可以覆盖默认的路由配置(你可以在里面修改path，name之类的)
//3.匹配文件夹下的不同名文件夹作为子路由(比如home文件夹下有个文件夹叫info，那么home就有个子路由叫info,具体配置看info文件夹内容)
//其他文件都不匹配(比如home文件夹下的有个hi.vue文件,不理它)

//将页面组件根据文件结构整理成对象，去除不需要的文件模块
Object.keys(ms).forEach((item) => {
  //将文件路径拆分成数组,取出文件名和.
  const names = item.split('/').slice(1, -1);
  //将页面组件放到路由对象中
  const lowest = names.reduce<IModule>((upper, name) => {
    //如果已经有了同名的路由对象，就不再创建，否则创建一个空对象
    return upper[name] ? upper[name] : (upper[name] = {});
  }, modules);
  //将页面组件放到路由对象中
  lowest[view] = ms[item];
  return;
});
//将路由配置文件结构整理成对象，去除不需要的文件模块
Object.keys(rs).forEach((item) => {
  //将文件路径拆分成数组
  const names = item.split('/').splice(1, Infinity);
  //将文件名从数组中取出
  names.pop();
  //如果存在与这个路由配置文件相同路径的路由，将路由配置对象放入路由对象中
  //否则说明这个路由配置文件没有对应的页面组件，不需要它
  let last = modules;
  if (
    names.every((item) => {
      last = last[item];
      return last;
    })
  ) {
    last[rInf] = rs[item].default;
  }
  return;
});
// 生成路由数组
let routes: Array<RouteRecordRaw> = [];
// 这个名字其实是ObjectToRouteArray，意思是将路由对象转换成路由数组，但是太长了，就简写了
const OToR = (obj: IModule, routes: Array<RouteRecordRaw>, name = '') => {
  // 根据文件名生成path和name，将页面组件添加到component选项上
  let route: RouteRecordRaw = {
    path: name,
    name,
    component: obj[view],
    meta: {
      role: role.visitor,
    },
    children: [],
  };
  // 如果存在路由配置对象，将路由配置对象中子路由添加到children选项上
  if (obj[rInf]) {
    obj[rInf].children?.forEach((rout: RouteRecordRaw) => {
      route.children?.push(rout);
    });
    delete obj[rInf].children;
  }
  // 将路由配置对象中的其他选项覆盖默认配置
  route = Object.assign(route, obj[rInf]);
  // 将这个路由对象添加到路由数组中
  routes.push(route);
  // 对其他子路由做迭代操作
  Object.keys(obj).forEach((item) => {
    OToR(obj[item], route.children as RouteRecordRaw[], item);
  });
};
OToR(modules, routes);
// 取出路由数组中根路由的children选项，作为最终的结果(因为原路由数组中的根路由是没有页面组件的，只有一个view子路由)
routes = routes[0].children as RouteRecordRaw[];

export default routes;

import { h, render } from 'vue';
//需要引入弹窗组件
import prompt from './prompt.vue';
import { VNode } from 'vue';
import { verifysType } from './_type';
import cache from '@/utils/cache';
// 单例模式
let vnode: VNode | null = null;
// 显示弹窗组件
const showMessageBox = cache(
  (option: { title: string; verifys?: verifysType[] }) => {
    return new Promise((reslove, reject) => {
      // 组件挂载的容器
      const container = document.createElement('div');
      // vue的props
      const options = {
        ...option,
        onClose: (message: string, isSure: boolean) => {
          vnode = null;
          render(null, container);
          container.remove();
          showMessageBox.uncacheFn();
          return isSure ? reslove(message) : reject(message);
        },
      };
      // 生成vnode
      vnode = h(prompt, options);
      // 渲染为真实dom
      render(vnode, container);
      document.body.appendChild(container.firstElementChild!);
    });
  },
);
export default showMessageBox.cacheFn;

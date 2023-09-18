import { h, render } from 'vue';
//需要引入弹窗组件
import prompt from './prompt.vue';
import cache from '@/utils/cache';
// 显示弹窗组件
const showMessageBox = cache((title: string) => {
  return new Promise((reslove, reject) => {
    // 组件挂载的容器
    const container = document.createElement('div');
    // vue的props
    const options = {
      title,
      onClose: (isSure: boolean) => {
        render(null, container);
        container.remove();
        isSure;
        showMessageBox.uncacheFn();
        return isSure ? reslove(isSure) : reject(isSure);
      },
    };
    // 渲染为真实dom
    render(h(prompt, options), container);
    document.body.appendChild(container.firstElementChild!);
  });
});
export default showMessageBox.cacheFn;

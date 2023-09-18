import { h, render } from 'vue';
import message from './message.vue';
import cache from '@/utils/cache';
// 显示弹窗组件
const showMessageBox = cache((title: string, timeout: number = 1000) => {
  // 组件挂载的容器
  const container = document.createElement('div');
  // 渲染为真实dom
  render(h(message, { title }), container);
  document.body.appendChild(container.firstElementChild!);
  setTimeout(() => {
    render(null, container);
    container.remove();
    showMessageBox.uncacheFn();
  }, timeout);
});
export default showMessageBox.cacheFn;

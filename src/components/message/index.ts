import { h, render } from 'vue';
import message from './message.vue';
import cache from '@/utils/cache';
// 显示弹窗组件
const showMessageBox = cache((title: string, timeout: number = 3000) => {
  // 组件挂载的容器
  const container = document.createElement('div');
  const timeId: number = window.setTimeout(close, timeout);
  function close() {
    render(null, container);
    container.remove();
    showMessageBox.uncacheFn();
    clearTimeout(timeId); //提前清除定时器
  }
  // 渲染为真实dom
  render(h(message, { title, onClose: close }), container);
  document.body.appendChild(container.firstElementChild!);
});
export default showMessageBox.cacheFn;

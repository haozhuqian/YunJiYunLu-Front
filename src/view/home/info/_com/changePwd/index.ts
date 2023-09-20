import { h, render } from 'vue';
//需要引入弹窗组件
import prompt from './prompt.vue';
import { textInputPropsType } from '@/components/textInput/_type';
import cache from '@/utils/cache';
// 显示弹窗组件
const showMessageBox = cache(
  (option: {
    title: string;
    verifys?: (textInputPropsType & { realName: string })[];
  }) => {
    return new Promise((reslove, reject) => {
      // 组件挂载的容器
      const container = document.createElement('div');
      // vue的props
      const options = {
        ...option,
        onClose: (message: Record<string, string>, isSure: boolean) => {
          render(null, container);
          container.remove();
          showMessageBox.uncacheFn();
          return isSure ? reslove(message) : reject(message);
        },
      };
      // 生成vnode,渲染为真实dom
      render(h(prompt, options), container);
      document.body.appendChild(container.firstElementChild!);
    });
  },
);
export default showMessageBox.cacheFn;

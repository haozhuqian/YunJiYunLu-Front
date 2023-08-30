import { ref } from 'vue';
import debounce from '@/utils/debounce';
export default () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  const fitWidth = debounce(() => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }, 500);
  addEventListener('resize', fitWidth);
  onUnmounted(() => {
    window.removeEventListener('resize', fitWidth);
  });
  return { width, height };
};

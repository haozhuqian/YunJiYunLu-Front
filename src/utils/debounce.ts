export default function debounce(fn: () => void, delay: number): () => void {
  let timer: number;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(fn, delay);
  };
}

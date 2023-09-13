export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId = 0;
  return function (...args: Parameters<T>): void {
    if (!timeoutId) {
      func(...args);
      timeoutId = window.setTimeout(() => {
        timeoutId = 0;
      }, delay);
    }
  };
}

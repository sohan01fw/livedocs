// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | undefined;

  return function (...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

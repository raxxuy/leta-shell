/** biome-ignore-all lint/suspicious/noExplicitAny: <Different argument types> */
export const deferMicrotask = <T extends any[]>(
  fn: (...args: T) => void,
  ...args: T
) => Promise.resolve().then(() => fn(...args));

export const deferTimeout = <T extends any[]>(
  fn: (...args: T) => void,
  ...args: T
) => setTimeout(fn, 1, ...args);

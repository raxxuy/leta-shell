export const getMethod = (
  descriptor: PropertyDescriptor,
  decorator: string,
): ((this: unknown, ...args: unknown[]) => unknown) => {
  if (typeof descriptor.value !== "function") {
    throw new TypeError(`@${decorator} requires a method`);
  }

  return descriptor.value;
};

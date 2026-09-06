export const defineEnum = <T extends Record<string, unknown>>(
  values: T,
  fallback: keyof T,
) => {
  return {
    values,
    resolve(value?: keyof T): T[keyof T] {
      return values[value ?? fallback];
    },
  };
};

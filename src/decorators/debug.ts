/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
export function debugAsync<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext,
) {
  return async function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    const start = Date.now();

    console.log(`→ ${String(context.name)}`, args);

    try {
      const result = await target.apply(this, args);
      console.log(`← ${String(context.name)} (${Date.now() - start}ms)`);
      return result;
    } catch (err) {
      console.error(`✖ ${String(context.name)}`, err);
      throw err;
    }
  } as T;
}

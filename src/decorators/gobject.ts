/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import type GObject from "gi://GObject";
import { onCleanup } from "ags";
import type { SignalOf } from "@/types/gobject";

type Method<T extends GObject.Object, Args extends any[] = any[]> = (
  this: T,
  ...args: Args
) => void | Promise<void>;

type NotifyProps<T> = Array<Extract<keyof T, string> | (string & {})>;

/**
 * Connects a signal handler to a signal on a target object.
 * @param signal - The signal to listen to
 * @param getTarget - Optional target object, defaults to `this`
 */
export function connect<
  T extends GObject.Object,
  Target extends GObject.Object = T,
>(signal: SignalOf<Target>, getTarget?: (self: T) => Target) {
  return (
    method: Method<T>,
    ctx: ClassMethodDecoratorContext<T, typeof method>,
  ): any => {
    ctx.addInitializer(function (this: T) {
      let handler: number | undefined;
      let target: Target | undefined;

      onCleanup(() => {
        if (target && handler) target.disconnect(handler);
      });

      target = getTarget ? getTarget(this) : (this as unknown as Target);
      handler = target.connect(signal, method.bind(this));
    });
    return method;
  };
}

/**
 * Emits notify for the given property names when a method ends.
 * Supports both sync and async methods.
 *
 * @param props - The property names to notify
 */
export function emitNotify<T extends GObject.Object>(...props: NotifyProps<T>) {
  return (
    method: Method<T>,
    _ctx: ClassMethodDecoratorContext<T, typeof method>,
  ) =>
    function (this: T, ...args: any[]) {
      const notify = () => {
        for (const prop of props) this.notify(prop);
      };
      const result = method.apply(this, args);
      if (result instanceof Promise) return result.then(notify);
      notify();
    };
}

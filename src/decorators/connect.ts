import type GObject from "gi://GObject?version=2.0";
import type { GI } from "gi://GObject?version=2.0";
import { getMethod } from "./method";

type Signals<E extends GObject.Object> = GI.Signals<E> &
  GI.NotifySignals<E> & {
    [K in keyof GI.DetaliedSignals<E> &
      string as `${K}::${string}`]: GI.DetaliedSignals<E>[K];
  };

type Connection = (instance: object) => () => void;
const connections = new WeakMap<object, Connection[]>();

export function connect<
  E extends GObject.Object,
  S extends keyof Signals<E> & string,
>(
  signal: S,
  getEmitter: () => E,
): <T extends GI.GObject.SignalCallback<E, Signals<E>[S]>>(
  prototype: object,
  name: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => void;
export function connect(
  signal: string,
  getEmitter: () => GObject.Object,
): MethodDecorator {
  return (prototype, name, descriptor) => {
    getMethod(descriptor, "connect");

    const entries = connections.get(prototype) ?? [];

    entries.push((instance) => {
      const method = getMethod(
        { value: Reflect.get(instance, name) },
        "connect",
      );

      const emitter = getEmitter();

      const id = (
        emitter.connect as (
          signal: string,
          callback: (...args: unknown[]) => unknown,
        ) => number
      )(signal, (...args) => method.apply(instance, args));

      return () => emitter.disconnect(id);
    });

    connections.set(prototype, entries);
  };
}

export const connectDecorated = (instance: object): (() => void) => {
  const disconnect: Array<() => void> = [];
  try {
    for (
      let prototype = Object.getPrototypeOf(instance);
      prototype;
      prototype = Object.getPrototypeOf(prototype)
    ) {
      for (const connectSignal of connections.get(prototype) ?? []) {
        disconnect.push(connectSignal(instance));
      }
    }
  } catch (error) {
    for (const stop of disconnect.reverse()) stop();
    throw error;
  }

  return () => {
    for (const stop of disconnect.splice(0).reverse()) stop();
  };
};

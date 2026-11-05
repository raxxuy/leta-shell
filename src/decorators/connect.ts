import type GObject from "gi://GObject?version=2.0";
import { getMethod } from "./method";
import { createRegistry } from "./registry";

const registry = createRegistry();

export const connectDecorated = registry.activate;

export const connect = (
  signal: string,
  getEmitter: () => GObject.Object,
): MethodDecorator => {
  return (prototype, name, descriptor) => {
    getMethod(descriptor, "connect");

    registry.add(prototype, (instance) => {
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
  };
};

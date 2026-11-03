import type GObject from "gi://GObject?version=2.0";
import { getMethod } from "./method";

/** Notify after a synchronous method returns successfully. */
export function emitNotify<T extends GObject.Object>(
  property: Extract<keyof T["$readableProperties"], string>,
): (
  prototype: T,
  name: string | symbol,
  descriptor: PropertyDescriptor,
) => void {
  return (_prototype, _name, descriptor) => {
    const method = getMethod(descriptor, "emitNotify");

    descriptor.value = function (
      this: { notify: (property: string) => void },
      ...args: unknown[]
    ) {
      const result = method.apply(this, args);
      this.notify(property);
      return result;
    };
  };
}

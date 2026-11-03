// biome-ignore-all lint/complexity/noThisInStatic: Each subclass has its own singleton.
import GObject from "gi://GObject?version=2.0";
import { register } from "gnim/gobject";
import { connectDecorated } from "../decorators/connect";

const instances = new WeakMap<object, BaseService>();

@register
export class BaseService extends GObject.Object {
  #disconnectSignals?: () => void;

  static get_default<T extends BaseService>(this: new () => T): T {
    let instance = instances.get(this) as T | undefined;

    if (!instance) {
      instance = new this();
      instances.set(this, instance);
    }

    return instance;
  }

  constructor(...args: ConstructorParameters<typeof GObject.Object>) {
    super(...args);
    this.#disconnectSignals = connectDecorated(this);
  }

  disconnectSignals(): void {
    this.#disconnectSignals?.();
    this.#disconnectSignals = undefined;
    const serviceClass = this.constructor;
    if (instances.get(serviceClass) === this) instances.delete(serviceClass);
  }
}

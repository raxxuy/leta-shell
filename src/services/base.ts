// biome-ignore-all lint/complexity/noThisInStatic: Each subclass has its own singleton.
import GObject from "gi://GObject?version=2.0";
import { createRoot, getScope, onCleanup, runScope } from "gnim";
import { register } from "gnim/gobject";
import { connectDecorated } from "../decorators/connect";

const instances = new WeakMap<object, BaseService>();

@register
export class BaseService extends GObject.Object {
  protected readonly scope = createRoot(() => getScope(), null);

  static get_default<T extends BaseService>(this: new () => T): T {
    const existing = instances.get(this) as T | undefined;
    if (existing) return existing;

    const instance = new this();
    instances.set(this, instance);
    return instance;
  }

  constructor(...args: ConstructorParameters<typeof GObject.Object>) {
    super(...args);
    runScope(this.scope, () => onCleanup(connectDecorated(this)));
  }

  dispose(): void {
    if (instances.get(this.constructor) === this) {
      instances.delete(this.constructor);
    }

    this.scope.dispose();
  }
}

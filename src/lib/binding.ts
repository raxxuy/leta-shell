/** biome-ignore-all lint/suspicious/noExplicitAny: <> */

import type GObject from "gi://GObject?version=2.0";
import { type Accessor, bind, computed } from "gnim";

type PropKey<P> = Exclude<Extract<P, string>, "$signals">;

type WithSpec<T> = {
  [K in keyof T & string as PropKey<K>]?: NonNullable<T[K]> extends object
    ? WithSpec<NonNullable<T[K]>> | true
    : true;
};

type WithResult<T, S> = {
  [K in keyof S & keyof T]: S[K] extends true
    ? Accessor<T[K]>
    : S[K] extends object
      ? WithResult<NonNullable<T[K]>, S[K]>
      : never;
};

type Cache = WeakMap<object, Map<string, Accessor<unknown>>>;

const segment = (cache: Cache, obj: object, key: string): Accessor<unknown> => {
  let m = cache.get(obj);
  if (!m) {
    m = new Map();
    cache.set(obj, m);
  }
  let b = m.get(key);
  if (!b) {
    b = bind(obj as any, key);
    m.set(key, b);
  }
  return b;
};

const walk = (
  cache: Cache,
  getObject: () => GObject.Object | null,
  spec: Record<string, unknown>,
  root?: GObject.Object,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key in spec) {
    const value = spec[key];

    if (value === true) {
      result[key] = root
        ? bind(root as any, key)
        : computed(() => {
            const obj = getObject();
            return obj ? segment(cache, obj, key)() : null;
          });
    } else if (value && typeof value === "object") {
      result[key] = walk(
        cache,
        () => {
          const obj = getObject();
          return obj
            ? (segment(cache, obj, key)() as GObject.Object | null)
            : null;
        },
        value as Record<string, unknown>,
      );
    }
  }

  return result;
};

export const createBindings = <
  T extends GObject.Object,
  const S extends WithSpec<T>,
>(
  object: T,
  spec: S,
): WithResult<T, S> =>
  walk(new WeakMap(), () => object, spec, object) as WithResult<T, S>;

import type { configs } from "@/lib/config";

export type ConfigKey = keyof typeof configs;
export type ConfigType<K extends ConfigKey> = (typeof configs)[K];

export type Path<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? K | `${K}.${Path<T[K]>}`
        : K;
    }[keyof T & string]
  : never;

export type Get<T, P> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Get<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

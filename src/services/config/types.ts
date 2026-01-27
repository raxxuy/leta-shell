import type { configs } from "@/lib/config";

export type ConfigKey = keyof typeof configs;
export type ConfigType<K extends ConfigKey> = (typeof configs)[K];

export type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof unknown[]>> & string}`
        | `${Key}`
    : `${Key}`
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

export type PathValue<
  T,
  P extends Path<T>,
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;

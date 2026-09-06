import type { Accessor } from "ags";

export type ValueOrUpdater<T> = T | ((current: T) => T);

export type Path<T, Depth extends number = 5> = [Depth] extends [0]
  ? never
  : T extends readonly unknown[]
    ? never
    : T extends object
      ? {
          [K in keyof T & string]: T[K] extends object
            ? K | `${K}.${Path<T[K], Prev[Depth]>}`
            : K;
        }[keyof T & string]
      : never;

type Prev = [never, 0, 1, 2, 3, 4, 5];

export type Get<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Get<T[K], Rest & Path<T[K]>>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export type ConfigTuple<T> = readonly [Accessor<T>, (next: T) => void];

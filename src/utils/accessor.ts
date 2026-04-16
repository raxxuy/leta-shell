import { Accessor, createMemo } from "ags";
import type { Reactive } from "@/types/reactive";

export const access = <T>(object: Reactive<T>): T => {
  return object instanceof Accessor ? object() : object;
};

export const createReactiveMemo = <T, R>(
  value: Reactive<T> | undefined,
  transform: (val: T | undefined) => R,
) => createMemo(() => transform(access(value)));

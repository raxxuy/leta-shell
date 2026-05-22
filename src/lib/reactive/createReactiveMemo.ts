import { type Accessor, createMemo } from "ags";
import type { Reactive } from "@/types/reactive";
import { access } from "./access";

export function createReactiveMemo<T>(value: Reactive<T>): Accessor<T>;

export function createReactiveMemo<T, R>(
  value: Reactive<T>,
  transform: (val: T) => R,
): Accessor<R>;

export function createReactiveMemo<T, R>(
  value: Reactive<T>,
  transform?: (val: T) => R,
) {
  return createMemo(() => {
    const accessed = access(value);

    return transform ? transform(accessed) : accessed;
  });
}

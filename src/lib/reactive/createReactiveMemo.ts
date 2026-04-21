import { createMemo } from "ags";
import type { Reactive } from "@/types/reactive";
import { access } from "./access";

export const createReactiveMemo = <T, R>(
  value: Reactive<T>,
  transform: (val: T) => R,
) => {
  return createMemo(() => transform(access(value)));
};

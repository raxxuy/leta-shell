import { Accessor } from "ags";
import type { Reactive } from "@/types/reactive";

export const access = <T>(value: Reactive<T>): T => {
  return value instanceof Accessor ? value() : value;
};

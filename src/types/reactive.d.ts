import type { Accessor } from "ags";

export type Reactive<T> = T | Accessor<T>;

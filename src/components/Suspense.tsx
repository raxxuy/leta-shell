import { createState, With } from "ags";

interface SuspenseProps<T> {
  children: JSX.Element;
  fallback: JSX.Element;
  promise: Promise<T>;
}

export function Suspense<T>({
  promise,
  fallback,
  children,
}: SuspenseProps<T>): JSX.Element {
  const [value, setValue] = createState<T | null>(null);

  promise.then(setValue);

  return <With value={value}>{(v) => (v !== null ? children : fallback)}</With>;
}

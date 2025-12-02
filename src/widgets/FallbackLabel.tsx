import { Accessor, createComputed } from "ags";

type FallbackLabelProps = JSX.IntrinsicElements["label"] & {
  src: unknown | Accessor<unknown>;
  label: string;
  fallback: string;
};

export default function FallbackLabel({
  src,
  label,
  fallback,
  ...props
}: FallbackLabelProps) {
  const value = createComputed(() => {
    const source = src instanceof Accessor ? src() : src;
    return source ? label : fallback;
  });

  return <label {...props} label={value} />;
}

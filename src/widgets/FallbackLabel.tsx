import { Accessor, createComputed } from "ags";

type FallbackLabelProps = JSX.IntrinsicElements["label"] & {
  src: unknown | Accessor<unknown>;
  label: string | Accessor<string>;
  fallback: string | Accessor<string>;
};

export default function FallbackLabel({
  src,
  label,
  fallback,
  ...props
}: FallbackLabelProps) {
  const value = createComputed(() => {
    const source = src instanceof Accessor ? src() : src;
    const labelValue = label instanceof Accessor ? label() : label;
    const fallbackValue = fallback instanceof Accessor ? fallback() : fallback;
    return source ? labelValue : fallbackValue;
  });

  return <label {...props} label={value} />;
}

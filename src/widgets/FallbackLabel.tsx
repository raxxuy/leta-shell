import { type Accessor, createComputed } from "ags";

type FallbackLabelProps = JSX.IntrinsicElements["label"] & {
  src: Accessor<unknown>;
  label: string;
  fallback: string;
};

export default function FallbackLabel({
  src,
  label,
  fallback,
  ...props
}: FallbackLabelProps) {
  const value = createComputed(() => (src() ? label : fallback));

  return <label {...props} label={value} />;
}
